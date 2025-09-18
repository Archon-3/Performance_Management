import React from "react"
import styles from "../../../pages/AdminDashboard.module.css"

const AdminOverview = ({ systemStats = {} }) => {
  return (
    <div className={styles.overviewContent}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <h3>Total Employees</h3>
            <p>{systemStats.totalEmployees}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <h3>Active Teams</h3>
            <p>{systemStats.activeTeams}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <h3>Pending Registrations</h3>
            <p>{systemStats.pendingRegistrations}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <h3>Evaluations This Month</h3>
            <p>{systemStats.evaluationsThisMonth}</p>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3>Recent Team Activities</h3>
        </div>
        <div className={styles.activitiesList}>
          <div className={styles.activityItem}>
            <div className={styles.activityInfo}>
              <h4>New Team Created</h4>
              <p>Computer Science team has been created with Dr. Banchirga as leader</p>
              <span className={styles.activityMeta}>System • 2 hours ago</span>
            </div>
            <div className={styles.activityStatus}>
              <span className={`${styles.statusBadge} ${styles.success}`}>completed</span>
            </div>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityInfo}>
              <h4>Employee Registered</h4>
              <p>Samuel Hailu has been registered to ICT Department</p>
              <span className={styles.activityMeta}>Dr. Bekele • 4 hours ago</span>
            </div>
            <div className={styles.activityStatus}>
              <span className={`${styles.statusBadge} ${styles.success}`}>completed</span>
            </div>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityInfo}>
              <h4>Team Assignment</h4>
              <p>5 employees need team assignments</p>
              <span className={styles.activityMeta}>System • 6 hours ago</span>
            </div>
            <div className={styles.activityStatus}>
              <span className={`${styles.statusBadge} ${styles.warning}`}>pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOverview
