import DepartmentDashboard from '@/components/app/DepartmentDashboard'

export default function EngineeringDashboard() {
  const engineeringIssue = {
    what: "Significant track alignment deviation detected (exceeding 15mm tolerance) causing rough riding.",
    causes: [
      { level: "CONFIRMED", text: "Ballast degradation underneath the affected sleepers." },
      { level: "LIKELY", text: "Recent heavy rainfall causing localized soil subsidence." },
      { level: "POSSIBLE", text: "High traffic exposure accelerating wear on older sleeper fastenings." }
    ],
    timeline: [
      { desc: "Driver of Train 104 reported rough riding" },
      { desc: "Track geometry car sensor anomaly recorded" },
      { desc: "Deviation confirmed >15mm by analytics engine" },
      { desc: "High Priority Alert sent to Engineering Control" },
      { desc: "Civil/Track team mobilization required" }
    ],
    seriousness: "High",
    impact: {
      safety: "Elevated risk of derailment if untreated. Speed restriction required.",
      operations: "Trains slowing to 30km/h causing 10+ min cascading delays.",
      maintenance: "Requires immediate tamping and ballast replacement.",
      location: "Sector 7 Junction, Mainline North (Km 42.5)"
    },
    actions: ["Inspect", "Coordinate work", "Schedule maintenance"],
    recommendation: "Issue temporary 30km/h speed restriction immediately. Dispatch Civil track maintenance crew with tamping machine for a 2-hour emergency block tonight at 01:00.",
    supporting: [
      { label: "Maintenance history", value: "Last tamped 14 months ago." },
      { label: "Asset information", value: "Concrete sleepers (installed 2012), 60kg rail." },
      { label: "Previous issues", value: "Similar subsidence 500m away last rainy season." }
    ],
    priorityReasons: [
      "Safety-related issue (Derailment risk)",
      "High traffic section (Mainline)",
      "Exceeds strict geometry tolerances"
    ]
  }

  return (
    <DepartmentDashboard 
      deptId="engineering" 
      title="Engineering Maintenance"
      taskName="Engineering Tasks"
      issueData={engineeringIssue}
    />
  )
}
