const Viewer = window.toastui.Editor.factory


function createPreview(data) {
  const elNews = document.createElement('div')
  const elTitle = document.createElement('a')
  const elPreview = document.createElement('div')

  elTitle.textContent = data.title
  elTitle.classList.add('preview-title')
  elTitle.href = `/news/read/?url=${data.url}`

  elNews.append(elTitle)
  elNews.append(elPreview)
  elNews.editor = new Viewer({
    el: elPreview,
    height: 'auto',
    viewer: true,
    initialValue: data.preview || '... Пусто ...'
  })

  return elNews
}

window
  .fetch('/news/list/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    credentials: 'include',
    body: JSON.stringify({ perPage: 10, page: 1 })
  })
  .then(data => data.json())
  .then(({ data: { contents } }) => {
    const newsList = document.getElementById('news-list')

    for (const item of contents) {
      const preview = createPreview(item)

      newsList.append(preview)
    }
  })
  .catch(error => console.error(error))
