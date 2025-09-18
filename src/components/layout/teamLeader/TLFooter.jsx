import React from "react"
import { Link } from "react-router-dom"
import styles from "./TLFooter.module.css"

const TLFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; {new Date().getFullYear()} Adama Science & Technology University. All rights reserved.</p>
        <div className={styles.footerLinks}>
          <Link to="/help">Help</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  )
}

export default TLFooter
