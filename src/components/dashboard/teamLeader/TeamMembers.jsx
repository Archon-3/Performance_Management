import React from "react"
import styles from "../../../pages/DashboardPage.module.css"

const TeamMembers = ({ teamMembers = [], distributeForms }) => {
  return (
    <div className={styles.teamContent}>
      <h2>Team Members</h2>
      {teamMembers.length > 0 ? (
        <div className={styles.teamGrid}>
          {teamMembers.map((member) => (
            <div key={member.id} className={styles.teamCard}>
              <div className={styles.teamMemberHeader}>
                <img src={member.avatar || "/placeholder.svg"} alt={member.name} className={styles.teamAvatar} />
                <div className={styles.teamMemberInfo}>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                  <span className={styles.teamDepartment}>{member.department}</span>
                </div>
              </div>
              <div className={styles.teamMemberStats}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Last Evaluation</span>
                  <span className={styles.statValue}>{new Date(member.lastEvaluation).toLocaleDateString()}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Score</span>
                  <span className={styles.statValue}>{member.evaluationScore}%</span>
                </div>
              </div>
              <div className={styles.teamMemberActions}>
                <button className={styles.viewButton}>View Profile</button>
                <button 
                  className={styles.evaluateButton}
                  onClick={() => distributeForms && distributeForms(member.id)}
                >
                  Evaluate
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.teamSetupInfo}>
          <p><strong>No team assigned</strong></p>
          <p>You need to be assigned to a team by an administrator before you can view team members.</p>
          <p>Please contact an administrator to assign you to a team.</p>
        </div>
      )}
    </div>
  )
}

export default TeamMembers
