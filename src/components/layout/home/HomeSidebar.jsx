import React from "react"
import { Link } from "react-router-dom"
import styles from "./HomeSidebar.module.css"
import { uploadUrl } from "../../../lib/api"

const HomeSidebar = ({ isSidebarOpen, toggleSidebar, navLinks = [], activePopout, togglePopout, user }) => {
  return (
    <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.sidebarLogo}>
          <img src="/astu_logo.svg" alt="ASTU Logo" className={styles.sidebarLogoImage} />
          {isSidebarOpen && (
            <div className={styles.sidebarTitle}>
              <h3>PMS</h3>
              <p>ASTU</p>
            </div>
          )}
        </div>
        <button className={styles.sidebarToggle} onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12H20M20 12L13 5M20 12L13 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>
      
      <nav className={styles.sidebarNav}>
        <ul>
          {navLinks.map((link, index) => (
            <li key={index}>
              <div className={styles.navItemContainer}>
                <Link 
                  to={link.link} 
                  className={`${styles.navLink} ${link.active ? styles.active : ''}`}
                  onClick={(e) => {
                    if (link.hasPopout) {
                      e.preventDefault()
                      togglePopout(link.title)
                    }
                  }}
                >
                  <div className={styles.navIcon}>{link.icon}</div>
                  {isSidebarOpen && <span>{link.title}</span>}
                  {link.hasPopout && isSidebarOpen && (
                    <div className={styles.chevronIcon}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </Link>
                
                {link.hasPopout && activePopout === link.title && (
                  <div className={styles.popoutMenu}>
                    {link.popoutItems.map((item, idx) => (
                      <Link 
                        key={idx} 
                        to={item.link} 
                        className={styles.popoutItem}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>
      
      {isSidebarOpen && (
        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <img 
              src={user?.profileImageId ? uploadUrl(user.profileImageId) : (user?.avatar || "/assets/avatar-placeholder.png")} 
              alt="User Avatar" 
              className={styles.userAvatar} 
            />
            <div>
              <h4>{(user?.name || '').split(' ')[0]}</h4>
              <p>{user?.role}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}

export default HomeSidebar
