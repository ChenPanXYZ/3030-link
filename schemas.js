const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const urlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    unique: true,
    required: true
  },
  maker: {
    type: ObjectId,
    required: true
  }
})

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    quote: {
      type: Number,
      required: true
    }
  }
)

module.exports = {
  urlSchema: urlSchema,
  userSchema: userSchema
}