import fastifyPlugin from 'fastify-plugin'


async function newsList(request, reply) {
  const { perPage, page } = request.query
  const news = await this.db.News.findAll({
    order: [['id', 'DESC']],
    offset: Number(perPage) * (Number(page) - 1),
    limit: Number(perPage)
  })
  const totalCount = await this.db.News.count()

  reply.send({
    result: true,
    data: {
      contents: news,
      pagination: { page: Number(page), totalCount }
    }
  })
}


async function newsCreate(request, reply) {
  const { createdRows } = request.body
  const contents = []

  for (const createdRow of createdRows) {
    contents.push(await this.db.News.create(createdRow))
  }

  reply.send({
    result: true,
    data: { contents }
  })
}


async function newsUpdate(request, reply) {
  const { updatedRows } = request.body
  const contents = []

  for (const updatedRow of updatedRows) {
    if (updatedRow.id) {
      await this.db.News.update(updatedRow, {
        where: {
          id: updatedRow.id
        }
      })
      contents.push(await this.db.News.findByPk(updatedRow.id))
    }
  }
  reply.send({
    result: true,
    data: { contents }
  })
}


export default fastifyPlugin(function routes(app, opts, done) {
  app
    .get('/news/list/', newsList)
    .post('/news/create/', newsCreate)
    .put('/news/update/', newsUpdate)

  done()
})
