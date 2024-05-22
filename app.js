const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt')
const connection = require('./database/connection');
const queries = require('./database/queries');
const path = require('path');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//root directory login method
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

//post method
app.post('/', async (req, res) => {
  try {
    let ee = req.body.email;
    const users = await queries.getUserByEmail(ee);
    
    if (users && password) {
      return res.redirect('/');
    } else {
      const user = users[0];
      try {
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (passwordMatch) {
          req.session.user = user;
          return res.sendFile(path.join(__dirname, 'public', 'home.html'));
        } else {
          return res.redirect('/');
        }
      } catch (error) {
        console.error('Error comparing passwords:', error);
        return res.redirect('/');
      }
    }
  } catch (error) {
    console.error('Error retrieving user by email:', error);
    return res.redirect('/');
  }
});


//register method here
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.post('/register', async (req, res) => {
  try {
    console.log(req.body)
    const username=req.body.username
    const email=req.body.email
    const password=req.body.password
    console.log(username,email,password)
    if (!username ||!email || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    const salt=10
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = { username, email, password: hashedPassword };
    const result = await queries.insertUser(user);

    if (result) {

      res.redirect('/');
    } else {
      res.redirect('/register');
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.redirect('/register');
  }
});
//event registration method
app.get('/EventRegistation', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'EventRegistation.html'));
});

app.post('/EventRegistation', async (req, res) => {
  try {
    const { tittle, date, time, location } = req.body;
    
    const events = { tittle, date, time, location };

    console.log(events)
    const result = await queries.addEventVenue(events);
    if (result) {
      res.redirect('./dashboard')
    }
    else {
      res.redirect('./EventRegistation')
    }

  }
  catch (error) {
    console.error(error)
    res.redirect('./EventRegistation')

  }
});

app.get('/events', (req, res) => {
  connection.query('SELECT * FROM events', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});


app.delete('/events/:id', (req, res) => {
  const eventId = req.params.id;
  connection.query('DELETE FROM events WHERE id = ?', eventId, (error, results) => {
    if (error) throw error;
    res.json({ message: 'Event deleted successfully', id: eventId });
  });
});

app.post('/events', (req, res) => {
  const { title, date, time, location } = req.body;
  connection.query('INSERT INTO events (title, date, time, location) VALUES (?, ?, ?, ?)', [title, date, time, location], (error, results) => {
    if (error) throw error;
    res.json({ message: 'Event added successfully', event: { title, date, time, location, id: results.insertId } });
  });
});


app.get('/logout',(req,res)=>{
  res.redirect('/')
})


//server started
app.listen(5500, () => {
  console.log('Server is running on http://localhost:5500');
});