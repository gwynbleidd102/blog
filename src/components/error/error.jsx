import React from 'react'

import errorImg from '../../assets/images/error.png'

import styles from './error.module.scss'

const Error = () => {
  return (
    <div className={styles['error']}>
      <img className={styles['error__img']} src={errorImg} alt="Логотип ошибки при работе приложения" />
      <span className={styles['error__title']}>Oh no... Shit happens tho</span>
    </div>
  )
}

export default Error
