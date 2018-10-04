const { ViewHistory, Song } = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const where = {
        UserId: userId
      }
      const viewHistorys = await ViewHistory.findAll({
        where: where,
        include: [
          {
            model: Song
          }
        ]
      }).map(viewHistory => viewHistory.toJSON())
        .map(viewHistory => _.extend({
          viewHistoryId: viewHistory.id
        }, viewHistory.Song))
      res.send(viewHistorys)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to fetch the view history'
      })
    }
  },
  async post (req, res) {
    try {
      const { songId } = req.body
      const userId = req.user.id
      const viewHistory = await ViewHistory.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      if (viewHistory) {
        return
      }
      const newHistory = await ViewHistory.create({
        SongId: songId,
        UserId: userId
      })
      res.send(newHistory)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to create the history'
      })
    }
  },
  async delete (req, res) {
    try {
      const userId = req.user.id
      const { historyId } = req.params
      const viewHistory = await ViewHistory.findOne({
        where: {
          id: historyId,
          UserId: userId
        }
      })
      if (!viewHistory) {
        return res.status(403).send({
          error: 'you do not have access to this view history'
        })
      }
      await viewHistory.destroy()
      res.send(viewHistory)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete the view history'
      })
    }
  }
}
