const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const server = require("http").createServer();
const io = require("socket.io")(server);
const jwt = require('jsonwebtoken');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


// Set up express
const app = express();
// const expressServer = app.listen(port, () => console.log(`Server running on port ${port}`));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
// Passport confif
require('./config/passport')(passport);

// Connect to MongoDB
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));



// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);



// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

// connect server
const expressServer = app.listen(port, () => console.log(`Server running on port ${port}`));
server.listen(4000, () => console.log(`Socket.io running on port ${4000}`));


// Socket.io connection
io.use((socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token){
    jwt.verify(socket.handshake.query.token, 'SECRET', function(err, decoded) {
      if(err) {
        console.log('invalid token');
        return next(new Error('Authentication error'));
      }
      socket.decoded = decoded;
      next();
    });
  } else {
      next(new Error('Authentication error'));
  }    
})
.on('connection', (socket) => {
  console.log('connected');
    // Connection now authenticated to receive further events

    socket.on('message', function(message) {
      console.log(message);
        io.emit('message', message);
    });
});
