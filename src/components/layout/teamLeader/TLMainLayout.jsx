import React from "react"
import styles from "./TLMainLayout.module.css"
import TLSidebar from "./TLSidebar"
import TLHeader from "./TLHeader"
import TLFooter from "./TLFooter"

const TLMainLayout = ({
  isSidebarOpen,
  toggleSidebar,
  isMobile,
  admin,
  menuItems = [],
  activeTab,
  onSelectTab,
  contentClassName = "",
  children,
}) => {
  return (
    <div className={styles.homeContainer}>
      <TLSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        menuItems={menuItems}
        activeTab={activeTab}
        onSelectTab={onSelectTab}
        admin={admin}
      />

      <div className={`${styles.mainWrapper} ${!isSidebarOpen ? styles.mainWrapperFull : ""}`}>
        <TLHeader
          isMobile={isMobile}
          toggleSidebar={toggleSidebar}
          title="Performance Management System"
          subtitle="Adama Science & Technology University"
          user={admin}
        />

        <main className={`${styles.mainContent} ${contentClassName || ""}`}>{children}</main>

        <TLFooter />
      </div>
    </div>
  )
}

export default TLMainLayout
