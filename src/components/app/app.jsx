import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import ErrorBoundary from '../error-boundary'
import Header from '../header'
import BlogList from '../blogList'
import Blog from '../blog'
import SignUp from '../signUp'
import SignIn from '../signIn'
import Profile from '../profile'
import CreateArticle from '../createArticle'
import { logInSuccsess } from '../../actions/actions'
import BlogService from '../../services/blog-services'

import styles from './app.module.scss'

function App() {
  const dispatch = useDispatch()

  const { getUser } = BlogService()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      getUser(token).then((user) => dispatch(logInSuccsess(user)))
    }
  })

  return (
    <Router>
      <ErrorBoundary>
        <div className={styles.app}>
          <Header />
          <Switch>
            <Route exact path="/">
              <BlogList />
            </Route>
            <Route exact path="/blog/:id">
              <Blog />
            </Route>
            <Route exact path="/sign-up">
              <SignUp />
            </Route>
            <Route exact path="/sign-in">
              <SignIn />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/new-article">
              <CreateArticle dataType="new-article" />
            </Route>
            <Route exact path="/edit-article/:id">
              <CreateArticle dataType="edit-article" />
            </Route>
          </Switch>
        </div>
      </ErrorBoundary>
    </Router>
  )
}

export default App
