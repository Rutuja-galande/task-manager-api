# Task Manager REST API

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![API-RESTful](https://img.shields.io/badge/API-RESTful-007FFF?style=for-the-badge)](https://en.wikipedia.org/wiki/Representational_State_Transfer)

## Overview

The Task Manager REST API is a robust backend service built with Node.js and Express, designed to efficiently manage tasks. This project demonstrates a strong understanding of RESTful principles, data validation, and comprehensive testing, making it an ideal showcase of core backend development skills for a professional portfolio. It provides full CRUD functionality with advanced features like filtering and a modular architecture.

## Features

*   **Full CRUD Operations**: Create, Read, Update, and Delete tasks.
*   **Robust Data Validation**: Ensures data integrity for all task inputs.
*   **Task Filtering**: Filter tasks by completion status (e.g., `completed=true`).
*   **Comprehensive Testing**: Unit and integration tests using a testing framework to ensure reliability.
*   **Modular Architecture**: Organized routes and logic using Express Router for maintainability.
*   **In-Memory Data Store**: Simple, transient data storage for development focus.

## Tech Stack

| Technology   | Description                                                     |
| :----------- | :-------------------------------------------------------------- |
| **Node.js**  | JavaScript runtime environment for server-side execution.       |
| **Express.js** | Fast, unopinionated, minimalist web framework for Node.js.      |
| **JavaScript** | Primary programming language used throughout the project.       |
| **REST APIs**| Architectural style for designing networked applications.       |

## Installation

To get the Task Manager API up and running on your local machine, follow these steps:

1.  **Prerequisites**: Ensure you have Node.js (v14 or higher recommended) installed.
2.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/task-manager-api.git
    ```
3.  **Navigate into the project directory**:
    ```bash
    cd task-manager-api
    ```
4.  **Install dependencies**:
    ```bash
    npm install
    ```
5.  **Start the development server**:
    ```bash
    npm run dev
    # The API will be accessible at http://localhost:3000
    ```
    *(Note: The `npm run dev` command typically uses `nodemon` for automatic server restarts on file changes. If `npm run dev` is not configured, use `node src/server.js`)*
6.  **Run tests**:
    ```bash
    npm test
    ```

## Usage

Once the server is running, you can interact with the API using tools like cURL, Postman, or your preferred HTTP client. The API is hosted at `http://localhost:3000`.

**Base URL**: `http://localhost:3000`

### Endpoints

*   **Create a new task (POST /tasks)**
    ```bash
    curl -X POST \
      http://localhost:3000/tasks \
      -H "Content-Type: application/json" \
      -d '{"description": "Learn advanced Express features", "completed": false}'
    ```

*   **Get all tasks (GET /tasks)**
    ```bash
    curl http://localhost:3000/tasks
    ```

*   **Get all completed tasks (GET /tasks?completed=true)**
    ```bash
    curl http://localhost:3000/tasks?completed=true
    ```

*   **Get a specific task by ID (GET /tasks/:id)**
    ```bash
    # Replace <TASK_ID> with an actual task ID from your database
    curl http://localhost:3000/tasks/<TASK_ID>
    ```

*   **Update a task by ID (PATCH /tasks/:id)**
    ```bash
    # Replace <TASK_ID> with an actual task ID
    curl -X PATCH \
      http://localhost:3000/tasks/<TASK_ID> \
      -H "Content-Type: application/json" \
      -d '{"completed": true}'
    ```

*   **Delete a task by ID (DELETE /tasks/:id)**
    ```bash
    # Replace <TASK_ID> with an actual task ID
    curl -X DELETE http://localhost:3000/tasks/<TASK_ID>
    ```

## Project Structure

.
├── src/
│   ├── app.js             # Main Express application setup and middleware
│   ├── routes/
│   │   └── tasks.js       # Defines API routes for task resources
│   ├── store.js           # In-memory data store for tasks
│   └── server.js          # Entry point for starting the Express server
├── test/
│   └── tasks.test.js      # Unit and integration tests for task routes and logic
├── package.json           # Project dependencies and scripts
└── README.md              # This project documentation

## Interview Q&A

Here are some realistic questions a recruiter might ask about this project, along with strong answers demonstrating your understanding:

1.  **Q: This project uses an in-memory store (`src/store.js`). What are the implications of this, and how would you transition this API to use a persistent database like MongoDB or PostgreSQL?**
    *   **A:** Using an in-memory store simplifies the project setup, allowing me to focus on the core API logic and RESTful principles without complex database configurations. The main implication is that all data is lost whenever the server restarts, making it unsuitable for production environments. To transition to a persistent database, I would first choose an appropriate ORM/ODM (e.g., Mongoose for MongoDB, Sequelize for PostgreSQL). I'd then refactor `src/store.js` to instead establish a database connection, define schemas/models for tasks, and replace the direct array operations with database queries (e.g., `Task.find()`, `Task.create()`, `Task.findByIdAndUpdate()`). This would also involve adding database connection logic to `src/server.js` or `src/app.js` and managing database credentials securely using environment variables.

2.  **Q: You've implemented filtering (`/tasks?completed=true`). How would you extend this to support more complex queries, such as filtering by task description keywords or sorting results?**
    *   **A:** To support more complex queries, I would expand the query parsing logic within the `GET /tasks` route handler. For filtering by description keywords, I'd introduce a `description` query parameter and use a string matching method (like a regular expression in a database query or `String.includes()` for in-memory data). For sorting, I would add `sortBy` and `order` (e.g., `asc` or `desc`) query parameters. The handler would then construct a dynamic query object or sort function based on these parameters, applying them before returning the results. Robust error handling would also be implemented to validate query parameters and prevent unsupported sorting fields. This approach ensures flexibility while maintaining API clarity and performance.

3.  **Q: The project includes `test/tasks.test.js`. Can you describe your testing methodology and why comprehensive testing is important for a REST API?**
    *   **A:** `test/tasks.test.js` demonstrates both unit and integration testing. Unit tests focus on verifying individual functions or middleware in isolation (e.g., input validation logic). Integration tests, on the other hand, ensure that different components of the API—such as routes, controllers, and the data store—work correctly together, simulating actual HTTP requests to endpoints. Comprehensive testing is paramount for a REST API because it guarantees the API behaves as expected under various conditions, catches bugs early in the development cycle, and prevents regressions when new features are added or existing ones are refactored. It provides confidence in the API's reliability, helps maintain a high-quality codebase, and effectively serves as living documentation for how the API should function.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
