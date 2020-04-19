const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const path = require('path');
const csrf = require('csurf');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const cardRoutes = require('./routes/card');
const addRoutes = require('./routes/add');
const ordersRoutes = require('./routes/orders');
const coursesRoutes = require('./routes/courses');
const authRoutes = require('./routes/auth');
const varMiddelware = require('./middelware/variables');
const userMiddelware = require('./middelware/user');

const app = express();
const url = "mongodb+srv://evdiso:HP0C997YxtiLvYJ6@cluster0-3u6nv.azure.mongodb.net/shop";

const store = new MongoStore({
  collection: 'sessions',
  uri: url
});

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false,
  store
}));
app.use(csrf());
app.use(varMiddelware);
app.use(userMiddelware);

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);
app.use('/orders', ordersRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useFindAndModify: false
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start();


