function BlogService() {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const url = 'https://blog.kata.academy/api'
  const requestLimit = 5

  async function getResource(url) {
    try {
      const res = await fetch(url, options)
      if (res.status === 422) {
        throw new Error('Неправильный пароль')
      } else if (!res.ok) {
        throw new Error(`Ошибка запроса к ${url} , статус: ${res.status}`)
      }
      if (res.status !== 204) {
        return res.json()
      } else {
        return
      }
    } catch (error) {
      if (error.message.includes('отсутствует подключение к сети')) {
        throw new Error('Ошибка отсутствия сети')
      } else {
        throw error
      }
    }
  }

  async function getArticles(offset, token) {
    options.headers.Authorization = `Bearer ${token}`
    const res = await getResource(`${url}/articles/?limit=${requestLimit}&offset=${offset}`)
    return res
  }

  async function getArticle(id, token) {
    options.headers.Authorization = `Bearer ${token}`
    const res = await getResource(`${url}/articles/${id}`)
    return res.article
  }

  async function signUp(data) {
    options.body = data
    options.method = 'POST'
    const res = await getResource(`${url}/users`)
    return res
  }

  async function signIn(data) {
    options.body = data
    options.method = 'POST'
    const res = await getResource(`${url}/users/login`)
    return res.user
  }

  async function getUser(token) {
    options.method = 'GET'
    options.headers.Authorization = `Bearer ${token}`
    const res = await getResource(`${url}/user`)
    return res.user
  }

  async function editUser(data, token) {
    options.body = data
    options.method = 'PUT'
    options.headers.Authorization = `Bearer ${token}`
    const res = await getResource(`${url}/user`)
    return res.user
  }

  async function createArticle(data, token) {
    options.body = data
    options.method = 'POST'
    options.headers.Authorization = `Bearer ${token}`
    const res = await getResource(`${url}/articles`)
    return res
  }

  async function updateArticle(data, token, slug) {
    options.body = data
    options.method = 'PUT'
    options.headers.Authorization = `Bearer ${token}`
    const res = await getResource(`${url}/articles/${slug}`)
    return res
  }

  async function deleteArticle(token, slug) {
    options.method = 'DELETE'
    options.headers.Authorization = `Bearer ${token}`
    return getResource(`${url}/articles/${slug}`)
  }

  async function favoriteAnArticle(token, slug) {
    options.method = 'POST'
    options.headers.Authorization = `Bearer ${token}`
    return getResource(`${url}/articles/${slug}/favorite`)
  }

  async function unfavoriteAnArticle(token, slug) {
    options.method = 'DELETE'
    options.headers.Authorization = `Bearer ${token}`
    return getResource(`${url}/articles/${slug}/favorite`)
  }

  return {
    getArticles,
    getArticle,
    signUp,
    signIn,
    getUser,
    editUser,
    createArticle,
    updateArticle,
    deleteArticle,
    favoriteAnArticle,
    unfavoriteAnArticle,
  }
}

export default BlogService
