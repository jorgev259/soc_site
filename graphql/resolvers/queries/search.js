import { Op, literal } from 'sequelize'

const resolvers = {
  Query: {
    searchAlbum: (parent, { title = '', classes, limit, page = 0, order = ['createdAt'], mode = 'DESC', status = ['show'] }, { db }) => {
      const titleWords = title.split(' ')

      return searchPage({ limit, page, model: 'ost' }, {
        where: {
          [Op.or]: [
            { [Op.and]: titleWords.map(t => ({ title: { [Op.like]: `%${t}%` } })) },
            { [Op.and]: titleWords.map(t => ({ subTitle: { [Op.like]: `%${t}%` } })) }
          ],
          status: { [Op.in]: status }
        },
        include: classes ? [{ model: db.models.class, where: { name: { [Op.in]: classes } } }] : [],
        order: [literal('`ost`.`status` = \'coming\' DESC'), ...order.map(o => [o, mode])]
      }, db)
    },
    searchAlbumByArtist: async (parent, { name, classes, limit, page = 0, order = ['createdAt'], mode = 'DESC', status = ['show'] }, { db }) => {
      const include = [{ model: db.models.artist, where: { name: { [Op.like]: `%${name}%` } } }]

      if (classes) include.push({ model: db.models.class, where: { name: { [Op.in]: classes } } })

      return searchPage({ limit, page, model: 'ost' }, {
        where: { status: { [Op.in]: status } },
        include,
        order: order.map(o => [o, mode])
      }, db)
    },
    searchAnimation: (parent, { title = '', limit, page = 0, order = 'createdAt', mode = 'DESC' }, { db }) => searchPage({ title, limit, page, model: 'animation' }, {
      where: { title: { [Op.like]: `%${title}%` } },
      order: [[order, mode]]
    }, db),
    searchStudio: (parent, { name = '', limit, page = 0, order = 'createdAt', mode = 'DESC' }, { db }) => searchPage({ name, limit, page, model: 'studio' }, {
      where: { name: { [Op.like]: `%${name}%` } },
      order: [[order, mode]]
    }, db),
    searchGame: (parent, { name = '', limit, page = 0, order = 'createdAt', mode = 'DESC' }, { db }) => searchPage({ name, limit, page, model: 'game' }, {
      where: { name: { [Op.like]: `%${name}%` } },
      order: [[order, mode]]
    }, db),
    searchSeries: (parent, { name = '', limit, page = 0, order = 'createdAt', mode = 'DESC' }, { db }) => searchPage({ name, limit, page, model: 'series' }, {
      where: { name: { [Op.like]: `%${name}%` } },
      order: [[order, mode]]
    }, db),
    searchSeriesByName: (parent, { name }, { db }) => db.models.series.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }
    }),
    searchPublishersByName: (parent, { name }, { db }) => db.models.publisher.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }
    }),
    searchPlatformsByName: (parent, { name, type }, { db }) => db.models.platform.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        },
        type: { [Op.like]: `%${type}%` }
      }
    })
  }
}

const searchPage = (args, options, db) => {
  const { limit, page, model } = args

  if (limit !== undefined) {
    options.limit = limit
    options.offset = limit * page
  }

  return db.models[model].findAndCountAll(options)
}

export default resolvers
