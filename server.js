var bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
       express = require('express'),
        logger = require('morgan'),

           app = express(),
          port = process.env.PORT || 3000,
         dbURL = 'mongodb://localhost:27017/roomies',
    userRoutes = require(__dirname + '/routes/userRoutes.js')


//  DB Initialization
mongoose.connect(dbURL,function(err){
  if (err) console.log("!-- Failed to connect to roomies db.")
  else console.log("-- Connected to roomies db.")
})
