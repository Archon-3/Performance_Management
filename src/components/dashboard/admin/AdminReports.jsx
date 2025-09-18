import React from "react"
import styles from "../../../pages/AdminDashboard.module.css"

const AdminReports = ({ handleExportEvaluations, handleExportTeams, handleExportEmployees }) => {
  return (
    <div className={styles.reportsContent}>
      <div className={styles.reportsHeader}>
        <h2>System Reports</h2>
        <p>Generate and view system reports</p>
      </div>
      <div className={styles.reportsGrid}>
        <div className={styles.reportCard}>
          <h3>Employee Performance Report</h3>
          <p>Generate comprehensive performance reports for all employees</p>
          <button className={styles.generateReportButton} onClick={handleExportEvaluations}>Export Evaluations (PDF)</button>
        </div>
        <div className={styles.reportCard}>
          <h3>Team Analytics</h3>
          <p>View team performance and collaboration metrics</p>
          <button className={styles.generateReportButton} onClick={handleExportTeams}>Export Teams (PDF)</button>
        </div>
        <div className={styles.reportCard}>
          <h3>System Usage</h3>
          <p>Monitor system usage and user activity patterns</p>
          <button className={styles.generateReportButton} onClick={handleExportEmployees}>Export Employees (PDF)</button>
        </div>
      </div>
    </div>
  )
}

export default AdminReports
