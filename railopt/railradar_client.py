"""
RailOpt — RailRadar API client with multi-key round-robin rotation.
"""
from __future__ import annotations

import logging
import os
import time
from datetime import datetime

import requests

from railopt.models import LiveTrainStatus

logger = logging.getLogger(__name__)

RAILRADAR_BASE_URL = os.environ.get("RAILRADAR_BASE_URL", "https://TODO-fill-real-base-url")
DEFAULT_COOLDOWN_SECONDS = 60  # fallback if the API sends no Retry-After


class RailRadarKeyPool:
    """Round-robin across keys; skips any key currently cooling down from a 429."""

    def __init__(self, keys: list[str]):
        if not keys:
            raise ValueError("RailRadarKeyPool needs at least one API key")
        self._keys = keys
        self._idx = 0
        self._blocked_until: dict[str, float] = {}

    def next_key(self) -> str:
        for _ in range(len(self._keys)):
            key = self._keys[self._idx]
            self._idx = (self._idx + 1) % len(self._keys)
            if time.time() >= self._blocked_until.get(key, 0):
                return key
        raise RuntimeError("All RailRadar API keys are currently rate-limited")

    def mark_limited(self, key: str, retry_after_s: float = DEFAULT_COOLDOWN_SECONDS) -> None:
        self._blocked_until[key] = time.time() + retry_after_s
        logger.warning("RailRadar key ...%s cooling down for %.0fs", key[-4:], retry_after_s)

    @property
    def key_count(self) -> int:
        return len(self._keys)


class RailRadarClient:
    def __init__(self, keys: list[str], base_url: str = RAILRADAR_BASE_URL):
        self._pool = RailRadarKeyPool(keys)
        self._base_url = base_url.rstrip("/")

    def _request(self, path: str, params: dict | None = None) -> dict:
        # Hackathon mock mode: If they haven't put a real URL, fake the data!
        if "actual-railradar" in self._base_url or "TODO" in self._base_url:
            import random
            return {
                "train_number": path.split("/")[2],
                "train_name": "Mock Express",
                "delay_minutes": random.choice([0, 0, 15, 45, 120, 15]),
                "status": random.choice(["RUNNING", "DELAYED", "RUNNING", "DELAYED"])
            }

        last_error = None
        for _ in range(self._pool.key_count):
            key = self._pool.next_key()
            try:
                resp = requests.get(
                    f"{self._base_url}{path}",
                    params=params,
                    headers={"X-RailRadar-Key": key},  # TODO: confirm real header/auth scheme
                    timeout=10,
                )
            except requests.RequestException as e:
                last_error = e
                continue

            if resp.status_code == 429:
                retry_after = float(resp.headers.get("Retry-After", DEFAULT_COOLDOWN_SECONDS))
                self._pool.mark_limited(key, retry_after)
                continue

            try:
                resp.raise_for_status()
            except requests.RequestException as e:
                last_error = e
                continue

            return resp.json()

        raise RuntimeError(f"RailRadar request failed on all keys: {last_error}")

    def get_train_status(self, train_number: str) -> dict:
        # TODO: confirm real path, e.g. f"/trains/{train_number}/status"
        return self._request(f"/trains/{train_number}/status")

    def parse_live_status(self, raw: dict, corridor_id: str = "") -> LiveTrainStatus:
        # TODO: map real field names once you have a sample response
        return LiveTrainStatus(
            train_number=raw.get("train_number", ""),
            train_name=raw.get("train_name", ""),
            corridor_id=corridor_id,
            delay_minutes=float(raw.get("delay_minutes", 0)),
            status=raw.get("status", "UNKNOWN"),
            last_updated=datetime.now(),
        )