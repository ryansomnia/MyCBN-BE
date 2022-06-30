const mongoose = require('mongoose')
const Schema = mongoose.Schema
  const  articleSchema = new Schema ({
    judul: {
        type : String,
        required : true
    },
    isi:{
        type : String,
        required : true
    },
    kategori:{
        type : String,
        required : true
      },
    tag: {
        type : Array,
        required : true
    },
    dateCreated:{
        type : Date,
        default : Date.now
    },
    image: {
        type : String,
        required : true
    }
},
{
    collection: 'article'
    })
const Article = mongoose.model('article', articleSchema);

module.exports = Article; 