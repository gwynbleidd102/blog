import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import { addBlogsStarted, addBlogsSuccsess, addBlogsFailure } from '../../actions/actions'
import BlogService from '../../services/blog-services'
import BlogListItem from '../blogListItem'
import Error from '../error'
import Spinner from '../spinner/spinner'
import PagePagination from '../pagination'

import styles from './blogList.module.scss'

function BlogList() {
  const { id } = useParams()
  const idAsNumber = id ? parseInt(id, 10) : 1
  const [pages, sePages] = useState(null)
  const { blogs, error, loading } = useSelector((state) => state.blogs)
  const token = useSelector((state) => state.user.token)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  // const [currentPage, setCurrentPage] = useState(1)

  const { getArticles } = BlogService()

  useEffect(() => {
    updateBlogs()
  }, [id])

  const updateBlogs = async () => {
    dispatch(addBlogsStarted())
    try {
      const res = await getArticles((idAsNumber - 1) * 5, token)
      onBlogsLoaded(res.articles)
      sePages(Math.ceil(res.articlesCount / 5))
    } catch (error) {
      dispatch(addBlogsFailure(error))
    }
  }

  const onBlogsLoaded = (blogs) => {
    dispatch(addBlogsSuccsess(blogs))
  }

  const nextPage = (page) => {
    history.push(`/page/${page}`)
  }

  const elements = blogs.map((blog) => {
    return <BlogListItem key={blog.slug} data={blog} />
  })

  const errorMessage = error ? <Error message={error} /> : null
  const spinner = loading ? <Spinner /> : null
  const content = spinner || errorMessage || elements

  return (
    <>
      <div className={styles.blogList}>
        {content}
        <div className={styles.pagination}>
          <PagePagination nextPage={nextPage} current={idAsNumber} pages={pages} />
        </div>
      </div>
    </>
  )
}

export default BlogList
