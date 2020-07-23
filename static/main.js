const { Editor } = window.toastui
const { Grid } = window.tui
const grid = new Grid({
  el: document.getElementById('grid'),
  data: [{
    name: 'name',
    title: 'title'
  }],
  scrollX: false,
  scrollY: false,
  columns: [
    {
      header: 'Page name',
      name: 'name',
      editor: 'text'
    },
    {
      header: 'Page title',
      name: 'title',
      editor: 'text'
    }
  ]
})
const editor = new Editor({
  el: document.querySelector('#editor'),
  height: 'auto',
  previewStyle: 'vertical',
  initialEditType: 'wysiwyg',
  language: 'ru'
})
