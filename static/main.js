const { Editor } = window.toastui
const { Grid } = window.tui
const newsListGridDataSource = {
  api: {
    readData: { url: '/news/list/', method: 'GET' },
    createData: { url: '/news/create/', method: 'POST' },
    updateData: { url: '/news/update/', method: 'PUT' },
    modifyData: { url: '/news/modify/', method: 'PUT' },
    deleteData: { url: '/news/delete/', method: 'DELETE' }
  },
  contentType: 'application/json'
}
const newsListGrid = new Grid({
  el: document.getElementById('news-list-grid'),
  bodyHeight: 'fitToParent',
  keyColumnName: 'id',
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
const newsParametersGrid = new Grid({
  el: document.getElementById('news-parameters-grid'),
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
const newsPreviewEditor = new Editor({
  el: document.getElementById('news-preview-editor'),
  height: '100%',
  previewStyle: 'vertical',
  initialEditType: 'wysiwyg',
  language: 'ru'
})
const newsContentEditor = new Editor({
  el: document.getElementById('news-content-editor'),
  height: '100%',
  previewStyle: 'vertical',
  initialEditType: 'wysiwyg',
  language: 'ru'
})


newsListGrid.on('editingFinish', () => {
  newsListGrid.request('updateData', { showConfirm: false })
})
newsListGrid.on('focusChange', ({ instance, rowKey }) => {
  console.log(instance.getRow(rowKey))
})
newsListGrid.on('successResponse', (data) => {
  console.log(data)
})


appendNews.addEventListener('click', () => {
  newsListGrid.prependRow({
    title: 'Новая новость от ' + (new Date()).toJSON()
  }, { focus: true })
  newsListGrid.request('createData', { showConfirm: false })
})
