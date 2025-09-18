import React from "react"
import styles from "../../../pages/AdminDashboard.module.css"

const AdminTeams = ({
  isViewingTeam,
  isEditingTeam,
  selectedTeam,
  teamForm,
  setTeamForm,
  employees = [],
  departments = [],
  teams = [],
  onBackFromView,
  onCancelEdit,
  onCreateNewTeam,
  handleViewTeam,
  handleEditTeam,
  handleDeleteTeam,
  handleUpdateTeam,
}) => {
  if (isViewingTeam && selectedTeam) {
    return (
      <div className={styles.employeeDetails}>
        <div className={styles.detailsHeader}>
          <button onClick={onBackFromView} className={styles.backButton}>
            ← Back to Team List
          </button>
          <h2>Team Details</h2>
        </div>

        <div className={styles.employeeCard}>
          <div className={styles.employeeInfo}>
            <div className={styles.employeeAvatar}>
              <div className={styles.avatarPlaceholder}>T</div>
            </div>
            <div className={styles.employeeBasicInfo}>
              <h3>{selectedTeam.name}</h3>
              <p>{selectedTeam.department}</p>
              <span className={`${styles.statusBadge} ${styles.active}`}>Active</span>
            </div>
          </div>

          <div className={styles.employeeDetailsGrid}>
            <div className={styles.detailItem}>
              <label>Team Leader:</label>
              <span>{selectedTeam.leader}</span>
            </div>
            <div className={styles.detailItem}>
              <label>Department:</label>
              <span>{selectedTeam.department}</span>
            </div>
            <div className={styles.detailItem}>
              <label>Members:</label>
              <span>{selectedTeam.members}</span>
            </div>
            <div className={styles.detailItem}>
              <label>Date Created:</label>
              <span>{selectedTeam.dateCreated}</span>
            </div>
            <div className={styles.detailItem} style={{ gridColumn: "1 / -1" }}>
              <label>Description:</label>
              <span>{selectedTeam.description || "No description provided"}</span>
            </div>
          </div>

          <div className={styles.employeeActions}>
            <button onClick={() => handleEditTeam(selectedTeam)} className={styles.editButton}>
              Edit Team
            </button>
            <button onClick={() => handleDeleteTeam(selectedTeam.id)} className={styles.deleteButton}>
              Delete Team
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isEditingTeam && selectedTeam) {
    return (
      <div className={styles.editEmployeeForm}>
        <div className={styles.detailsHeader}>
          <button onClick={onCancelEdit} className={styles.backButton}>
            ← Cancel Edit
          </button>
          <h2>Edit Team</h2>
        </div>

        <form onSubmit={handleUpdateTeam} className={styles.registerForm}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Team Name *</label>
              <input type="text" name="name" value={teamForm.name} onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })} required style={{ color: '#1a202c' }} />
            </div>
            <div className={styles.formGroup}>
              <label>Department *</label>
              <select name="department" value={teamForm.department} onChange={(e) => setTeamForm({ ...teamForm, department: e.target.value })} required style={{ color: '#1a202c' }}>
                <option value="">Select department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Team Leader</label>
              <select name="leaderId" value={teamForm.leaderId} onChange={(e) => setTeamForm({ ...teamForm, leaderId: e.target.value })} style={{ color: '#1a202c' }}>
                <option value="">Unassigned</option>
                {employees.map((leader) => (
                  <option key={leader.id} value={leader.id}>
                    {leader.name}
                  </option>
                ))}
              </select>
              <span className={styles.cardDescription}>Changing leader will reassign roles accordingly</span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Team Description</label>
            <textarea name="description" value={teamForm.description} onChange={(e) => setTeamForm({ ...teamForm, description: e.target.value })} placeholder="Describe the team's purpose and responsibilities" rows="3" style={{ color: '#1a202c' }} />
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              Update Team
            </button>
            <button type="button" onClick={onCancelEdit} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className={styles.usersContent}>
      <div className={styles.usersHeader}>
        <h2>Team Management</h2>
        <button className={styles.createButton} onClick={onCreateNewTeam}>
          Create New Team
        </button>
      </div>

      <div className={styles.usersTable}>
        <table>
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Team Leader</th>
              <th>Department</th>
              <th>Members</th>
              <th>Date Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.id}>
                <td className={styles.userName}>{team.name}</td>
                <td>{team.leader}</td>
                <td>{team.department}</td>
                <td>{team.members}</td>
                <td>{team.dateCreated}</td>
                <td>
                  <div className={styles.userActions}>
                    <button className={styles.viewButton} onClick={() => handleViewTeam(team)}>
                      View
                    </button>
                    <button className={styles.editButton} onClick={() => handleEditTeam(team)}>
                      Edit
                    </button>
                    <button className={styles.deleteButton} onClick={() => handleDeleteTeam(team.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminTeams
