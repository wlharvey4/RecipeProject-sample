require('dotenv').config();
const keys = require('./configuration/keys');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const recipesEndpoints = require('./endpoints/recipesEndpoints.js');
const usersEndpoints = require('./endpoints/usersEndpoints.js');
// const actionsEndpoints = require('./endpoints/actionsEndpoints.js');
// const contextsEndpoints = require('./endpoints/contextsEndpoints.js');

// HEROKU ASSIGNS TO PORT; LOCAL USES LOCAL_PORT
const PORT = process.env.PORT || process.env.LOCAL_PORT;
const server = express();

server.use(bodyParser.json());
server.use(cors());

server.use('/api/recipes', recipesEndpoints);
server.use('/api/users', usersEndpoints);
// server.use('/api/actions', actionsEndpoints);
// server.use('/api/contexts', contextsEndpoints);

// USED FOR PRODUCTION ONLY
if (process.env.NODE_ENV === 'production') {
  server.use(express.static('client/build'));

  const path = require('path');
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

server.listen(PORT, () => console.log(`running on port ${PORT}`));
