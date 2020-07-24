const { Editor } = window.toastui
const { Grid } = window.tui
const newsListGrid = new Grid({
  el: document.getElementById('news-list-grid'),
  bodyHeight: 'fitToParent',
  rowHeaders: ['rowNum'],
  data: [{
    title: 'title'
  }],
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
const newsParametersGrid = new Grid({
  el: document.getElementById('news-parameters-grid'),
  bodyHeight: 'fitToParent',
  rowHeaders: ['rowNum'],
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
