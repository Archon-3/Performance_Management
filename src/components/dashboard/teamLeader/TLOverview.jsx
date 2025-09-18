import React from "react"
import styles from "../../../pages/DashboardPage.module.css"

const TLOverview = ({
  teamMembers = [],
  dashboardStats = {},
  evaluationTemplates = [],
  recentEvaluations = [],
  recentActivities = [],
  createFromTemplate,
  handleCreateForm,
}) => {
  return (
    <div className={styles.overviewContent}>
      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <h3>Team Members</h3>
            <p>{teamMembers.length}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <h3>Total Evaluations</h3>
            <p>{dashboardStats.totalEvaluations}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <h3>Completed</h3>
            <p>{dashboardStats.completedEvaluations}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <h3>Pending</h3>
            <p>{dashboardStats.pendingEvaluations}</p>
          </div>
        </div>
      </div>

      {/* Team Setup Check */}
      <div className={styles.contentGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Team Setup</h3>
            <p>Ensure your team is properly configured</p>
          </div>
          <div className={styles.teamSetupSection}>
            {teamMembers.length > 0 ? (
              <div className={styles.teamSetupSuccess}>
                <p><strong>Status:</strong> Team assigned ✓</p>
                <p><strong>Team Members:</strong> {teamMembers.length}</p>
                <p><strong>Ready to create evaluations!</strong></p>
              </div>
            ) : (
              <>
                <p>Before creating evaluations, you need to be assigned to a team by an administrator.</p>
                <div className={styles.teamSetupInfo}>
                  <p><strong>Status:</strong> No team assigned</p>
                  <p><strong>Action Required:</strong> Contact an administrator to assign you to a team</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick Evaluation Creation */}
      <div className={styles.contentGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Quick Evaluation Creation</h3>
            <p>Create evaluations from templates or start from scratch</p>
          </div>
          {teamMembers.length > 0 ? (
            <div className={styles.templateGrid}>
              {evaluationTemplates.map((template) => (
                <div key={template._id} className={styles.templateCard}>
                  <div className={styles.templateInfo}>
                    <h4>{template.name}</h4>
                    <p>{template.description || `${template.type === 'work_rate' ? 'Work Rate' : 'Behavioral'} evaluation template`}</p>
                    <span className={styles.templateType}>{template.type === 'work_rate' ? 'Work Rate' : 'Behavioral'}</span>
                  </div>
                  <button 
                    className={styles.createFromTemplateButton}
                    onClick={() => createFromTemplate && createFromTemplate(template)}
                    disabled={teamMembers.length === 0}
                  >
                    Use Template
                  </button>
                </div>
              ))}
              <div className={styles.templateCard}>
                <div className={styles.templateInfo}>
                  <h4>Custom Evaluation</h4>
                  <p>Create a completely custom evaluation form</p>
                  <span className={styles.templateType}>Custom</span>
                </div>
                <button 
                  className={styles.createFromTemplateButton}
                  onClick={handleCreateForm}
                  disabled={teamMembers.length === 0}
                >
                  Create Custom
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.teamSetupInfo}>
              <p><strong>Evaluation creation is disabled</strong></p>
              <p>You need to be assigned to a team before you can create evaluations.</p>
            </div>
          )}
        </div>
      </div>

      {/* Active Evaluations */}
      <div className={styles.contentGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Active Evaluations</h3>
            <p>Currently running evaluations for your team</p>
          </div>
          <div className={styles.evaluationsList}>
            {teamMembers.length > 0 ? (
              recentEvaluations.length > 0 ? (
                recentEvaluations.map((evaluation) => (
                  <div key={evaluation.id} className={styles.evaluationItem}>
                    <div className={styles.evaluationInfo}>
                      <h4>{evaluation.type}</h4>
                      <p>Period: {evaluation.date}</p>
                      <span className={`${styles.statusBadge} ${styles[evaluation.status.toLowerCase()]}`}>
                        {evaluation.status}
                      </span>
                    </div>
                    <div className={styles.evaluationActions}>
                      <button className={styles.viewButton}>View Details</button>
                      {evaluation.status === 'Draft' && (
                        <button className={styles.evaluateButton}>Start Evaluation</button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noEvaluations}>
                  <p>No evaluations created yet. Create your first evaluation using the templates above!</p>
                </div>
              )
            ) : (
              <div className={styles.teamSetupInfo}>
                <p><strong>No evaluations available</strong></p>
                <p>You need to be assigned to a team before you can view evaluations.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className={styles.contentGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Recent Activities</h3>
          </div>
          <div className={styles.activitiesList}>
            {recentActivities.map((activity) => (
              <div key={activity.id} className={styles.activityItem}>
                <div className={styles.activityInfo}>
                  <h4>{activity.title}</h4>
                  <p>{activity.description}</p>
                  <span className={styles.activityMeta}>
                    {activity.user} • {activity.time}
                  </span>
                </div>
                <div className={styles.activityStatus}>
                  <span className={`${styles.statusBadge} ${styles[activity.status]}`}>{activity.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TLOverview
