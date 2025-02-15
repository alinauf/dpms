import { PermitApplication } from '@/lib/permit/types'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import Papa from 'papaparse'

export type ReportFormat = 'pdf' | 'csv'

export async function generatePermitApplicationsReport(
  applications: PermitApplication[],
  format: ReportFormat
) {
  if (format === 'pdf') {
    return generatePDF(applications)
  } else {
    return generateCSV(applications)
  }
}

function generatePDF(applications: PermitApplication[]) {
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(16)
  doc.text('Permit Applications Report', 14, 15)
  doc.setFontSize(10)
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 25)

  // Prepare table data
  const tableData = applications.map((app) => [
    `${app.user.first_name} ${app.user.last_name}`,
    app.user.employee_id,
    app.permit_type.name,
    new Date(app.valid_from).toLocaleDateString(),
    new Date(app.valid_until).toLocaleDateString(),
    app.approval_status ? 'Approved' : 'Pending',
  ])

  // @ts-expect-error - jspdf-autotable is not typed
  doc.autoTable({
    startY: 35,
    head: [
      [
        'Permit #',
        'Name',
        'Employee ID',
        'Type',
        'Valid From',
        'Valid Until',
        'Status',
      ],
    ],
    body: tableData,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [41, 128, 185] },
  })

  return doc.save('permit-applications-report.pdf')
}

function generateCSV(applications: PermitApplication[]) {
  const data = applications.map((app) => ({
    'Employee Name': `${app.user.first_name} ${app.user.last_name}`,
    'Employee ID': app.user.employee_id,
    Department: app.user.department,
    'Permit Type': app.permit_type.name,
    'Valid From': new Date(app.valid_from).toLocaleDateString(),
    'Valid Until': new Date(app.valid_until).toLocaleDateString(),
    Status: app.approval_status ? 'Approved' : 'Pending',
    'Created At': new Date(app.created_at).toLocaleDateString(),
    'Updated At': new Date(app.updated_at).toLocaleDateString(),
  }))

  const csv = Papa.unparse(data)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', 'permit-applications-report.csv')
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
