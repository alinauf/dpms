import { Permit, PermitApplication } from '@/lib/permit/types'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import Papa from 'papaparse'

export type ReportFormat = 'pdf' | 'csv'

// Function for Permit Applications Report
export async function generatePermitApplicationsReport(
  applications: PermitApplication[],
  format: ReportFormat
) {
  if (format === 'pdf') {
    return generateApplicationsPDF(applications)
  } else {
    return generateApplicationsCSV(applications)
  }
}

// Function for Permits Report
export async function generatePermitsReport(
  permits: Permit[],
  format: ReportFormat
) {
  if (format === 'pdf') {
    return generatePermitsPDF(permits)
  } else {
    return generatePermitsCSV(permits)
  }
}

function generateApplicationsPDF(applications: PermitApplication[]) {
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(16)
  doc.text('Permit Applications Report', 14, 15)
  doc.setFontSize(10)
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 25)

  // Prepare table data
  const tableData = applications.map(app => [
    app.permit_number,
    `${app.user.first_name} ${app.user.last_name}`,
    app.user.employee_id,
    app.permit_type.name,
    new Date(app.valid_from).toLocaleDateString(),
    new Date(app.valid_until).toLocaleDateString(),
    app.is_approved ? 'Approved' : 'Pending'
  ])

  // Add table
  doc.autoTable({
    startY: 35,
    head: [['Permit #', 'Name', 'Employee ID', 'Type', 'Valid From', 'Valid Until', 'Status']],
    body: tableData,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [41, 128, 185] },
  })

  return doc.save('permit-applications-report.pdf')
}

function generatePermitsPDF(permits: Permit[]) {
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(16)
  doc.text('Active Permits Report', 14, 15)
  doc.setFontSize(10)
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 25)

  // Prepare table data
  const tableData = permits.map(permit => [
    permit.permit_number,
    `${permit.user.first_name} ${permit.user.last_name}`,
    permit.user.employee_id,
    permit.permit_type.name,
    new Date(permit.valid_from).toLocaleDateString(),
    new Date(permit.valid_until).toLocaleDateString(),
    permit.is_expired ? 'Expired' : 'Active'
  ])

  // Add table
  doc.autoTable({
    startY: 35,
    head: [['Permit #', 'Name', 'Employee ID', 'Type', 'Valid From', 'Valid Until', 'Status']],
    body: tableData,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [41, 128, 185] },
  })

  return doc.save('active-permits-report.pdf')
}

function generateApplicationsCSV(applications: PermitApplication[]) {
  const data = applications.map(app => ({
    'Permit Number': app.permit_number,
    'Employee Name': `${app.user.first_name} ${app.user.last_name}`,
    'Employee ID': app.user.employee_id,
    'Department': app.user.department,
    'Permit Type': app.permit_type.name,
    'Valid From': new Date(app.valid_from).toLocaleDateString(),
    'Valid Until': new Date(app.valid_until).toLocaleDateString(),
    'Status': app.is_approved ? 'Approved' : 'Pending',
    'Created At': new Date(app.created_at).toLocaleDateString(),
    'Updated At': new Date(app.updated_at).toLocaleDateString()
  }))

  downloadCSV(data, 'permit-applications-report.csv')
}

function generatePermitsCSV(permits: Permit[]) {
  const data = permits.map(permit => ({
    'Permit Number': permit.permit_number,
    'Employee Name': `${permit.user.first_name} ${permit.user.last_name}`,
    'Employee ID': permit.user.employee_id,
    'Department': permit.user.department,
    'Permit Type': permit.permit_type.name,
    'Valid From': new Date(permit.valid_from).toLocaleDateString(),
    'Valid Until': new Date(permit.valid_until).toLocaleDateString(),
    'Status': permit.is_expired ? 'Expired' : 'Active',
    'Created At': new Date(permit.created_at).toLocaleDateString(),
    'Updated At': new Date(permit.updated_at).toLocaleDateString()
  }))

  downloadCSV(data, 'active-permits-report.csv')
}

function downloadCSV(data: any[], filename: string) {
  const csv = Papa.unparse(data)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
} 