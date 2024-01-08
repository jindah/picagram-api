import React from 'react'
import NoResults from '../assets/no-results.png'
import styles from '../styles/NotFound.module.css'
import Asset from './Asset'

// Error message to users for not found pages/search
const NotFound = () => {
  return (
    <div className={styles.NotFound404}>
        <Asset src={NoResults} message="Sorry, the page you're looking for doesn't exist" />
    </div>
  )
}

export default NotFound