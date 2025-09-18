"use client"
import { useState, useEffect } from "react"
import TLMainLayout from "../components/layout/teamLeader/TLMainLayout"

import PerformanceForm from "../components/PerformanceForm"
import PerformanceHistory from "../components/PerformanceHistory"

import styles from "./DashboardPage.module.css"
import { apiFetch, uploadUrl } from "../lib/api"
import TLOverview from "../components/dashboard/teamLeader/TLOverview"
import FormsManagement from "../components/dashboard/teamLeader/FormsManagement"
import TeamMembers from "../components/dashboard/teamLeader/TeamMembers"
import ReportsSection from "../components/dashboard/teamLeader/ReportsSection"

const DashboardPage = () => {
  // Dashboard state (unchanged)
  const [activeTab, setActiveTab] = useState("overview")
  const [showFormBuilder, setShowFormBuilder] = useState(false)
  const [editingForm, setEditingForm] = useState(null)

  // Form types definition
  const formTypes = [
    { id: "workrate", name: "Work Performance" },
    { id: "behavioral", name: "Behavioral Evaluation" },
  ]

  // Evaluator types definition
  const evaluatorTypes = [
    { id: "admin", name: "Administrator/Manager" },
    { id: "peer", name: "Peer/Colleague" },
    { id: "self", name: "Self-Evaluation" },
  ]

  // Admin/leader data (loaded from backend)
  const [admin, setAdmin] = useState({
    name: "",
    role: "",
    department: "",
    employeeId: "",
    avatar: "/placeholder.svg",
    profileImageId: "",
    id: "",
  })
  

  // (Removed) user placeholder — use `admin` everywhere for header/sidebar and profile

  // Team members data
  const [teamMembers, setTeamMembers] = useState([])

  // Admin stats
  const [systemStats, setSystemStats] = useState({
    totalUsers: 0,
    activeEvaluations: 0,
    completedEvaluations: 0,
    pendingApprovals: 0,
    totalDepartments: 0,
    evaluationForms: 0,
  })

  // User stats
  const [dashboardStats, setDashboardStats] = useState({
    totalEvaluations: 0,
    pendingEvaluations: 0,
    completedEvaluations: 0,
    averageScore: 0,
    currentQuarterScore: 0,
    lastEvaluationDate: "",
    nextEvaluationDue: "",
  })

  // Enhanced forms data with sections and criteria
  const [evaluationForms, setEvaluationForms] = useState([])
  const [evaluationTemplates, setEvaluationTemplates] = useState([])

  // Form builder state
  const [formBuilder, setFormBuilder] = useState({
    title: "",
    description: "",
    formType: "workrate",
    targetEvaluator: "admin",
    weight: 70,
    sections: [],
    ratingScale: {
      min: 1,
      max: 4,
      labels: ["Poor", "Fair", "Good", "Excellent"],
    },
  })

  const [currentSection, setCurrentSection] = useState({
    name: "",
    weight: 0,
    criteria: [],
  })

  const [currentCriterion, setCurrentCriterion] = useState({
    name: "",
    weight: 0,
  })

  // Admin activities
  const [recentActivities, setRecentActivities] = useState([])

  // User evaluations
  const [recentEvaluations, setRecentEvaluations] = useState([])

  // User tasks
  const [upcomingTasks] = useState([
    {
      id: 1,
      title: "Complete Q2 Self-Assessment",
      dueDate: "2024-06-15",
      priority: "High",
      type: "Self Evaluation",
    },
    {
      id: 2,
      title: "Peer Evaluation for John Doe",
      dueDate: "2024-06-20",
      priority: "Medium",
      type: "Peer Evaluation",
    },
    {
      id: 3,
      title: "Submit Development Goals",
      dueDate: "2024-06-30",
      priority: "Low",
      type: "Goal Setting",
    },
  ])

  // Form builder functions (unchanged)
  const addCriterionToSection = () => {
    if (currentCriterion.name && currentCriterion.weight > 0) {
      setCurrentSection((prev) => ({
        ...prev,
        criteria: [
          ...prev.criteria,
          {
            id: Date.now(),
            ...currentCriterion,
          },
        ],
      }))
      setCurrentCriterion({ name: "", weight: 0 })
    }
  }

  const removeCriterionFromSection = (criterionId) => {
    setCurrentSection((prev) => ({
      ...prev,
      criteria: prev.criteria.filter((c) => c.id !== criterionId),
    }))
  }

  const addSectionToForm = () => {
    if (currentSection.name && currentSection.weight > 0 && currentSection.criteria.length > 0) {
      const totalCriteriaWeight = currentSection.criteria.reduce((sum, c) => sum + c.weight, 0)
      if (totalCriteriaWeight === 100) {
        setFormBuilder((prev) => ({
          ...prev,
          sections: [
            ...prev.sections,
            {
              id: Date.now(),
              ...currentSection,
            },
          ],
        }))
        setCurrentSection({ name: "", weight: 0, criteria: [] })
      } else {
        alert("Criteria weights must total 100% for the section")
      }
    }
  }

  const removeSectionFromForm = (sectionId) => {
    setFormBuilder((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== sectionId),
    }))
  }

  const saveForm = async () => {
    // Check if user has a team before creating evaluation
    if (teamMembers.length === 0) {
      alert("You must be assigned to a team before you can create evaluations. Please contact an administrator to assign you to a team.")
      return
    }

    if (formBuilder.title && formBuilder.sections.length > 0) {
      if (formBuilder.formType === "behavioral") {
        const behavioralSection = formBuilder.sections[0]
        if (behavioralSection.weight !== 100) {
          alert("Behavioral evaluation sections must total 100% weight")
          return
        }
      }

      if (formBuilder.formType === "workrate") {
        const totalWeight = formBuilder.sections.reduce((sum, s) => sum + s.weight, 0)
        if (totalWeight !== 100) {
          alert("Work rate evaluation sections must total 100% weight")
          return
        }
      }

      try {
        // Convert form builder data to backend format
        const evaluationData = {
          type: formBuilder.formType === "workrate" ? "work_rate" : "behavioral",
          evaluationPeriod: formBuilder.title,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          allowSelfEvaluation: formBuilder.targetEvaluator === "self",
          allowPeerEvaluation: formBuilder.targetEvaluator === "peer",
          requireLeaderApproval: false
        }

        // Add criteria based on form type
        if (formBuilder.formType === "workrate") {
          evaluationData.workRateCriteria = formBuilder.sections.map(section => ({
            name: section.name,
            weight: section.weight,
            maxScore: 10
          }))
        } else {
          evaluationData.behavioralCriteria = formBuilder.sections[0].criteria.map(criterion => ({
            name: criterion.name,
            maxScore: 5
          }))
        }

        // Create evaluation in backend
        const newEvaluation = await apiFetch("/evaluations", {
          method: "POST",
          body: JSON.stringify(evaluationData)
        })

        // Update local state
      if (editingForm) {
          setEvaluationForms((prev) => prev.map((f) => (f.id === editingForm.id ? { ...f, ...newEvaluation } : f)))
      } else {
          setEvaluationForms((prev) => [...prev, { ...formBuilder, ...newEvaluation }])
      }

      resetFormBuilder()
      setShowFormBuilder(false)
      setEditingForm(null)

        // Reload evaluations from backend
        const evals = await apiFetch("/evaluations")
        const completed = evals.filter(e => e.status === 'completed').length
        setDashboardStats(s => ({
          ...s,
          totalEvaluations: evals.length,
          completedEvaluations: completed,
          pendingEvaluations: Math.max(0, evals.length - completed),
        }))
        setRecentEvaluations(evals.slice(0, 5).map(e => ({
          id: e._id,
          type: e.type === 'work_rate' ? 'Work Performance' : 'Behavioral',
          evaluator: 'Team Leader',
          score: e.totalScore || 0,
          status: e.status === 'completed' ? 'Completed' : 'Draft',
          date: new Date(e.createdAt).toISOString().slice(0,10),
        })))

        alert("Evaluation created successfully!")
      } catch (error) {
        console.error("Error creating evaluation:", error)
        alert(`Failed to create evaluation: ${error.message}`)
      }
    }
  }

  const resetFormBuilder = () => {
    setFormBuilder({
      title: "",
      description: "",
      formType: "workrate",
      targetEvaluator: "admin",
      weight: 70,
      sections: [],
      ratingScale: {
        min: 1,
        max: 4,
        labels: ["Poor", "Fair", "Good", "Excellent"],
      },
    })
    setCurrentSection({ name: "", weight: 0, criteria: [] })
    setCurrentCriterion({ name: "", weight: 0 })
  }
  const onCancelFormBuilder = () => {
    setShowFormBuilder(false)
    setEditingForm(null)
    resetFormBuilder()
  }

  const editForm = (form) => {
    setEditingForm(form)
    setFormBuilder({
      title: form.title,
      description: form.description,
      formType: form.formType,
      targetEvaluator: form.targetEvaluator,
      weight: form.weight,
      sections: form.sections,
      ratingScale: form.ratingScale,
    })
    setShowFormBuilder(true)
  }

  // Distribute forms to team members
  const distributeForms = async (employeeId) => {
    // Check if user has a team before distributing forms
    if (teamMembers.length === 0) {
      alert("You must be assigned to a team before you can distribute evaluation forms. Please contact an administrator to assign you to a team.")
      return
    }

    try {
      // Get the team member's name
      const member = teamMembers.find(m => m.id === employeeId)
      if (!member) {
        alert("Team member not found")
        return
      }

      // Create a work rate evaluation for this member
      const workRateData = {
        type: "work_rate",
        evaluationPeriod: `Work Rate Evaluation - ${member.name} - ${new Date().toLocaleDateString()}`,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        allowSelfEvaluation: false,
        allowPeerEvaluation: false,
        requireLeaderApproval: false,
        workRateCriteria: [
          { name: "Quality of Work", weight: 30, maxScore: 10 },
          { name: "Productivity", weight: 25, maxScore: 10 },
          { name: "Technical Skills", weight: 25, maxScore: 10 },
          { name: "Communication", weight: 20, maxScore: 10 }
        ]
      }

      // Create a behavioral evaluation for this member
      const behavioralData = {
        type: "behavioral",
        evaluationPeriod: `Behavioral Evaluation - ${member.name} - ${new Date().toLocaleDateString()}`,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        allowSelfEvaluation: true,
        allowPeerEvaluation: true,
        requireLeaderApproval: false,
        behavioralCriteria: [
          { name: "Teamwork", maxScore: 5 },
          { name: "Leadership", maxScore: 5 },
          { name: "Problem Solving", maxScore: 5 },
          { name: "Adaptability", maxScore: 5 },
          { name: "Professionalism", maxScore: 5 }
        ]
      }

      // Create both evaluations
      await Promise.all([
        apiFetch("/evaluations", {
          method: "POST",
          body: JSON.stringify(workRateData)
        }),
        apiFetch("/evaluations", {
          method: "POST",
          body: JSON.stringify(behavioralData)
        })
      ])

      alert(`Evaluations created successfully for ${member.name}!`)
      
      // Reload evaluations
      const evals = await apiFetch("/evaluations")
      const completed = evals.filter(e => e.status === 'completed').length
      setDashboardStats(s => ({
        ...s,
        totalEvaluations: evals.length,
        completedEvaluations: completed,
        pendingEvaluations: Math.max(0, evals.length - completed),
      }))
      setRecentEvaluations(evals.slice(0, 5).map(e => ({
        id: e._id,
        type: e.type === 'work_rate' ? 'Work Performance' : 'Behavioral',
        evaluator: 'Team Leader',
        score: e.totalScore || 0,
        status: e.status === 'completed' ? 'Completed' : 'Draft',
        date: new Date(e.createdAt).toISOString().slice(0,10),
      })))
    } catch (error) {
      console.error("Error distributing forms:", error)
      alert(`Failed to create evaluations: ${error.message}`)
    }
  }

  const handleCreateForm = () => {
    // Check if user has a team before opening form builder
    if (teamMembers.length === 0) {
      alert("You must be assigned to a team before you can create evaluation forms. Please contact an administrator to assign you to a team.")
      return
    }
    
    resetFormBuilder()
    setShowFormBuilder(true)
    setEditingForm(null)
  }

  const createFromTemplate = async (template) => {
    // Check if user has a team before creating evaluation
    if (teamMembers.length === 0) {
      alert("You must be assigned to a team before you can create evaluations. Please contact an administrator to assign you to a team.")
      return
    }

    try {
      const evaluationData = {
        type: template.type,
        evaluationPeriod: `${template.name} - ${new Date().toLocaleDateString()}`,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        allowSelfEvaluation: true,
        allowPeerEvaluation: true,
        requireLeaderApproval: false
      }

      if (template.type === "work_rate") {
        evaluationData.workRateCriteria = template.workRateCriteria
      } else {
        evaluationData.behavioralCriteria = template.behavioralCriteria
      }

      // Create evaluation in backend
      const newEvaluation = await apiFetch("/evaluations", {
        method: "POST",
        body: JSON.stringify(evaluationData)
      })

      alert("Evaluation created from template successfully!")
      
      // Reload evaluations
      const evals = await apiFetch("/evaluations")
      const completed = evals.filter(e => e.status === 'completed').length
      setDashboardStats(s => ({
        ...s,
        totalEvaluations: evals.length,
        completedEvaluations: completed,
        pendingEvaluations: Math.max(0, evals.length - completed),
      }))
      setRecentEvaluations(evals.slice(0, 5).map(e => ({
        id: e._id,
        type: e.type === 'work_rate' ? 'Work Performance' : 'Behavioral',
        evaluator: 'Team Leader',
        score: e.totalScore || 0,
        status: e.status === 'completed' ? 'Completed' : 'Draft',
        date: new Date(e.createdAt).toISOString().slice(0,10),
      })))
    } catch (error) {
      console.error("Error creating evaluation from template:", error)
      alert(`Failed to create evaluation: ${error.message}`)
    }
  }

  const handleEditForm = (formId) => {
    const form = evaluationForms.find((f) => f.id === formId)
    if (form) {
      editForm(form)
    }
  }

  const handleToggleFormStatus = (formId) => {
    setEvaluationForms((prev) =>
      prev.map((form) =>
        form.id === formId ? { ...form, status: form.status === "active" ? "inactive" : "active" } : form,
      ),
    )
  }

  const handleDeleteForm = (formId) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      setEvaluationForms((prev) => prev.filter((form) => form.id !== formId))
    }
  }

  // NEW: Home-style sidebar behavior (copied logic)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setIsSidebarOpen(!mobile)
    }
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Load leader data from backend
  useEffect(() => {
    const load = async () => {
      try {
        const me = await apiFetch("/users/me")
        const fullName = `${me.firstName || ''} ${me.lastName || ''}`.trim() || me.email
        setAdmin({
          name: fullName,
          role: me.role === 'team_leader' ? 'Team Leader' : me.role,
          department: me.team?.name || '',
          employeeId: me.employeeId || '',
          avatar: "/placeholder.svg",
          profileImageId: me.profileImageId,
          id: me._id || me.id || ''
        })
        if (me?.team?._id) {
          const teams = await apiFetch("/teams")
          const myTeam = teams.find(t => (t._id === me.team._id) || (t.id === me.team._id))
          if (myTeam) {
            setTeamMembers((myTeam.members || []).map(m => ({
              id: m._id,
              name: `${m.firstName} ${m.lastName}`,
              role: m.role,
              department: myTeam.name || '',
              status: m.isActive ? 'active' : 'inactive',
              lastEvaluation: '',
              evaluationScore: 0,
              avatar: "/placeholder.svg",
            })))
          }
        }
        
        // Try to load evaluations (will return empty array if no team)
        try {
          const evals = await apiFetch("/evaluations")
          const completed = evals.filter(e => e.status === 'completed').length
          setDashboardStats(s => ({
            ...s,
            totalEvaluations: evals.length,
            completedEvaluations: completed,
            pendingEvaluations: Math.max(0, evals.length - completed),
          }))
          setRecentEvaluations(evals.slice(0, 5).map(e => ({
            id: e._id,
            type: e.type === 'work_rate' ? 'Work Performance' : 'Behavioral',
            evaluator: 'Team Leader',
            score: e.totalScore || 0,
            status: e.status === 'completed' ? 'Completed' : 'Draft',
            date: new Date(e.createdAt).toISOString().slice(0,10),
          })))
        } catch (evalError) {
          console.log("Could not load evaluations (likely no team assigned):", evalError.message)
          // Set empty state for evaluations
          setDashboardStats(s => ({
            ...s,
            totalEvaluations: 0,
            completedEvaluations: 0,
            pendingEvaluations: 0,
          }))
          setRecentEvaluations([])
        }

        // Load evaluation templates
        try {
          const templates = await apiFetch("/evaluations/templates")
          setEvaluationTemplates(templates)
        } catch (templateError) {
          console.log("Could not load templates:", templateError.message)
          setEvaluationTemplates([])
        }
      } catch (err) {
        console.error("Error loading user data:", err)
      }
    }
    load()
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Sidebar uses dashboard's menuItems
  const menuItems = [
    { id: "overview", label: "Overview", icon: "dashboard" },
    { id: "myEvaluations", label: "New Evaluation", icon: "form" },
    { id: "forms", label: "Forms Management", icon: "form" },
    { id: "team", label: "Team Members", icon: "users" },
    { id: "myHistory", label: "My History", icon: "history" },
    { id: "reports", label: "Reports", icon: "chart" },
    { id: "myProfile", label: "My Profile", icon: "user" },
  ]

  // Dashboard tab renderer (unchanged content, same as your code)
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <TLOverview
            teamMembers={teamMembers}
            dashboardStats={dashboardStats}
            evaluationTemplates={evaluationTemplates}
            recentEvaluations={recentEvaluations}
            recentActivities={recentActivities}
            createFromTemplate={createFromTemplate}
            handleCreateForm={handleCreateForm}
          />
        )
      case "forms":
        return (
          <FormsManagement
            showFormBuilder={showFormBuilder}
            editingForm={editingForm}
            saveForm={saveForm}
            onCancelFormBuilder={onCancelFormBuilder}
            formBuilder={formBuilder}
            setFormBuilder={setFormBuilder}
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            currentCriterion={currentCriterion}
            setCurrentCriterion={setCurrentCriterion}
            addCriterionToSection={addCriterionToSection}
            removeCriterionFromSection={removeCriterionFromSection}
            addSectionToForm={addSectionToForm}
            removeSectionFromForm={removeSectionFromForm}
            teamMembers={teamMembers}
            evaluationForms={evaluationForms}
            handleCreateForm={handleCreateForm}
            distributeForms={distributeForms}
            handleEditForm={handleEditForm}
            handleToggleFormStatus={handleToggleFormStatus}
            handleDeleteForm={handleDeleteForm}
          />
        )
      case "team":
        return <TeamMembers teamMembers={teamMembers} distributeForms={distributeForms} />
      case "reports":
        return <ReportsSection />
      case "myEvaluations":
        return <PerformanceForm onSubmit={(data) => console.log("Evaluation submitted:", data)} />
      case "myHistory":
        return <PerformanceHistory />
      case "myProfile":
        return (
          <div className={styles.profileContent}>
            <div className={styles.profileCard}>
              <div className={styles.profileHeader}>
                <img src={admin.profileImageId ? uploadUrl(admin.profileImageId) : (admin.avatar || "/placeholder.svg")} alt="Profile" className={styles.profileAvatar} />
                <div className={styles.profileInfo}>
                  <h2>{admin.name}</h2>
                  <p>{admin.role}</p>
                  <p>{admin.department}</p>
                  <p>Employee ID: {admin.employeeId}</p>
                </div>
              </div>
              
              <div className={styles.profileDetails}>
                <h3>Profile Information</h3>
                <div className={styles.profileGrid}>
                  <div className={styles.profileField}>
                    <label>Full Name</label>
                    <input type="text" value={admin.name} readOnly />
                  </div>
                  <div className={styles.profileField}>
                    <label>Position</label>
                    <input type="text" value={admin.role} readOnly />
                  </div>
                  <div className={styles.profileField}>
                    <label>Department</label>
                    <input type="text" value={admin.department} readOnly />
                  </div>
                  <div className={styles.profileField}>
                    <label>Employee ID</label>
                    <input type="text" value={admin.employeeId} readOnly />
                  </div>
                </div>
                <button className={styles.editButton}>Edit Profile</button>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  // RENDER: TL layout shell + dashboard content
  return (
    <TLMainLayout
      isSidebarOpen={isSidebarOpen}
      toggleSidebar={toggleSidebar}
      isMobile={isMobile}
      admin={admin}
      menuItems={menuItems}
      activeTab={activeTab}
      onSelectTab={setActiveTab}
    >
      {renderTabContent()}
    </TLMainLayout>
  )
}

export default DashboardPage
