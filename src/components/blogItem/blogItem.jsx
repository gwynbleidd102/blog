import ReactMarkdown from 'react-markdown'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import heart from '../../assets/images/heart.svg'
import heartRed from '../../assets/images/heart-red.svg'

import styles from './blogItem.module.scss'

function BlogItem({
  data: {
    author: { username, image },
    body,
    description,
    favoritesCount,
    slug,
    tagList,
    title,
    updatedAt,
  },
  userName,
  favorited,
  handleDeleteTag,
  handleToggleFavorite,
}) {
  const [heartsCount, setHeartsCount] = useState(favoritesCount)

  const handleToggle = () => {
    if (favorited) {
      setHeartsCount((heartsCount) => heartsCount - 1)
    } else {
      setHeartsCount((heartsCount) => heartsCount + 1)
    }
    handleToggleFavorite()
  }

  const blogList = tagList.map((tag, index) => {
    return (
      <li key={index} className={styles['blogItem__tagList_list-item']}>
        {tag}
      </li>
    )
  })

  const formattedDate = format(new Date(updatedAt), 'MMMM d, yyyy')

  const btns = (
    <div className={styles['blogItem__groupButton']}>
      <button className={`${styles['blogItem__btn']} ${styles['blogItem__delete']}`} onClick={handleDeleteTag}>
        Delete
      </button>
      <Link className={`${styles['blogItem__btn']} ${styles['blogItem__edit']}`} to={`/edit-article/${slug}`}>
        Edit
      </Link>
    </div>
  )

  const img = favorited ? heartRed : heart

  const section = (
    <section className={styles.blogItem}>
      <div className={styles['blogItem__container']}>
        <div className={styles['blogItem__block']}>
          <h2 className={styles['blogItem__title']}>{title}</h2>
          <img className={styles['blogItem__heart']} src={img} alt="heart" onClick={handleToggle} />
          <span className={styles['blogItem__favorited']}>{heartsCount}</span>
        </div>
        <div className={styles['blogItem__tagList']}>
          <ul className={styles['blogItem__tagList_list']}>{blogList}</ul>
        </div>
        <p className={styles['blogItem__description']}>{description}</p>
        <div className={styles['blogItem_body']}>
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>
      <div className={styles['blogItem__author']}>
        <div className={styles['blogItem__case']}>
          <p className={styles['blogItem__name']}>{username}</p>
          <p className={styles['blogItem__created']}>{formattedDate}</p>
        </div>
        <img className={styles['blogItem__avatar']} src={image} alt="avatar" />
      </div>
      {userName === username ? btns : null}
    </section>
  )

  return <>{section}</>
}

export default BlogItem
