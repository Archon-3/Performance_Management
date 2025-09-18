import React from "react"
import styles from "../../../pages/DashboardPage.module.css"

const ReportsSection = () => {
  return (
    <div className={styles.reportsContent}>
      <h2>System Reports & Analytics</h2>
      <div className={styles.reportsGrid}>
        <div className={styles.reportCard}>
          <h3>Performance Analytics</h3>
          <p>Comprehensive performance analysis across all departments</p>
          <button className={styles.generateButton}>Generate Report</button>
        </div>
        <div className={styles.reportCard}>
          <h3>Evaluation Trends</h3>
          <p>Track evaluation completion rates and score trends</p>
          <button className={styles.generateButton}>Generate Report</button>
        </div>
        <div className={styles.reportCard}>
          <h3>User Activity</h3>
          <p>Monitor user engagement and system usage statistics</p>
          <button className={styles.generateButton}>Generate Report</button>
        </div>
        <div className={styles.reportCard}>
          <h3>Goal Achievement</h3>
          <p>Track goal completion and performance improvement</p>
          <button className={styles.generateButton}>Generate Report</button>
        </div>
      </div>
    </div>
  )
}

export default ReportsSection
