import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import heart from '../../assets/images/heart.svg'
import heartRed from '../../assets/images/heart-red.svg'

import styles from './blogListItem.module.scss'

function BlogListItem({
  data: {
    title,
    favoritesCount,
    tagList,
    body,
    updatedAt,
    favorited,
    slug,
    author: { username, image },
  },
}) {
  const blogList = tagList.map((tag, index) => {
    return (
      <li key={index} className={styles['blogListItem__tagList_list-item']}>
        {tag}
      </li>
    )
  })

  const img = favorited ? heartRed : heart
  const formattedDate = format(new Date(updatedAt), 'MMMM d, yyyy')

  return (
    <Link className={styles['blogListItem__link']} to={`/blog/${slug}`}>
      <section className={styles.blogListItem}>
        <div className={styles['blogListItem__container']}>
          <div className={styles['blogListItem__block']}>
            <h2 className={styles['blogListItem__title']}>{title}</h2>
            <img className={styles['blogListItem__heart']} src={img} alt="heart" />
            <span className={styles['blogListItem__favorited']}>{favoritesCount}</span>
          </div>
          <div className={styles['blogListItem__tagList']}>
            <ul className={styles['blogListItem__tagList_list']}>{blogList}</ul>
          </div>
          <div className={styles['blogListItem__body']}>
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
        </div>
        <div className={styles['blogListItem__author']}>
          <div className={styles['blogListItem__case']}>
            <p className={styles['blogListItem__name']}>{username}</p>
            <p className={styles['blogListItem__created']}>{formattedDate}</p>
          </div>
          <img className={styles['blogListItem__avatar']} src={image} alt="avatar" />
        </div>
      </section>
    </Link>
  )
}

export default BlogListItem
