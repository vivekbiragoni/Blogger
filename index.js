import express from "express";
import bodyParser from "body-parser";
import pkg from "pg";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import session from "express-session";

dotenv.config();

const { Pool } = pkg;
const app = express();
const PORT = 3000;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


// Set up session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Middleware to serve static files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as templating engine
app.set("view engine", "ejs");

// Middleware to make the session available in templates
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// render registration form
app.get('/register', (req, res) => {
  res.render('register.ejs');
});

// encrypting users password and pushing it into users table
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      await pool.query(
          'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
          [username, email, hashedPassword]
      );
      res.redirect('/login');
  } catch (err) {
      console.error(err);
      res.send('Error ' + err);
  }
});

// render the login form
app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user in the database
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];

            // Compare the password with the hashed password
            if (await bcrypt.compare(password, user.password)) {
                // Set up the user session
                req.session.userId = user.id;
                res.redirect('/');
            } else {
                res.send('Incorrect password');
            }
        } else {
            res.send('User not found');
        }
    } catch (err) {
        console.error(err);
        res.send('Error ' + err);
    }
});
// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/');
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

function checkAuth(req, res, next) {
  if (req.session.userId) {
      next();
  } else {
      res.redirect('/login');
  }
}


async function checkOwnership(req, res, next) {
  const { id } = req.params; // Assuming the post ID is passed as a URL parameter
  const userId = req.session.userId;

  try {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    const post = result.rows[0];

    if (!post) {
      return res.status(404).send('Post not found.');
    }

    if (post.user_id !== userId) {
      return res.status(403).send('You are not authorized to perform this action.');
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}





// Routes
// home page
app.get("/", async (req, res) => {
  try {
    const userId = req.session.userId; 
    const result = await pool.query(`
      SELECT posts.id, posts.title, posts.content, posts.created_at, users.username, posts.user_id
      FROM posts
      JOIN users ON posts.user_id = users.id
      WHERE posts.visibility = TRUE OR posts.user_id = $1
      ORDER BY posts.created_at DESC
    `, [userId]);
    res.render("index.ejs", { posts: result.rows, session: req.session });
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});


// create
app.get("/create", checkAuth, (req, res) => {
  res.render("create.ejs");
});

app.post("/create", checkAuth, async (req, res) => {
  try {
    const { title, content, visibility } = req.body;
    const userId = req.session.userId; 
    await pool.query(
      "INSERT INTO posts (title, content, visibility, user_id) VALUES ($1, $2, $3, $4)",
      [title, content, visibility === 'on', userId]
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});


// view
app.get("/view/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [req.params.id,]);
    if (result.rows.length > 0) {
      res.render("view", { post: result.rows[0] });
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

// search
app.get("/search", async (req, res) => {
  try {
    const query = req.query.q.toLowerCase();
    const result = await pool.query(
      "SELECT * FROM posts WHERE LOWER(title) LIKE $1 OR LOWER(content) LIKE $2",
      [`%${query}%`, `%${query}%`]
    );
    res.render("search", { query, searchResults: result.rows });
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

// edit
app.get("/edit/:id", checkAuth, checkOwnership,  async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length > 0) {
      res.render("edit", { post: result.rows[0] });
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.post("/edit/:id", checkAuth, checkOwnership,  async (req, res) => {
  try {
    const { title, content } = req.body;
    await pool.query(
      "UPDATE posts SET title = $1, content = $2 WHERE id = $3",
      [title, content, req.params.id]
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

// delete
app.post("/delete/:id", checkAuth, checkOwnership,  async (req, res) => {
  try {
    await pool.query("DELETE FROM posts WHERE id = $1", [req.params.id]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
