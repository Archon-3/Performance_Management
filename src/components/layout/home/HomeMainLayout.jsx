import React from "react"
import styles from "./HomeMainLayout.module.css"
import HomeSidebar from "./HomeSidebar"
import HomeHeader from "./HomeHeader"
import HomeFooter from "./HomeFooter"

const HomeMainLayout = ({
  isSidebarOpen,
  toggleSidebar,
  isMobile,
  user,
  navLinks = [],
  activePopout,
  togglePopout,
  children,
}) => {
  return (
    <div className={styles.homeContainer}>
      <HomeSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        navLinks={navLinks}
        activePopout={activePopout}
        togglePopout={togglePopout}
        user={user}
      />

      <div className={`${styles.mainWrapper} ${!isSidebarOpen ? styles.mainWrapperFull : ''}`}>
        <HomeHeader isMobile={isMobile} toggleSidebar={toggleSidebar} user={user} />

        <main className={styles.mainContent}>{children}</main>

        <HomeFooter />
      </div>
    </div>
  )
}

export default HomeMainLayout
