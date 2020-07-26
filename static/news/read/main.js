const Viewer = window.toastui.Editor.factory


window
  .fetch('/news/get-by-url/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    credentials: 'include',
    body: JSON.stringify({ url: (new URLSearchParams(window.location.search)).get('url') })
  })
  .then(data => data.json())
  .then((data) => {
    const viewer = document.getElementById('viewer')
    const title = document.getElementById('title')

    document.title = data.title
    title.textContent = data.title
    viewer.editor = new Viewer({
      el: viewer,
      height: 'auto',
      viewer: true,
      initialValue: data.content || '... Пусто ...'
    })
  })
  .catch(error => console.error(error))
