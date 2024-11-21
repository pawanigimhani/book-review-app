# Book Reviews Community - Backend

The backend for the **Book Reviews Community** application. It provides APIs for user authentication and CRUD operations for book reviews.

---

## Features

- **Authentication**: 
  - User signup and login using JWT (JSON Web Token) for secure authentication.
  
- **Book Reviews**: 
  - CRUD operations for managing book reviews: Create, Read, Update, and Delete reviews.
  - Only authenticated users can create, edit, and delete reviews.
  
- **Database**: 
  - MySQL database for storing user and review data.

---

## Technologies Used

### Backend
- **NestJS**: For creating scalable and maintainable APIs.
- **Prisma**: ORM for database management and migrations.
- **MySQL**: For storing application data (users, reviews).
- **JWT (JSON Web Token)**: For authentication and authorization.

---

## Getting Started

### Prerequisites

Before setting up the backend, ensure you have the following installed:

- **Node.js** 
- **npm** 
- **MySQL Database**
- **Prisma CLI** - To manage database migrations and schema:  
  You can install it globally using npm:

  ```bash
  npm install -g prisma

# Clone the Repository

# Set up enviornment variables

DATABASE_URL="mysql://<username>:<password>@<host>:<port>/<dbname>"

## Installation

In the project directory

```bash
$ npm install
```
# Apply Database Migrations
# Generate Prisma Client

npx prisma generate
npx prisma db push


## Running the app

```bash
# development
$ npm run start:dev

