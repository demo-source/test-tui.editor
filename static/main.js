const { Editor } = window.toastui
const { Grid } = window.tui
const newsListGridDataSource = {
  api: {
    readData: { url: '/news/list/', method: 'POST' },
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
const toolbarPE = newsPreviewEditor.getUI().getToolbar()
const newsContentEditorEl = document.getElementById('news-content-editor')
const newsContentEditor = new Editor({
  el: newsContentEditorEl,
  height: '100%',
  previewStyle: 'vertical',
  initialEditType: 'wysiwyg',
  language: 'ru'
})
const toolbarCE = newsContentEditor.getUI().getToolbar()
let currentNewsData = null


function hideEdit() {
  currentNewsData = null
  newsPreviewEditor.setMarkdown('')
  newsContentEditor.setMarkdown('')
  newsParametersGridEl.classList.add('hide')
  newsPreviewEditorEL.classList.add('hide')
  newsContentEditorEl.classList.add('hide')
}


function showEdit(editData) {
  currentNewsData = editData
  newsPreviewEditor.setMarkdown(editData.preview || '')
  newsContentEditor.setMarkdown(editData.content || '')
  newsParametersGridEl.classList.remove('hide')
  newsPreviewEditorEL.classList.remove('hide')
  newsContentEditorEl.classList.remove('hide')
}

newsPreviewEditor.eventManager.addEventType('savePreviewEditor')
newsPreviewEditor.eventManager.listen('savePreviewEditor', () => {
  currentNewsData.preview = newsPreviewEditor.getMarkdown()
  newsListGrid.setRow(currentNewsData.rowKey, currentNewsData)
  newsListGrid.request('updateData', { showConfirm: false })
})
toolbarPE.insertItem(0, {
  type: 'button',
  options: {
    className: 'editor-save-button',
    event: 'savePreviewEditor',
    tooltip: 'Сохранить превью новости',
    text: 'Сохранить'
  }
})

newsContentEditor.eventManager.addEventType('saveContentEditor')
newsContentEditor.eventManager.listen('saveContentEditor', () => {
  currentNewsData.content = newsContentEditor.getMarkdown()
  newsListGrid.setRow(currentNewsData.rowKey, currentNewsData)
  newsListGrid.request('updateData', { showConfirm: false })
})
toolbarCE.insertItem(0, {
  type: 'button',
  options: {
    className: 'editor-save-button',
    event: 'saveContentEditor',
    tooltip: 'Сохранить новость',
    text: 'Сохранить'
  }
})

hideEdit()

newsListGrid.on('editingFinish', () => {
  newsListGrid.request('updateData', { showConfirm: false })
})
newsListGrid.on('focusChange', ({ instance, prevRowKey, rowKey }) => {
  showEdit(instance.getRow(rowKey))
})
newsListGrid.on('afterPageMove', () => {
  hideEdit()
})
newsListGrid.on('successResponse', ({ instance, xhr }) => {
  const result = JSON.parse(xhr.responseText)

  if (result.event in { createData: 1 }) {
    for (const item of result.data.contents) {
      instance.setRow(item.rowKey, item)
    }
  }
})

appendNews.addEventListener('click', () => {
  newsListGrid.prependRow({
    title: 'Новая новость от ' + (new Date()).toJSON()
  }, { focus: true })
  newsListGrid.request('createData', { showConfirm: false })
})

removeNews.addEventListener('click', () => {
  if (currentNewsData) {
    newsListGrid.removeRow(currentNewsData.rowKey)
    newsListGrid.request('deleteData', { showConfirm: false })
    hideEdit()
  }
})
