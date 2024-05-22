# Blogger Website 

This project is a simple website builder for bloggers, built using Express.js, Node.js, and EJS.

## Features

- Create, edit, and delete blog posts
- Search functionality to find posts based on keywords
- Minimalistic design for a distraction-free writing experience
- PostgreSQL database integration for data persistence

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine.
2. Install the necessary dependencies by running `npm install`.
3. Set up your PostgreSQL database and create a database named `myblogdb`.
4. Create a `.env` file in the root directory of the project and add the following contents:
    ```plaintext
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=yourpassword
    DB_NAME=myblogdb
    ```
5. Initialize the database schema by creating the necessary tables:
    ```sql
    CREATE TABLE posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        content TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );
    ```
6. Start the server using `npm start`.
7. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Create a new post by clicking on the "+ New Post" button.
- Edit or delete existing posts using the corresponding buttons.
- Use the search bar to find posts containing specific keywords.

## Technologies Used

- Express.js
- Node.js
- EJS (Embedded JavaScript)
- Bootstrap
- Font Awesome
- PostgreSQL

## Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests.

## License

This project is licensed under the [MIT License](https://github.com/vivekbiragoni/blogger/blob/main/LICENSE).

## Author

- Vivek Biragoni
