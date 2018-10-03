const db = require('../models');

db.sync({ force: true })
  .then(() => {
    console.log('Database sync\'d');
  })
  .catch(
    e => console.log('Uh oh...', e)
  )
  .then(() => db.close());

