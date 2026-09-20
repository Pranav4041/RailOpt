import DepartmentDashboard from '@/components/app/DepartmentDashboard'

export default function TrdDashboard() {
  const trdIssue = {
    what: "Significant voltage drop and localized sparking reported on the Overhead Equipment (OHE) catenary wire.",
    causes: [
      { level: "CONFIRMED", text: "Pantograph entanglement causing mechanical stress." },
      { level: "LIKELY", text: "Broken dropper wire leading to catenary sag." },
      { level: "POSSIBLE", text: "Insulator flashover due to heavy pollution/dust." }
    ],
    timeline: [
      { desc: "Loco pilot reported sparking on OHE" },
      { desc: "SCADA detected 15% voltage drop" },
      { desc: "Fault localized to Substation B feed" },
      { desc: "High Priority Alert to Traction Control" },
      { desc: "Power block and Tower Wagon required" }
    ],
    seriousness: "High",
    impact: {
      safety: "Risk of wire parting (snapping) leading to electrocution or severe train damage.",
      operations: "Electric traction trains cannot pass. Diesel only.",
      maintenance: "Requires emergency power block to repair dropper.",
      location: "Substation B, Downline stretch (Km 110-112)"
    },
    actions: ["Isolate", "Inspect", "Coordinate work"],
    recommendation: "Isolate power from Substation B to C immediately. Request 60-minute emergency block to dispatch Tower Wagon and re-string the affected dropper wire.",
    supporting: [
      { label: "Maintenance history", value: "Annual OHE inspection completed 6 months ago." },
      { label: "Asset information", value: "25kV AC Catenary System, Section Insulator." },
      { label: "Previous issues", value: "High wind reports in the area yesterday." }
    ],
    priorityReasons: [
      "Safety-related issue (Live wire risk)",
      "Electric train operations halted",
      "Asset deterioration (Dropper damage)"
    ]
  }

  return (
    <DepartmentDashboard 
      deptId="trd" 
      title="TRD Maintenance"
      taskName="Traction Tasks"
      issueData={trdIssue}
    />
  )
}
