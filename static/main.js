const { Editor } = window.toastui
const { Grid } = window.tui
const newsListGridDataSource = {
  api: {
    readData: { url: '/news/list/', method: 'GET' },
    createData: { url: '/news/create/', method: 'POST' },
    updateData: { url: '/news/update/', method: 'POST' },
    modifyData: { url: '/news/modify/', method: 'PUT' },
    deleteData: { url: '/news/delete/', method: 'POST' }
  },
  contentType: 'application/json'
}
const newsListGrid = new Grid({
  el: document.getElementById('news-list-grid'),
  bodyHeight: 'fitToParent',
  data: newsListGridDataSource,
  pageOptions: {
    perPage: 5
  },
  scrollX: false,
  scrollY: false,
  columns: [
    {
      header: 'Заголок',
      name: 'title',
      editor: 'text'
    }
  ]
})
const appendNews = document.getElementById('append-news')
const removeNews = document.getElementById('remove-news')
const newsParametersGridEl = document.getElementById('news-parameters-grid')
const newsParametersGrid = new Grid({
  el: newsParametersGridEl,
  bodyHeight: 'fitToParent',
  data: [{
    name: 'url',
    value: '2020-07-24'
  }],
  scrollX: false,
  scrollY: false,
  columns: [
    {
      header: 'Параметр',
      name: 'name'
    },
    {
      header: 'Значение',
      name: 'value',
      editor: 'text'
    }
  ]
})
const newsPreviewEditorEL = document.getElementById('news-preview-editor')
const newsPreviewEditor = new Editor({
  el: newsPreviewEditorEL,
  height: '100%',
  previewStyle: 'vertical',
  initialEditType: 'wysiwyg',
  language: 'ru'
})
const newsContentEditorEl = document.getElementById('news-content-editor')
const newsContentEditor = new Editor({
  el: newsContentEditorEl,
  height: '100%',
  previewStyle: 'vertical',
  initialEditType: 'wysiwyg',
  language: 'ru'
})


function hideEdit() {
  newsParametersGridEl.classList.add('hide')
  newsPreviewEditorEL.classList.add('hide')
  newsContentEditorEl.classList.add('hide')
}


function showEdit() {
  newsParametersGridEl.classList.remove('hide')
  newsPreviewEditorEL.classList.remove('hide')
  newsContentEditorEl.classList.remove('hide')
}


hideEdit()

newsListGrid.on('editingFinish', () => {
  newsListGrid.request('updateData', { showConfirm: false })
})
newsListGrid.on('focusChange', ({ instance, prevRowKey, rowKey }) => {
  if (prevRowKey === null) {
    showEdit()
  }
  console.log(instance.getRow(rowKey))
})
newsListGrid.on('afterPageMove', () => {
  hideEdit()
})
newsListGrid.on('successResponse', ({ instance, xhr }) => {
  const result = JSON.parse(xhr.responseText)

  if (result.event in { createData: 1, updateData: 1 }) {
    instance.reloadData()
    // for (const item of result.data.contents) {
    //   instance.setRow(item.rowKey, item)
    // }
  }
})

appendNews.addEventListener('click', () => {
  newsListGrid.prependRow({
    title: 'Новая новость от ' + (new Date()).toJSON()
  }, { focus: true })
  newsListGrid.request('createData', { showConfirm: false })
})

removeNews.addEventListener('click', () => {
  newsListGrid.removeRow(newsListGrid.getFocusedCell())
  newsListGrid.request('deleteData', { showConfirm: false })
})
