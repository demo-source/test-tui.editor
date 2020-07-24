import fastifyPlugin from 'fastify-plugin'
import Sequelize from 'sequelize'


class NewsAttributes {

  id = {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }

  title = {
    type: Sequelize.TEXT
  }

  url = {
    type: Sequelize.TEXT
  }

  preview = {
    type: Sequelize.TEXT
  }

  content = {
    type: Sequelize.TEXT
  }

}


class News extends Sequelize.Model {

}


export default fastifyPlugin(async function routes(app, opts) {
  const sequelize = new Sequelize(opts.connectionString, {
    logging: opts.productionMode ? false : console.log
  })

  app.decorate('db', {
    News: News.init(new NewsAttributes(), { sequelize })
  })

  await sequelize.sync({
    force: !opts.productionMode,
    logging: opts.productionMode ? false : console.log
  })
})
