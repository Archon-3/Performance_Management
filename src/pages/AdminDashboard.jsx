"use client"

import { useState, useEffect } from "react"
import AdminMainLayout from "../components/layout/MainLayout/AdminMainLayout"
import { getUsers, createUser, updateUser, deleteUser } from "../services/userService"
import { getTeams, createTeam, updateTeam, deleteTeam } from "../services/teamService"
import { getEvaluations } from "../services/evaluationService"
import AdminOverview from "../components/dashboard/admin/AdminOverview"
import AdminRegister from "../components/dashboard/admin/AdminRegister"
import AdminTeams from "../components/dashboard/admin/AdminTeams"
import AdminCreateTeam from "../components/dashboard/admin/AdminCreateTeam"
import AdminEmployees from "../components/dashboard/admin/AdminEmployees"
import AdminReports from "../components/dashboard/admin/AdminReports"

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [employees, setEmployees] = useState([])
  const [teams, setTeams] = useState([])
  const [newTeam, setNewTeam] = useState({ name: "", leader: "", description: "", department: "" })
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [activePopout, setActivePopout] = useState(null)

  // Admin data
  const [admin] = useState({
    name: "Dr. Bekele Tadesse",
    role: "System Administrator",
    department: "Human Resources",
    avatar: "/placeholder.svg?height=80&width=80&text=Admin",
  })

  // Admin stats
  const [systemStats, setSystemStats] = useState({
    totalEmployees: 0,
    activeTeams: 0,
    pendingRegistrations: 0,
    evaluationsThisMonth: 0,
  })

  // Departments data
  const departments = [
    "Information Communication Technology",
    "Computer Science & Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Human Resources",
    "Finance",
    "Administration",
    "Academic Affairs",
  ]

  // Job levels
  const jobLevels = [
    "I - Entry Level",
    "II - Intermediate",
    "III - Professional",
    "IV - Senior Professional",
    "V - Lead",
    "VI - Manager",
    "VII - Director",
  ]

  // Employee registration form state
  const [employeeForm, setEmployeeForm] = useState({
    name: "",
    jobTitle: "",
    level: "",
    email: "",
    department: "",
    team: "",
    role: "",
    phone: "",
    address: "",
    emergencyContact: "",
    salary: "",
    profileImage: null,
  })
  const [password, setPassword] = useState("")
  const [isGenerated, setIsGenerated] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [isViewingEmployee, setIsViewingEmployee] = useState(false)
  const [isEditingEmployee, setIsEditingEmployee] = useState(false)
  const [isViewingTeam, setIsViewingTeam] = useState(false)
  const [isEditingTeam, setIsEditingTeam] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [teamForm, setTeamForm] = useState({ id: "", name: "", department: "", description: "", leaderId: "" })

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const togglePopout = (item) => {
    if (activePopout === item) {
      setActivePopout(null)
    } else {
      setActivePopout(item)
    }
  }

  const navLinks = [
    {
      title: "Overview",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      tabKey: "overview",
      active: activeTab === "overview",
    },
    {
      title: "Register Employee",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="8.5"
            cy="7"
            r="4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="20"
            y1="8"
            x2="20"
            y2="14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="17"
            y1="11"
            x2="23"
            y2="11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      tabKey: "register",
      active: activeTab === "register",
    },
    {
      title: "Team Management",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="9"
            cy="7"
            r="4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.6977C21.7033 16.0414 20.9999 15.5759 20.2 15.3805"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 3.13 C16.86 3.35 17.62 3.85 18.17 4.55 C18.71 5.25 19.01 6.12 19.01 7.01 C19.01 7.90 18.71 8.76 18.17 9.46 C17.62 10.16 16.86 10.66 16 10.88"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      tabKey: "teams",
      active: activeTab === "teams",
    },
    {
      title: "Employee List",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 6H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 12H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      tabKey: "employees",
      active: activeTab === "employees",
    },
    {
      title: "Reports",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line
            x1="18"
            y1="20"
            x2="18"
            y2="10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="12"
            y1="20"
            x2="12"
            y2="4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="6"
            y1="20"
            x2="6"
            y2="14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      tabKey: "reports",
      active: activeTab === "reports",
    },
  ]

  // Handle employee form input changes
  const handleEmployeeFormChange = (e) => {
    const { name, value } = e.target
    setEmployeeForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle team form input changes
  const handleTeamFormChange = (e) => {
    const { name, value } = e.target
    setNewTeam((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setEmployeeForm((prev) => ({
        ...prev,
        profileImage: file,
      }))
    }
  }

  // Generate random password
  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let password = ""
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(password)
    setIsGenerated(true)
  }

  // Handle employee registration
  const handleEmployeeRegistration = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (
      !employeeForm.name ||
      !employeeForm.email ||
      !employeeForm.department ||
      !employeeForm.team ||
      !employeeForm.role
    ) {
      setError("Please fill all required fields including Role and Team")
      return
    }

    if (!password) {
      setError("Please generate a password")
      return
    }

    try {
      const [firstName, ...rest] = employeeForm.name.trim().split(" ")
      const lastName = rest.join(" ") || ""
      const teamObj = teams.find(t => t.name === employeeForm.team)
      await createUser({
        firstName,
        lastName,
        email: employeeForm.email,
        password,
        role: employeeForm.role,
        teamId: teamObj ? teamObj.id || teamObj._id : undefined,
        jobTitle: employeeForm.jobTitle,
        level: employeeForm.level,
        department: employeeForm.department,
        phone: employeeForm.phone,
        address: employeeForm.address,
        emergencyContact: employeeForm.emergencyContact,
        salary: employeeForm.salary,
      })
      const users = await getUsers()
      setEmployees(users.map(u => ({
        id: u._id,
        name: `${u.firstName} ${u.lastName}`,
        jobTitle: u.jobTitle || u.role,
        level: u.level || "",
        email: u.email,
        department: u.department || u.team?.name || "",
        team: u.team?.name || "",
        status: u.isActive ? "active" : "inactive",
        dateRegistered: new Date(u.createdAt).toLocaleDateString(),
        phone: u.phone || "",
        address: u.address || "",
        emergencyContact: u.emergencyContact || "",
        salary: u.salary || "",
        profileImage: null,
      })))
    setSuccess("Employee registered successfully!")
    setEmployeeForm({
      name: "",
      jobTitle: "",
      level: "",
      email: "",
      department: "",
      team: "",
        role: "",
      phone: "",
      address: "",
      emergencyContact: "",
      salary: "",
      profileImage: null,
    })
    setPassword("")
    setIsGenerated(false)
    } catch (err) {
      setError(err.message || "Failed to register employee")
    }
  }

  // Handle team creation
  const handleTeamCreation = async (e) => {
    e.preventDefault()
    if (!newTeam.name || !newTeam.department) {
      setError("Team name and department are required")
      return
    }
    try {
      await createTeam({
        name: newTeam.name,
        department: newTeam.department,
        description: newTeam.description,
        leaderId: newTeam.leader || undefined,
      })
      const fetchedTeams = await getTeams()
      setTeams(fetchedTeams.map(t => ({ 
        id: t._id, 
        name: t.name, 
        leader: t.leader ? `${t.leader.firstName} ${t.leader.lastName}` : "No leader assigned", 
        members: t.members?.length || 0, 
        dateCreated: new Date(t.createdAt).toISOString().slice(0,10), 
        department: t.department || "Not specified",
        description: t.description || ""
      })))
    setNewTeam({ name: "", leader: "", description: "", department: "" })
    setSuccess("Team created successfully!")
    setActiveTab("teams")
    } catch (err) {
      setError(err.message || "Failed to create team")
    }
  }

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee)
    setIsViewingEmployee(true)
  }

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee)
    setEmployeeForm(employee)
    setIsEditingEmployee(true)
  }

  const handleUpdateEmployee = async (e) => {
    e.preventDefault()
    try {
      if (!selectedEmployee?.id) return
      const [firstName, ...rest] = (employeeForm.name || "").trim().split(" ")
      const lastName = rest.join(" ")
      const teamObj = teams.find((t) => t.name === employeeForm.team)
      await updateUser(selectedEmployee.id, { firstName, lastName, role: employeeForm.jobTitle || selectedEmployee.jobTitle, jobTitle: employeeForm.jobTitle, level: employeeForm.level, department: employeeForm.department, teamId: teamObj?.id || teamObj?._id || null, phone: employeeForm.phone, address: employeeForm.address, emergencyContact: employeeForm.emergencyContact, salary: employeeForm.salary })
      const users = await getUsers()
      setEmployees(users.map(u => ({
        id: u._id,
        name: `${u.firstName} ${u.lastName}`,
        jobTitle: u.jobTitle || u.role,
        level: u.level || "",
        email: u.email,
        department: u.department || u.team?.name || "",
        team: u.team?.name || "",
        status: u.isActive ? "active" : "inactive",
        dateRegistered: new Date(u.createdAt).toLocaleDateString(),
        phone: u.phone || "",
        address: u.address || "",
        emergencyContact: u.emergencyContact || "",
        salary: u.salary || "",
        profileImage: null,
      })))
    setIsEditingEmployee(false)
    setSelectedEmployee(null)
    setEmployeeForm({
      name: "",
      jobTitle: "",
      level: "",
      email: "",
      department: "",
      team: "",
        role: "",
      phone: "",
      address: "",
      emergencyContact: "",
      salary: "",
      profileImage: null,
    })
    setSuccess("Employee updated successfully!")
    } catch (err) {
      setError(err.message || "Failed to update employee")
    }
  }

  const handleDeleteEmployee = async (employeeId) => {
    if (!employeeId) return
    if (!window.confirm("Are you sure you want to delete this employee?")) return
    try {
      await deleteUser(employeeId)
      const users = await getUsers()
      setEmployees(users.map(u => ({
        id: u._id,
        name: `${u.firstName} ${u.lastName}`,
        jobTitle: u.role,
        level: "",
        email: u.email,
        department: u.team?.name || "",
        team: u.team?.name || "",
        status: u.isActive ? "active" : "inactive",
        dateRegistered: new Date(u.createdAt).toLocaleDateString(),
        phone: "",
        address: "",
        emergencyContact: "",
        salary: "",
        profileImage: null,
      })))
      setSuccess("Employee deleted successfully!")
    } catch (err) {
      setError(err.message || "Failed to delete employee")
    }
  }

  const handleViewTeam = (team) => {
    setSelectedTeam(team)
    setIsViewingTeam(true)
  }

  const handleEditTeam = (team) => {
    setSelectedTeam(team)
    setTeamForm({ id: team.id || team._id, name: team.name || "", department: team.department || "", description: team.description || "", leaderId: "" })
    setIsEditingTeam(true)
  }

  const handleUpdateTeam = async (e) => {
    e.preventDefault()
    try {
      await updateTeam(teamForm.id, { name: teamForm.name, department: teamForm.department, description: teamForm.description, leaderId: teamForm.leaderId || undefined })
      const fetchedTeams = await getTeams()
      setTeams(fetchedTeams.map(t => ({ 
        id: t._id, 
        name: t.name, 
        leader: t.leader ? `${t.leader.firstName} ${t.leader.lastName}` : "No leader assigned", 
        members: t.members?.length || 0, 
        dateCreated: new Date(t.createdAt).toISOString().slice(0,10), 
        department: t.department || "Not specified",
        description: t.description || ""
      })))
      setIsEditingTeam(false)
      setSelectedTeam(null)
      setSuccess("Team updated successfully!")
    } catch (err) {
      setError(err.message || "Failed to update team")
    }
  }

  const handleDeleteTeam = async (teamId) => {
    if (!teamId) return
    if (!window.confirm("Are you sure you want to delete this team?")) return
    try {
      await deleteTeam(teamId)
      const fetchedTeams = await getTeams()
      setTeams(fetchedTeams.map(t => ({ 
        id: t._id, 
        name: t.name, 
        leader: t.leader ? `${t.leader.firstName} ${t.leader.lastName}` : "No leader assigned", 
        members: t.members?.length || 0, 
        dateCreated: new Date(t.createdAt).toISOString().slice(0,10), 
        department: t.department || "Not specified",
        description: t.description || ""
      })))
      setSuccess("Team deleted successfully!")
    } catch (err) {
      setError(err.message || "Failed to delete team")
    }
  }

  const exportToPDF = (data, filename, title) => {
    // Create a new window for PDF generation
    const printWindow = window.open('', '_blank');
    
    // Create HTML content for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #2d3748; text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #e2e8f0; padding: 8px; text-align: left; }
            th { background-color: #f7fafc; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9fafb; }
            .header { margin-bottom: 20px; }
            .date { color: #718096; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${title}</h1>
            <div class="date">Generated on: ${new Date().toLocaleDateString()}</div>
          </div>
          <table>
            <thead>
              <tr>
                ${Object.keys(data[0] || {}).map(key => `<th>${key}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${data.map(row => 
                `<tr>${Object.values(row).map(value => `<td>${value || ''}</td>`).join('')}</tr>`
              ).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = function() {
      printWindow.print();
      printWindow.close();
    };
  };

  const handleExportEmployees = () => {
    const rows = employees.map((e) => ({ id: e.id, name: e.name, email: e.email, role: e.jobTitle, department: e.department, team: e.team, status: e.status, dateRegistered: e.dateRegistered }))
    exportToPDF(rows, "employees", "Employee Report")
  }

  const handleExportTeams = () => {
    const rows = teams.map((t) => ({ id: t.id, name: t.name, leader: t.leader, department: t.department, members: t.members, dateCreated: t.dateCreated }))
    exportToPDF(rows, "teams", "Team Report")
  }

  const handleExportEvaluations = async () => {
    try {
      const evals = await getEvaluations()
      const rows = evals.map((e) => ({ id: e._id, formType: e.formType, evaluatorType: e.evaluatorType, weight: e.weight, status: e.status, evaluatee: e.evaluatee, evaluator: e.evaluator, createdAt: new Date(e.createdAt).toLocaleString() }))
      exportToPDF(rows, "evaluations", "Evaluation Report")
    } catch (err) {
      setError(err.message || "Failed to export evaluations")
    }
  }

  useEffect(() => {
    const load = async () => {
      try {
        const users = await getUsers()
        setEmployees(users.map(u => ({
          id: u._id,
          name: `${u.firstName} ${u.lastName}`,
          jobTitle: u.jobTitle || u.role,
          level: u.level || "",
          email: u.email,
          department: u.department || u.team?.name || "",
          team: u.team?.name || "",
          status: u.isActive ? "active" : "inactive",
          dateRegistered: new Date(u.createdAt).toISOString().slice(0,10),
          phone: u.phone || "",
          address: u.address || "",
          emergencyContact: u.emergencyContact || "",
          salary: u.salary || "",
          profileImage: null,
        })))
        const fetchedTeams = await getTeams()
        setTeams(fetchedTeams.map(t => ({ 
          id: t._id, 
          name: t.name, 
          leader: t.leader ? `${t.leader.firstName} ${t.leader.lastName}` : "No leader assigned", 
          members: t.members?.length || 0, 
          dateCreated: new Date(t.createdAt).toISOString().slice(0,10), 
          department: t.department || "Not specified",
          description: t.description || ""
        })))
        setSystemStats({ totalEmployees: users.length, activeTeams: fetchedTeams.length, pendingRegistrations: 0, evaluationsThisMonth: 0 })
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <AdminOverview systemStats={systemStats} />
        )

      case "register":
        return (
          <AdminRegister
            error={error}
            success={success}
            employeeForm={employeeForm}
            setEmployeeForm={setEmployeeForm}
            handleEmployeeRegistration={handleEmployeeRegistration}
            handleEmployeeFormChange={handleEmployeeFormChange}
            handleImageUpload={handleImageUpload}
            jobLevels={jobLevels}
            departments={departments}
            teams={teams}
            password={password}
            isGenerated={isGenerated}
            generatePassword={generatePassword}
          />
        )

      case "teams":
        return (
          <AdminTeams
            isViewingTeam={isViewingTeam}
            isEditingTeam={isEditingTeam}
            selectedTeam={selectedTeam}
            teamForm={teamForm}
            setTeamForm={setTeamForm}
            employees={employees}
            departments={departments}
            teams={teams}
            onBackFromView={() => { setIsViewingTeam(false); setSelectedTeam(null); }}
            onCancelEdit={() => { setIsEditingTeam(false); setSelectedTeam(null); }}
            onCreateNewTeam={() => setActiveTab("createTeam")}
            handleViewTeam={handleViewTeam}
            handleEditTeam={handleEditTeam}
            handleDeleteTeam={handleDeleteTeam}
            handleUpdateTeam={handleUpdateTeam}
          />
        )

      case "createTeam":
        return (
          <AdminCreateTeam
            error={error}
            success={success}
            newTeam={newTeam}
            handleTeamFormChange={handleTeamFormChange}
            handleTeamCreation={handleTeamCreation}
            departments={departments}
            employees={employees}
            onCancel={() => setActiveTab("teams")}
          />
        )

      case "employees":
        return (
          <AdminEmployees
            isViewingEmployee={isViewingEmployee}
            isEditingEmployee={isEditingEmployee}
            selectedEmployee={selectedEmployee}
            employeeForm={employeeForm}
            setEmployeeForm={setEmployeeForm}
            jobLevels={jobLevels}
            departments={departments}
            teams={teams}
            employees={employees}
            handleEmployeeFormChange={handleEmployeeFormChange}
            handleUpdateEmployee={handleUpdateEmployee}
            handleViewEmployee={handleViewEmployee}
            handleEditEmployee={handleEditEmployee}
            handleDeleteEmployee={handleDeleteEmployee}
            onBackFromView={() => { setIsViewingEmployee(false); setSelectedEmployee(null); }}
            onCancelEdit={() => { setIsEditingEmployee(false); setSelectedEmployee(null); }}
          />
        )

      case "reports":
        return (
          <AdminReports
            handleExportEvaluations={handleExportEvaluations}
            handleExportTeams={handleExportTeams}
            handleExportEmployees={handleExportEmployees}
          />
        )

      default:
        return null
    }
  }

  return (
    <AdminMainLayout
      isSidebarOpen={isSidebarOpen}
      toggleSidebar={toggleSidebar}
      isMobile={isMobile}
      admin={admin}
      navLinks={navLinks}
      onNavClick={(key) => setActiveTab(key)}
    >
      {renderTabContent()}
    </AdminMainLayout>
  )
}

export default AdminDashboard