import fastifyPlugin from 'fastify-plugin'


async function newsList(request, reply) {
  const { perPage, page } = request.body
  const news = await this.db.News.findAll({
    order: [['id', 'DESC']],
    offset: Number(perPage) * (Number(page) - 1),
    limit: Number(perPage)
  })
  const totalCount = await this.db.News.count()

  reply.send({
    result: true,
    event: 'readData',
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
    const row = (await this.db.News.create(createdRow)).toJSON()

    row.rowKey = createdRow.rowKey
    contents.push(row)
  }

  reply.send({
    result: true,
    event: 'createData',
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

      const row = (await this.db.News.findByPk(updatedRow.id)).toJSON()

      row.rowKey = updatedRow.rowKey
      contents.push(row)
    }
  }
  reply.send({
    result: true,
    event: 'updateData',
    data: { contents }
  })
}


async function newsDelete(request, reply) {
  const { deletedRows } = request.body

  for (const deletedRow of deletedRows) {
    await this.db.News.destroy({
      where: {
        id: deletedRow.id
      }
    })
  }

  reply.send({
    result: true,
    data: {}
  })
}


export default fastifyPlugin(function routes(app, opts, done) {
  app
    .post('/news/list/', newsList)
    .post('/news/create/', newsCreate)
    .post('/news/update/', newsUpdate)
    .post('/news/delete/', newsDelete)

  done()
})
