const express = require('express');
const sequelize = require('./util/database');
const bodyParser = require('body-parser');
const cors = require('cors');

const Personal = require('./models/Personal');
const User = require('./models/User');
const Address = require('./models/Address');
const Professional = require('./models/Professional');

const app = express();

const editRoutes = require('./routes/edit');

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
})

app.use('/edit', editRoutes.routes);

User.hasOne(Personal);
User.hasOne(Address);
User.hasOne(Professional);
Personal.hasOne(User);
Address.hasOne(User);
Professional.hasOne(User);

sequelize
  .sync()
  .then(() => User.findByPk(1))
  .then(user => !user ?
    User.create({ username: 'user001', password: 'aaAA11!!' })
    : user)
  .then(() => app.listen(8080))
  .catch(err => console.error(err))