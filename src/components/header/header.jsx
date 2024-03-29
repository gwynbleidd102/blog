import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logOut } from '../../actions/actions'
import profileImage from '../../assets/images/profileImage.svg'
import logo from '../../assets/images/logo.png'

import styles from './header.module.scss'

function Header() {
  const user = useSelector((state) => state.user)
  const isLoggedIn = user.token ? true : false
  const dispatch = useDispatch()

  const logOutUser = () => {
    dispatch(logOut())
    localStorage.clear()
  }

  if (isLoggedIn) {
    const img = String(user.image) !== 'undefined' ? user.image : profileImage

    return (
      <header className={styles.header}>
        <Link className={styles['header__link']} to="/">
          <img src={logo}></img>
          Realworld Blog
        </Link>
        <div>
          <Link className={`${styles.btn} ${styles.createBtn}`} to="/new-article">
            Create article
          </Link>
          <Link className={`${styles.btn} ${styles.profileBtn}`} to="/profile">
            <div className={styles['profileBtn__container']}>
              <p className={styles['profileBtn__name']}>{user.userName}</p>
              <img className={styles['profileBtn__avatar']} src={img} alt="avatar" />
            </div>
          </Link>
          <button onClick={logOutUser} className={`${styles.btn} ${styles.logOutBtn}`} to="/sign-up">
            Log out
          </button>
        </div>
      </header>
    )
  } else {
    return (
      <header className={styles.header}>
        <Link className={styles['header__link']} to="/">
          Realworld Blog
        </Link>
        <div>
          <Link className={`${styles.btn} ${styles.signInBtn}`} to="/sign-in">
            Sign In
          </Link>
          <Link className={`${styles.btn} ${styles.signUpBtn}`} to="/sign-up">
            Sign Up
          </Link>
        </div>
      </header>
    )
  }
}

export default Header
