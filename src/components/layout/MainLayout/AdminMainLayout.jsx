import React from "react"
import Sidebar from "../Sidebar/Sidebar"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import styles from "./AdminMainLayout.module.css"

const AdminMainLayout = ({
  isSidebarOpen,
  toggleSidebar,
  isMobile,
  admin,
  navLinks = [],
  onNavClick,
  children,
}) => {
  return (
    <div className={styles.adminContainer}>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        navLinks={navLinks}
        onNavClick={onNavClick}
        admin={admin}
      />

      <div className={`${styles.mainWrapper} ${!isSidebarOpen ? styles.mainWrapperFull : ""}`}>
        <Header
          isMobile={isMobile}
          toggleSidebar={toggleSidebar}
          title="Performance Management System - Admin"
          subtitle="Adama Science & Technology University"
          user={admin}
        />

        <main className={styles.mainContent}>{children}</main>

        <Footer />
      </div>
    </div>
  )
}

export default AdminMainLayout
