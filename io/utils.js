const { ObjectID } = require('mongodb')

const User = require('../models/User')
const Message = require('../models/Message')

const utils = {}

utils.saveMessage = (socket, data) => {
    User.findById(ObjectID(data.userID))
        .then(user => {
            const message = new Message({
                name: user.name,
                message: data.message,
            })
            message
                .save()
                .then(() => {
                    console.log('message saved')
                    socket.emit('message', message)
                })
                .catch(err => console.log(err))
        })
        .catch(e => {
            console.log(e)
        })
}

utils.getMessage = socket => {
    Message.find()
        .sort({ $natural: -1 })
        .limit(30)
        .then(result => {
            socket.emit('conversation', result)
        })
}

module.exports = utils
