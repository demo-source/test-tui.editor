const Viewer = window.toastui.Editor.factory


function createPreview(preview) {
  const el = document.createElement('div')

  el.editor = new Viewer({
    el,
    height: 'auto',
    viewer: true,
    initialValue: preview || ''
  })

  return el
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
      const preview = createPreview(item.preview)

      newsList.append(preview)
    }
  })
  .catch(error => console.error(error))
