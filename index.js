import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Middleware to serve static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// const posts = [];

let posts = [
    { id: 1, title: 'First Post', content: 'This is the content of the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the content of the second post.' }
  ];


// Routes
// home page
app.get('/', (req, res) => {
    res.render('index.ejs', { posts }); // We'll pass posts data here later
  }); 


// create 
app.get('/create', (req, res) => {
  res.render('create.ejs');
});

app.post('/create', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(newPost);
  res.redirect('/');
});

// view
app.get('/view/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
      res.render('view', { post });
    } else {
      res.redirect('/');
    }
  });

// search
app.get('/search', (req, res) => {
    const query = req.query.q.toLowerCase(); // Convert query to lowercase for case-insensitive search
    const searchResults = posts.filter(post => post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query));
    res.render('search', { query, searchResults });
  });

// edit
app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    res.render('edit', { post });
  } else {
    res.redirect('/');
  }
});

app.post('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
  }
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
  }
  res.redirect('/');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
