# GroupoSpeak - Social Network Application

GroupoSpeak is a social network application designed for employees of a fictional company. The application consists of two distinct parts: a **frontend** built with React and a **backend** implemented as a REST API using Node.js and Sequelize, connected to a remote MySQL database.

---

## Frontend

### Overview
The frontend is a React application that provides an intuitive and responsive user interface for interacting with the social network. Users can create posts, comment, like, and manage their profiles.

### Dependencies
The frontend relies on the following key dependencies:
- **React**: ^18.1.0
- **React Router DOM**: ^6.3.0
- **Formik**: ^2.2.9
- **Yup**: ^0.32.11
- **Axios**: ^0.27.2
- **Bootstrap**: ^5.1.3
- **Smoothscroll Polyfill**: ^0.4.4

### Accessible Pages
- **Login**: `/` - User authentication (Sign In / Sign Up).
- **Post Feed**: `/app/upstreamflow` - View all posts.
- **Edit Post**: `/app/editpost` - Create or edit a post.
- **Post Details**: `/app/:postID` - View a specific post and its comments.
- **Profile**: `/app/profile` - Manage user profile.
- **My Publications**: `/app/mypublications` - View and manage user-created posts.
- **404 Not Found**: `*` - Fallback for undefined routes.

### Installation
1. Navigate to the `front-end` directory:
   ```bash
   cd front-end
   ```
2. Install the required dependencies:
   ```bash
    npm install
    ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to `http://localhost:3000`.
5. The application will automatically open in your default web browser.
6. You can also run the application in production mode by using:
   ```bash
   npm run build
   ```
   This will create an optimized build of the application in the `build` directory.
7. To run the production build, you can use a static server like `serve`:
   ```bash
    npm install -g serve
    serve -s build
    ```
    This will serve the production build on `http://localhost:5000`.

## Backend

### Overview
The backend is a REST API built with Node.js and Sequelize, connected to a remote MySQL database. It handles user authentication, post management, and comment management.

### Dependencies
The backend relies on the following key dependencies:

- Express: ^4.18.0
- Sequelize: ^6.19.0
- MySQL2: ^2.3.3
- jsonwebtoken: ^8.5.1
- bcrypt: ^5.0.1
- dotenv: ^16.0.0
- Multer: ^1.4.4
- Password Validator: ^5.2.1

### API Routes

#### User Routes (/api/auth)
- POST ``/signup``: Create a new user account.
- POST ``/login``: Authenticate a user and return a token.
- GET ``/:email``: Retrieve the profile of the authenticated user.
- PUT ``/logout``: Log out the authenticated user.
- PUT ``/avatar/:email``: Update the user's avatar.
- PUT ``/password/:email``: Update the user's password.
- DELETE ``/user/:email``: Delete the authenticated user's account.

### Post Routes (/api/posts)
- POST ``/``: Create a new post.
- GET ``/all``: Retrieve all posts.
- GET ``/top/:limit``: Retrieve the top posts by likes.
- GET ``/last/:limit``: Retrieve the most recent posts.
- GET ``/login/:page``: Retrieve posts since the user's last login.
- GET ``/post/:postID``: Retrieve a specific post and its comments.
- PUT ``/:postID``: Update a post.
- PUT ``/like/:postID``: Like a post.
- DELETE ``/:postID``: Delete a post.

### Comment Routes (/api/comments)
- POST ``/:postID``: Add a comment to a post.
- GET ``/:userID/:page``: Retrieve all comments by a user.
- PUT ``/:commentID``: Update a comment.
- DELETE ``/:commentID``: Delete a comment.

### CRUD Responses
- Create: Returns the created resource.
- Read: Returns the requested resource(s).
- Update: Returns the updated resource.
- Delete: Returns a success message upon deletion.

### Installation
1. Navigate to the back-end directory:
    ```bash
    cd back-end
    ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Configure the .env file with your database credentials
    ```bash
    DB_HOST=your_database_hostHOST=<your-database-host>
    USER=<your-database-user>
    PASSWORD=<your-database-password>
    DATABASE=<your-database-name>
    JWT_SECRET_KEY=<your-secret-key>
    ```
4. Start the server:
   ```bash
   npm start
   ```
5. The server will run on `http://localhost:5000` by default.

## License
This project is licensed under the MIT License.