# Blogger Website 💻

This project is a simple website builder for bloggers, leveraging Express.js, Node.js, and EJS for development.

## Features 🚀

- **Create, Edit, and Delete Posts:** Users can create new blog posts, edit existing ones, and delete posts they no longer need.
- **Search Functionality:** The website offers a search feature that allows users to find posts based on keywords.
- **Minimalistic Design:** The design focuses on providing a distraction-free writing experience for bloggers.
- **Database Integration:** Utilizes PostgreSQL for data persistence, ensuring that posts are stored securely.

## Getting Started 🛠️

To set up and run this project on your local machine, follow these steps:

1. **Clone the Repository:** Use `git clone` to clone this repository to your local machine.
2. **Install Dependencies:** Run `npm install` to install the necessary dependencies for the project.
3. **Database Setup:** Set up a PostgreSQL database and create a database named `myblogdb`.
4. **Environment Variables:** Create a `.env` file in the project's root directory and add the following variables:
    ```plaintext
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=yourpassword
    DB_NAME=myblogdb
    ```
5. **Database Initialization:** Initialize the database schema by executing the SQL script provided in the repository.
6. **Start the Server:** Launch the server by running `npm start`.
7. **Access the Website:** Open your web browser and navigate to `http://localhost:3000` to access the website.

## Usage 📝

- **Creating Posts:** Click on the "+ New Post" button to create a new blog post.
- **Editing and Deleting Posts:** Utilize the corresponding buttons to edit or delete existing posts.
- **Searching Posts:** Use the search bar to find posts containing specific keywords.

## Technologies Used 🛠️

- **Express.js:** Web application framework for Node.js.
- **Node.js:** JavaScript runtime environment.
- **EJS (Embedded JavaScript):** Templating engine for generating HTML markup with JavaScript.
- **Bootstrap:** Front-end framework for building responsive and mobile-first websites.
- **Font Awesome:** Icon toolkit for adding scalable vector icons to web projects.
- **PostgreSQL:** Open-source relational database management system.

## Contributing 🤝

Contributions to this project are welcome! Feel free to fork the repository, make improvements, and submit pull requests.

## License 📄

This project is licensed under the [MIT License](https://github.com/vivekbiragoni/blogger/blob/main/LICENSE).

## Author ✍️

- **Vivek Biragoni**

