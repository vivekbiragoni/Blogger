

# Blogger Website ✍️

This project is a simple website builder for bloggers, built using Express.js, Node.js, and EJS.

## Description 📜

A blogging platform that allows users to create, edit, delete, and search for blog posts. It features a minimalistic design and includes user authentication.

## Features 🌟

- Create, edit, and delete blog posts
- Search functionality to find posts based on keywords
- User authentication
- Dark mode toggle
- Minimalistic design for a distraction-free writing experience
- PostgreSQL database integration for data persistence

## Getting Started 🛠️

To set up and run this project on your local machine, follow these steps:

1. **Clone the Repository**: Use `git clone` to clone this repository to your local machine.
    ```bash
    git clone https://github.com/vivekbiragoni/Blogger.git
    ```

2. **Install Dependencies**: Run `npm install` to install the necessary dependencies for the project.
    ```bash
    npm install
    ```

3. **Database Setup**: Set up a PostgreSQL database. If you haven't already, create a database named `myblogdb` (or choose a different name if you prefer).

4. **Environment Variables**: Create a `.env` file in the project's root directory and add the following variables. Make sure to replace `your_postgresql_password` with your actual PostgreSQL password, and `myblogdb` with your database name if it differs.

    ```plaintext
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=your_postgresql_password
    DB_NAME=myblogdb
    ```

5. **Database Initialization**: Initialize the database schema by executing the following SQL scripts:

    - **Create the `users` table**:
      ```sql
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      ```

    - **Create the `posts` table**:
      ```sql
      CREATE TABLE IF NOT EXISTS posts (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          content TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          user_id INTEGER,
          visibility BOOLEAN DEFAULT false,
          CONSTRAINT fk_user
            FOREIGN KEY(user_id) 
            REFERENCES users(id)
            ON DELETE CASCADE
      );
      ```

6. **Start the Server**: Launch the server by running `npm start`.
    ```bash
    npm start
    ```

7. **Access the Website**: Open your web browser and navigate to `http://localhost:3000` to access the website.

## Usage 🚀

- Create a new post by clicking on the "+ New Post" button.
- Edit or delete existing posts using the corresponding buttons.
- Use the search bar to find posts containing specific keywords.
- Toggle dark mode using the dark mode button.

## Technologies Used 💻

- Express.js
- Node.js
- EJS (Embedded JavaScript)
- Bootstrap
- Font Awesome
- PostgreSQL

## Contributing 🤝

Contributions are welcome! Feel free to fork this repository and submit pull requests.

## License 📄

This project is licensed under the [MIT License](https://github.com/vivekbiragoni/blogger/blob/main/LICENSE).

## Author 🧑‍💻

- Vivek Biragoni

