import React from "react"
import styles from "./Sidebar.module.css"

const Sidebar = ({ isSidebarOpen, toggleSidebar, navLinks = [], onNavClick, admin }) => {
  return (
    <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ""}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.sidebarLogo}>
          <img src="/astu_logo.svg" alt="ASTU Logo" className={styles.sidebarLogoImage} />
          {isSidebarOpen && (
            <div className={styles.sidebarTitle}>
              <h3>Admin PMS</h3>
              <p>ASTU</p>
            </div>
          )}
        </div>
        <button className={styles.sidebarToggle} onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12H20M20 12L13 5M20 12L13 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>

      <nav className={styles.sidebarNav}>
        <ul>
          {navLinks.map((link, index) => (
            <li key={index}>
              <div className={styles.navItemContainer}>
                <button className={`${styles.navLink} ${link.active ? styles.active : ""}`} onClick={() => onNavClick(link.tabKey)}>
                  <div className={styles.navIcon}>{link.icon}</div>
                  {isSidebarOpen && <span>{link.title}</span>}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {isSidebarOpen && (
        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <img src={admin?.avatar || "/placeholder.svg"} alt="Admin Avatar" className={styles.userAvatar} />
            <div>
              <h4>{(admin?.name || "").split(" ")[0]}</h4>
              <p>{admin?.role}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}

export default Sidebar
