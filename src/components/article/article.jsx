import { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { blogSelector } from '../selectors/selectors'

import styles from './article.module.scss'

const Article = ({ isLoggedIn, onSubmit, tags, handleAddTag, handleDeleteTag, handleTagChange, dataType }) => {
  const history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { blog } = useSelector(blogSelector)
  const formTitle = dataType === 'new-article' ? 'Create new article' : 'Edit article'

  useEffect(() => {
    if (blog && Object.keys(blog).length === 0 && formTitle === 'Edit article') {
      history.push('/')
    }
  }, [blog])

  return (
    <div className={styles.article}>
      {!isLoggedIn && <Redirect to="/sign-in" />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles['article__title']}>{formTitle}</h1>

        <label className={styles['article__label']} htmlFor="title">
          Title
        </label>
        <input
          className={styles['article__input']}
          type="text"
          id="title"
          placeholder="Title"
          defaultValue={formTitle === 'Edit article' ? blog.title : ''}
          {...register('title', { required: true })}
        />
        {errors.title && (
          <div>
            <span className={styles['article__span']}>Поле Title обязательно для заполнения</span>
          </div>
        )}

        <label className={styles['article__label']} htmlFor="description">
          Short description
        </label>
        <input
          className={styles['article__input']}
          type="text"
          id="description"
          placeholder="Short description"
          defaultValue={formTitle === 'Edit article' ? blog.description : ''}
          {...register('description', { required: true })}
        />
        {errors.description && (
          <div>
            <span className={styles['article__span']}>Поле Description обязательно для заполнения</span>
          </div>
        )}

        <label className={styles['article__label']} htmlFor="body">
          Text
        </label>
        <textarea
          className={styles['article__textarea']}
          type="text"
          id="body"
          placeholder="Text"
          defaultValue={formTitle === 'Edit article' ? blog.body : ''}
          {...register('body', { required: true })}
        />
        {errors.body && (
          <div>
            <span className={styles['article__span']}>Поле Text обязательно для заполнения</span>
          </div>
        )}

        <div>
          {tags.length > 0 && <label className={styles['article__label']}>Tags</label>}
          {tags.map((tag, index) => (
            <div key={index} className={styles['article__container']}>
              <input
                className={styles['article__tag']}
                type="text"
                placeholder="Tag"
                value={tag}
                onChange={(elem) => handleTagChange(index, elem.target.value)}
              />
              <button
                className={`${styles['article__btn']} ${styles['btn__delete']}`}
                onClick={(elem) => handleDeleteTag(elem, index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <button className={`${styles['article__btn']} ${styles['btn__addTag']}`} onClick={handleAddTag}>
          Add tag
        </button>

        <button className={`${styles['article__btn']} ${styles['btn__submit']}`} type="submit">
          Send
        </button>
      </form>
    </div>
  )
}

export default Article
