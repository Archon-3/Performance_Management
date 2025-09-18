import React from "react"
import styles from "../../../pages/AdminDashboard.module.css"

const AdminRegister = ({
  error,
  success,
  employeeForm,
  setEmployeeForm,
  handleEmployeeRegistration,
  handleEmployeeFormChange,
  handleImageUpload,
  jobLevels = [],
  departments = [],
  teams = [],
  password,
  isGenerated,
  generatePassword,
}) => {
  return (
    <div className={styles.registerContent}>
      <div className={styles.registerHeader}>
        <div className={styles.headerIcon}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className={styles.headerText}>
          <h2>Register New Employee</h2>
          <p>Create a comprehensive employee profile with all necessary information</p>
        </div>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}
      {success && <div className={styles.successMessage}>{success}</div>}

      <form onSubmit={handleEmployeeRegistration} className={styles.registerForm}>
        {/* Profile Image Section */}
        <div className={styles.formCard}>
          <div className={styles.cardHeader}>
            <h3>Profile Information</h3>
            <span className={styles.cardDescription}>Upload employee photo and basic details</span>
          </div>
          <div className={styles.imageUploadSection}>
            <label className={styles.imageUploadLabel}>
              Profile Image
              <div className={styles.imageUploadArea}>
                {employeeForm.profileImage ? (
                  <div className={styles.imagePreview}>
                    <img src={URL.createObjectURL(employeeForm.profileImage) || "/placeholder.svg"} alt="Profile preview" className={styles.previewImage} />
                    <button type="button" onClick={() => setEmployeeForm((prev) => ({ ...prev, profileImage: null }))} className={styles.removeImageButton}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className={styles.uploadPlaceholder}>
                    <div className={styles.uploadIcon}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15V19C21 19.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V16M17 8L12 3M12 3L7 8M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className={styles.uploadText}>
                      <p>
                        Drop your image here, or <span>browse</span>
                      </p>
                      <span>Supports: PNG, JPG (Max 5MB)</span>
                    </div>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className={styles.hiddenFileInput} />
              </div>
            </label>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className={styles.formCard}>
          <div className={styles.cardHeader}>
            <h3>Personal Information</h3>
            <span className={styles.cardDescription}>Employee's personal and contact details</span>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>
                Full Name <span className={styles.required}>*</span>
              </label>
              <input type="text" name="name" value={employeeForm.name} onChange={handleEmployeeFormChange} placeholder="Enter full name" required style={{ color: '#1a202c' }} />
            </div>
            <div className={styles.formGroup}>
              <label>
                Email Address <span className={styles.required}>*</span>
              </label>
              <input type="email" name="email" value={employeeForm.email} onChange={handleEmployeeFormChange} placeholder="Enter email address" required style={{ color: '#1a202c' }} />
            </div>
            <div className={styles.formGroup}>
              <label>
                Phone Number <span className={styles.required}>*</span>
              </label>
              <input type="tel" name="phone" value={employeeForm.phone} onChange={handleEmployeeFormChange} placeholder="Enter phone number" required style={{ color: '#1a202c' }} />
            </div>
            <div className={styles.formGroup}>
              <label>
                Emergency Contact <span className={styles.required}>*</span>
              </label>
              <input type="text" name="emergencyContact" value={employeeForm.emergencyContact} onChange={handleEmployeeFormChange} placeholder="Name - Phone Number" required style={{ color: '#1a202c' }} />
            </div>
            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <label>
                Address <span className={styles.required}>*</span>
              </label>
              <textarea name="address" value={employeeForm.address} onChange={handleEmployeeFormChange} placeholder="Enter full address" rows="3" required style={{ color: '#1a202c' }} />
            </div>
          </div>
        </div>

        {/* Employee ID Section */}
        <div className={styles.formCard}>
          <div className={styles.cardHeader}>
            <h3>Employee ID</h3>
            <span className={styles.cardDescription}>Automatically generated unique identifier</span>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Employee ID</label>
              <input type="text" value="Will be generated automatically" readOnly className={styles.readOnlyField} style={{ color: '#718096', backgroundColor: '#f7fafc', cursor: 'not-allowed' }} />
              <small className={styles.helpText}>Employee ID will be automatically generated in the format ASTU-IC-0001, ASTU-IC-0002, etc.</small>
            </div>
          </div>
        </div>

        {/* Professional Information Section */}
        <div className={styles.formCard}>
          <div className={styles.cardHeader}>
            <h3>Professional Information</h3>
            <span className={styles.cardDescription}>Job role, department, and team assignment</span>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>
                Job Title <span className={styles.required}>*</span>
              </label>
              <input type="text" name="jobTitle" value={employeeForm.jobTitle} onChange={handleEmployeeFormChange} placeholder="Enter job title" required style={{ color: '#1a202c' }} />
            </div>
            <div className={styles.formGroup}>
              <label>
                Job Level <span className={styles.required}>*</span>
              </label>
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
              <label>
                Department <span className={styles.required}>*</span>
              </label>
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
              <label>
                Role <span className={styles.required}>*</span>
              </label>
              <select name="role" value={employeeForm.role} onChange={handleEmployeeFormChange} required style={{ color: '#1a202c' }}>
                <option value="">Select role</option>
                <option value="team_leader">Team Leader</option>
                <option value="team_member">Team Member</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>
                Team Assignment <span className={styles.required}>*</span>
              </label>
              <select name="team" value={employeeForm.team} onChange={handleEmployeeFormChange} required style={{ color: '#1a202c' }}>
                <option value="">Select team (Required)</option>
                {teams.map((t) => (
                  <option key={t.id || t._id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>
                Salary <span className={styles.required}>*</span>
              </label>
              <input type="text" name="salary" value={employeeForm.salary} onChange={handleEmployeeFormChange} placeholder="Enter salary (e.g., $50,000)" required style={{ color: '#1a202c' }} />
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className={styles.formCard}>
          <div className={styles.cardHeader}>
            <h3>Account Security</h3>
            <span className={styles.cardDescription}>Generate secure login credentials</span>
          </div>
          <div className={styles.passwordSection}>
            <div className={styles.passwordGroup}>
              <label>Generated Password</label>
              <div className={styles.passwordInputGroup}>
                <input type="text" value={password} readOnly placeholder="Click 'Generate Password' to create a secure password" className={styles.passwordInput} style={{ color: '#1a202c' }} />
                <button type="button" onClick={generatePassword} className={styles.generateButton}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4V10H7M23 20V14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14L18.36 18.36A9 9 0 0 1 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Generate
                </button>
              </div>
              {isGenerated ? (
                <small className={styles.helpText}>
                  A strong password has been generated. Share it securely with the employee.
                </small>
              ) : (
                <small className={styles.helpText}>
                  Click Generate to create a secure password.
                </small>
              )}
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 8V14M23 11H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Register Employee
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminRegister
