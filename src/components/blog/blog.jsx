import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'

import {
  addBlogStarted,
  addBlogSuccsess,
  addBlogFailure,
  deleteBlogStarted,
  deleteBlogSuccsess,
  deleteBlogFailure,
} from '../../actions/actions'
import BlogService from '../../services/blog-services'
import BlogItem from '../blogItem'
import Error from '../error'
import Spinner from '../spinner/spinner'

import styles from './blog.module.scss'

function Blog() {
  const [blogIsDelete, setBlogIsDelete] = useState(false)
  const [favorited, setFavorited] = useState(null)
  const { blog, error, loading } = useSelector((state) => state.blog)
  const { userName } = useSelector((state) => state.user)
  const { id } = useParams()
  const dispatch = useDispatch()

  const token = localStorage.getItem('token')
  const isLoggedIn = token ? true : false
  const { getArticle, deleteArticle, favoriteAnArticle, unfavoriteAnArticle } = BlogService()

  useEffect(() => {
    if (id) getBlog()
    setBlogIsDelete(false)
  }, [])

  useEffect(() => {
    setFavorited(blog.favorited)
  }, [blog])

  const getBlog = async () => {
    dispatch(addBlogStarted())
    try {
      const res = await getArticle(id, token)
      onBlogLoaded(res)
    } catch (error) {
      dispatch(addBlogFailure(error))
    }
  }

  const confirmDeleteTag = () => {
    if (confirm('Вы уверены, что хотите удалить статью?')) {
      handleDeleteTag()
      alert('Статья удалена успешно!')
    } else {
      alert('Удаление статьи отменено.')
    }
  }

  const handleDeleteTag = async () => {
    dispatch(deleteBlogStarted())
    try {
      await deleteArticle(token, blog.slug)
      setBlogIsDelete(true)
      dispatch(deleteBlogSuccsess())
    } catch (error) {
      dispatch(deleteBlogFailure(error.message))
    }
  }

  const handleToggleFavorite = async () => {
    if (!favorited) {
      try {
        await favoriteAnArticle(token, blog.slug)
        setFavorited(true)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        await unfavoriteAnArticle(token, blog.slug)
        setFavorited(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const onBlogLoaded = (blog) => {
    dispatch(addBlogSuccsess(blog))
  }

  const errorMessage = error ? <Error message={error} /> : null
  const spinner = loading ? <Spinner /> : null
  const content =
    spinner ||
    errorMessage ||
    (blog.slug ? (
      <BlogItem
        data={blog}
        userName={userName}
        favorited={favorited}
        handleDeleteTag={confirmDeleteTag}
        handleToggleFavorite={handleToggleFavorite}
      />
    ) : null)

  return (
    <>
      {/* {!isLoggedIn && <Redirect to="/sign-in" />} */}
      {blogIsDelete && <Redirect to="/" />}
      <div className={styles.blog}>{content}</div>
    </>
  )
}

export default Blog
