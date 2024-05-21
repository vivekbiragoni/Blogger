import express from "express";
import bodyParser from "body-parser";
import pkg from "pg";
import dotenv from "dotenv";

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

// Set EJS as templating engine
app.set("view engine", "ejs");

// Middleware to serve static files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// const posts = [];

let posts = [
  {
    id: 1,
    title: "First Post",
    content: "This is the content of the first post.",
  },
  {
    id: 2,
    title: "Second Post",
    content: "This is the content of the second post.",
  },
];

// Routes
// home page
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY id ASC");
    res.render("index.ejs", { posts: result.rows });
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

// create
app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/create", async (req, res) => {
  try {
    const { title, content } = req.body;
    await pool.query("INSERT INTO posts (title, content) VALUES ($1, $2)", [
      title,
      content,
    ]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

// view
app.get("/view/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [
      req.params.id,
    ]);
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
app.get('/search', async (req, res) => {
  try {
    const query = req.query.q.toLowerCase();
    const result = await pool.query('SELECT * FROM posts WHERE LOWER(title) LIKE $1 OR LOWER(content) LIKE $2', [`%${query}%`, `%${query}%`]);
    res.render('search', { query, searchResults: result.rows });
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});


// edit
app.get('/edit/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [req.params.id]);
    if (result.rows.length > 0) {
      res.render('edit', { post: result.rows[0] });
    } else {
      res.redirect('/');
    }
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.post('/edit/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    await pool.query('UPDATE posts SET title = $1, content = $2 WHERE id = $3', [title, content, req.params.id]);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

// delete
app.post('/delete/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM posts WHERE id = $1', [req.params.id]);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
