
const mongoose= require('mongoose')

 const schema = mongoose.Schema
 
  const blogschema = new schema({
    title : {
        type : String
    },
    subtitle : {
        type : String
    },
    description : {
        type : String
    },
    image : {
        type : String
    }
  })

  const Blog =  mongoose.model('Blog', blogschema)

  module.exports = Blog





  // Blog Table nme