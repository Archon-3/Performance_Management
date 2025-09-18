import React from "react"
import styles from "../../../pages/AdminDashboard.module.css"

const AdminEmployees = ({
  isViewingEmployee,
  isEditingEmployee,
  selectedEmployee,
  employeeForm,
  setEmployeeForm,
  jobLevels = [],
  departments = [],
  teams = [],
  employees = [],
  handleEmployeeFormChange,
  handleUpdateEmployee,
  handleViewEmployee,
  handleEditEmployee,
  handleDeleteEmployee,
  onBackFromView,
  onCancelEdit,
}) => {
  if (isViewingEmployee && selectedEmployee) {
    return (
      <div className={styles.employeeDetails}>
        <div className={styles.detailsHeader}>
          <button onClick={onBackFromView} className={styles.backButton}>
            ← Back to Employee List
          </button>
          <h2>Employee Details</h2>
        </div>

        <div className={styles.employeeCard}>
          <div className={styles.employeeInfo}>
            <div className={styles.employeeAvatar}>
              {selectedEmployee.profileImage ? (
                <img src={URL.createObjectURL(selectedEmployee.profileImage) || "/placeholder.svg"} alt="Profile" />
              ) : (
                <div className={styles.avatarPlaceholder}>{selectedEmployee.name.charAt(0)}</div>
              )}
            </div>
            <div className={styles.employeeBasicInfo}>
              <h3>{selectedEmployee.name}</h3>
              <p>{selectedEmployee.jobTitle}</p>
              <span className={`${styles.statusBadge} ${styles.active}`}>{selectedEmployee.status}</span>
            </div>
          </div>

          <div className={styles.employeeDetailsGrid}>
            <div className={styles.detailItem}>
              <label>Employee ID:</label>
              <span className={styles.employeeId}>{selectedEmployee.employeeId || "N/A"}</span>
            </div>
            <div className={styles.detailItem}>
              <label>Email:</label>
              <span>{selectedEmployee.email}</span>
            </div>
            <div className={styles.detailItem}>
              <label>Phone:</label>
              <span>{selectedEmployee.phone}</span>
            </div>
            <div className={styles.detailItem}>
              <label>Department:</label>
              <span>{selectedEmployee.department}</span>
            </div>
            <div className={styles.detailItem}>
              <label>Team:</label>
              <span>{selectedEmployee.team}</span>
            </div>
            <div className={styles.detailItem}>
              <label>Level:</label>
              <span>{selectedEmployee.level}</span>
            </div>
            <div className={styles.detailItem}>
              <label>Salary:</label>
              <span>{selectedEmployee.salary}</span>
            </div>
            <div className={styles.detailItem}>
              <label>Address:</label>
              <span>{selectedEmployee.address}</span>
            </div>
            <div className={styles.detailItem}>
              <label>Emergency Contact:</label>
              <span>{selectedEmployee.emergencyContact}</span>
            </div>
            <div className={styles.detailItem}>
              <label>Date Registered:</label>
              <span>{selectedEmployee.dateRegistered}</span>
            </div>
          </div>

          <div className={styles.employeeActions}>
            <button onClick={() => handleEditEmployee(selectedEmployee)} className={styles.editButton}>
              Edit Employee
            </button>
            <button onClick={() => handleDeleteEmployee(selectedEmployee.id)} className={styles.deleteButton}>
              Delete Employee
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isEditingEmployee && selectedEmployee) {
    return (
      <div className={styles.editEmployeeForm}>
        <div className={styles.detailsHeader}>
          <button onClick={onCancelEdit} className={styles.backButton}>
            ← Cancel Edit
          </button>
          <h2>Edit Employee</h2>
        </div>

        <form onSubmit={handleUpdateEmployee} className={styles.registerForm}>
          {/* Employee ID Section */}
          <div className={styles.formCard}>
            <div className={styles.cardHeader}>
              <h3>Employee ID</h3>
              <span className={styles.cardDescription}>System-generated unique identifier</span>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Employee ID</label>
                <input
                  type="text"
                  value={selectedEmployee.employeeId || "N/A"}
                  readOnly
                  className={styles.readOnlyField}
                  style={{ color: '#718096', backgroundColor: '#f7fafc', cursor: 'not-allowed' }}
                />
                <small className={styles.helpText}>Employee ID cannot be changed once assigned</small>
              </div>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Full Name *</label>
              <input type="text" name="name" value={employeeForm.name} onChange={handleEmployeeFormChange} required style={{ color: '#1a202c' }} />
            </div>
            <div className={styles.formGroup}>
              <label>Job Title *</label>
              <input type="text" name="jobTitle" value={employeeForm.jobTitle} onChange={handleEmployeeFormChange} required style={{ color: '#1a202c' }} />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Job Level *</label>
              <select name="level" value={employeeForm.level} onChange={handleEmployeeFormChange} required style={{ color: '#1a202c' }}>
                <option value="">Select job level</option>
                {jobLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Email Address *</label>
              <input type="email" name="email" value={employeeForm.email} onChange={handleEmployeeFormChange} required style={{ color: '#1a202c' }} />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Department *</label>
              <select name="department" value={employeeForm.department} onChange={handleEmployeeFormChange} required style={{ color: '#1a202c' }}>
                <option value="">Select department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Team Assignment *</label>
              <select name="team" value={employeeForm.team} onChange={handleEmployeeFormChange} required style={{ color: '#1a202c' }}>
                <option value="">Select team (Required)</option>
                {teams.map((t) => (
                  <option key={t.id || t._id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Phone Number *</label>
              <input type="tel" name="phone" value={employeeForm.phone} onChange={handleEmployeeFormChange} required style={{ color: '#1a202c' }} />
            </div>
            <div className={styles.formGroup}>
              <label>Salary *</label>
              <input type="text" name="salary" value={employeeForm.salary} onChange={handleEmployeeFormChange} required style={{ color: '#1a202c' }} />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Address *</label>
              <textarea name="address" value={employeeForm.address} onChange={handleEmployeeFormChange} rows="2" required style={{ color: '#1a202c' }} />
            </div>
            <div className={styles.formGroup}>
              <label>Emergency Contact *</label>
              <input type="text" name="emergencyContact" value={employeeForm.emergencyContact} onChange={handleEmployeeFormChange} required style={{ color: '#1a202c' }} />
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              Update Employee
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
        <h2>Employee List ({employees.length} employees)</h2>
        <div className={styles.userFilters}>
          <select className={styles.filterSelect}>
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <select className={styles.filterSelect}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className={styles.usersTable}>
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Job Title</th>
              <th>Department</th>
              <th>Team</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td className={styles.employeeId}>{employee.employeeId || "N/A"}</td>
                  <td className={styles.userName}>{employee.name}</td>
                  <td>{employee.jobTitle}</td>
                  <td>{employee.department}</td>
                  <td>{employee.team || "Not assigned"}</td>
                  <td>{employee.phone}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.active}`}>{employee.status}</span>
                  </td>
                  <td>
                    <div className={styles.userActions}>
                      <button onClick={() => handleViewEmployee(employee)} className={styles.viewButton}>
                        View
                      </button>
                      <button onClick={() => handleEditEmployee(employee)} className={styles.editButton}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteEmployee(employee.id)} className={styles.deleteButton}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className={styles.emptyState}>
                  No employees registered yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminEmployees
