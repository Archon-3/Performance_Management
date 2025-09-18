import React from "react"
import styles from "../../../pages/AdminDashboard.module.css"

const AdminCreateTeam = ({
  error,
  success,
  newTeam,
  handleTeamFormChange,
  handleTeamCreation,
  departments = [],
  employees = [],
  onCancel,
}) => {
  return (
    <div className={styles.registerContent}>
      <div className={styles.registerHeader}>
        <div className={styles.headerIcon}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.6977C21.7033 16.0414 20.9999 15.5759 20.2 15.3805" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 3.13C16.8003 3.32548 17.5037 3.79099 18.0098 4.44732C18.5159 5.10364 18.8002 6.75C18.8002 7.58595 18.5159 8.39636 18.0098 9.05268C17.5037 9.70901 16.8003 10.1745 16 10.37" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className={styles.headerText}>
          <h2>Create New Team</h2>
          <p>Set up a new team with a leader and department assignment</p>
        </div>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}
      {success && <div className={styles.successMessage}>{success}</div>}

      <form onSubmit={handleTeamCreation} className={styles.registerForm}>
        {/* Team Information Section */}
        <div className={styles.formCard}>
          <div className={styles.cardHeader}>
            <h3>Team Information</h3>
            <span className={styles.cardDescription}>Basic details about the new team</span>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>
                Team Name <span className={styles.required}>*</span>
              </label>
              <input type="text" name="name" value={newTeam.name} onChange={handleTeamFormChange} placeholder="Enter team name" required style={{ color: '#1a202c' }} />
            </div>
            <div className={styles.formGroup}>
              <label>
                Team Leader <span className={styles.required}>*</span>
              </label>
              <select name="leader" value={newTeam.leader} onChange={handleTeamFormChange} required style={{ color: '#1a202c' }}>
                <option value="">Select team leader</option>
                {employees.map((leader) => (
                  <option key={leader.id} value={leader.id}>
                    {leader.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>
                Department <span className={styles.required}>*</span>
              </label>
              <select name="department" value={newTeam.department} onChange={handleTeamFormChange} required style={{ color: '#1a202c' }}>
                <option value="">Select department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <label>Team Description</label>
              <textarea name="description" value={newTeam.description} onChange={handleTeamFormChange} placeholder="Describe the team's purpose and responsibilities" rows="3" style={{ color: '#1a202c' }} />
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.6977C21.7033 16.0414 20.9999 15.5759 20.2 15.3805" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 3.13C16.8003 3.32548 17.5037 3.79099 18.0098 4.44732C18.5159 5.10364 18.8002 6.75C18.8002 7.58595 18.5159 8.39636 18.0098 9.05268C17.5037 9.70901 16.8003 10.1745 16 10.37" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Create Team
          </button>
          <button type="button" onClick={onCancel} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminCreateTeam
