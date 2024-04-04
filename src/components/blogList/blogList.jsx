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
  const [offset, setOffset] = useState(0)
  const [pages, sePages] = useState(null)
  const { blogs, error, loading } = useSelector((state) => state.blogs)
  const token = useSelector((state) => state.user.token)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState(1)

  const { getArticles } = BlogService()

  useEffect(() => {
    const page = new URLSearchParams(location.search).get('page')
    if (page) {
      setOffset((page - 1) * 5)
      // setCurrentPage(page)
    }
  }, [location])

  useEffect(() => {
    updateBlogs()
  }, [offset])

  const updateBlogs = async () => {
    dispatch(addBlogsStarted())
    try {
      const res = await getArticles(offset, token)
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
    history.push(`?page=${page.toString()}`)
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
          <PagePagination nextPage={nextPage} pages={pages} />
        </div>
      </div>
    </>
  )
}

export default BlogList
