import DepartmentDashboard from '@/components/app/DepartmentDashboard'

export default function SntDashboard() {
  const sntIssue = {
    what: "Intermittent loss of track circuit detection causing signals to drop to Danger (Red) unexpectedly.",
    causes: [
      { level: "CONFIRMED", text: "Loss of electrical continuity in track circuit." },
      { level: "LIKELY", text: "Corroded bonding cables at the track joint." },
      { level: "POSSIBLE", text: "Interference from nearby traction power surge." }
    ],
    timeline: [
      { desc: "Signal S102 unexpectedly reverted to Danger" },
      { desc: "Interlocking system flagged track circuit 'bobbing'" },
      { desc: "Pattern matched against known bonding failures" },
      { desc: "Critical Alert raised to S&T Control" },
      { desc: "Signal technician dispatch required" }
    ],
    seriousness: "Critical",
    impact: {
      safety: "Fail-safe activated (Red signal), but risks SPAD (Signal Passed at Danger).",
      operations: "Complete halt of traffic in Sector 4 until manually authorized.",
      maintenance: "Requires trackside inspection and cable rebonding.",
      location: "Sector 4, Approach to East Station (Signal S102)"
    },
    actions: ["Inspect", "Escalate", "Coordinate work"],
    recommendation: "Instruct Signallers to authorize 'pass at danger' with extreme caution. Dispatch S&T rapid response team to inspect track joint bonds at S102 immediately.",
    supporting: [
      { label: "Maintenance history", value: "Bonds replaced 3 years ago." },
      { label: "Asset information", value: "DC Track Circuit, Signal S102 (LED type)." },
      { label: "Previous issues", value: "Minor voltage drops recorded last week." }
    ],
    priorityReasons: [
      "Safety-related issue (Signal failure)",
      "Operations completely halted",
      "Immediate interlocking impact"
    ]
  }

  return (
    <DepartmentDashboard 
      deptId="snt" 
      title="S&T Maintenance"
      taskName="Signal/Telecom Tasks"
      issueData={sntIssue}
    />
  )
}
