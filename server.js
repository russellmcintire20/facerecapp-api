const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-aerodynamic-45721',
    user : 'McIntires',
    password : '',
    database : 'facerec-app'
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> { res.send('it is working!') })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt, saltRounds))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

const port = process.env.PORT;

app.listen(port || 3000, ()=> {
  console.log(`app is running on port ${port}`);
})