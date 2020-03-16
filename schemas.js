const mongoose = require('mongoose')

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
    type: String,
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