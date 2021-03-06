## CINEMA APP

### Idea

This is a full-stack project of a cinema booking site created to learn and combine the stack described below.

##### Prerequisites

- [x] Have [**Git**](https://gitforwindows.org/), **[Node.js](https://nodejs.org/en/download/)** and **npm** installed (optional: [nvm](https://github.com/nvm-sh/nvm)).
- [x] Front-end and back-end opted to be created under one same repository on [**GitHub**](https://docs.github.com/en/free-pro-team@latest/github/using-git/adding-a-remote).

```cli
mkdir cinema-app
cd cinema-app
git init
git remote add origin https://github.com/user/repo.git
```

**Wireframes**

![wireframe.png](https://github.com/doveriko/cinema-app/blob/master/server/public/wireframe.png?raw=true)

Wireframes designed with [Mockflow](https://www.mockflow.com/).

### Front-end

```cli
cinema-app
mkdir client
cd client
```

- [x] [**Vue.js**](https://vuejs.org/) (v2.x) used as front-end framework.
- [x] Client side created with [**Vue CLI**](https://cli.vuejs.org/guide/installation.html).

```cli
npm install -g @vue/cli
```

- [x] Site routes created with [**Vue Router**](https://router.vuejs.org/installation.html):

```cli
npm i vue-router
```

| Path             |  Component   | Permissions |                          Behavior                           |
| ---------------- | :----------: | :---------: | :---------------------------------------------------------: |
| `/`              |    movies    |   Public    |                     Redirect to /movies                     |
| `/movies`        |    movies    |   Public    |                Display all movies available                 |
| `/movies/:id`    | movieDetails |   Public    |    Display details of selected movie with booking button    |
| `/auth`          |   userAuth   |   Public    |                      Log In or Sign Up                      |
| `/checkout`      |   checkout   |   Private   |                        Booking page                         |
| `/my-account`    |  myAccount   |   Private   | Panel to check completed bookings and edit personal details |
| `/:notFound(.*)` |   notFound   |   Public    |      Show message if user enters a path not registered      |

- [ ] Data stores for *authentication* and *orders* created with **[Vuex](https://vuex.vuejs.org/installation.html)**.

```bash
npm i vuex
```



### Back-end

#### Server

- [x] Server initialized with [Express Generator](https://www.sitepoint.com/create-new-express-js-apps-with-express-generator/):

```
npm install express-generator -g
```

This package creates a basic structure to start an **Express** server. To generate it, we need to enter the command `express` followed by the name we want to give to our server folder.

```bash
express server
```

Once the installation is completed, we need to install the dependencies included in the generated package.json and start the server: 

```bash
cd server
npm i
npm start
```

#### Database

Steps to integrate an **Azure SQL database**:

1. [Register](https://azure.microsoft.com/en-us/free/).
2. Create a [sample database](https://docs.microsoft.com/en-us/azure/azure-sql/database/single-database-create-quickstart?tabs=azure-portal).
3. Connect with [SQL Server Manager Studio](https://docs.microsoft.com/en-us/azure/azure-sql/database/connect-query-ssms).
4. Use **Sequelize** as object-relational mapper (ORM) to connect and query the database from our app. Sequelize allows to create models for each table and establish their relationships.

#### **Models**

User (with validation parameters for authentication):

```javascript
{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    }, 
    email: {
        type: DataTypes.STRING,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}
```

Movie:

```javascript
{
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING
}
```

Session:

```javascript
{
    time: DataTypes.DATE
}
```

Order:

```javascript
{
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING
}
```

Models associations:

```javascript
User.hasMany(Order);
Order.belongsTo(User);

Movie.hasMany(Session);
Session.belongsTo(Movie);

Session.hasMany(Order);
Order.belongsTo(Session);
```

Database schema adapted from Learn Programming Academy 'SQL for beginners' course on Udemy:

![img](https://lh3.googleusercontent.com/4K0yB6lA-vZ7vu5t7L7ehb4vq3wsyDt-LV7pHU7F_C8bfLLn0J_-F5D0dBuFFJ2rchaFNASNSQZLmcWxWkGKPgPa8PL1gT-z8K_40VZlNDjEKWsECC7pO4MmlHpJNl_9aviRgp3x)

#### API

| HTTP Method | URL                         | Description                                                  |
| ----------- | --------------------------- | ------------------------------------------------------------ |
| GET      | `/users`           | Route for testing purposes. A user will only have access to his profile. |
| GET      | `/users/:id`      | User private access to personal profile. |
| POST        | `/users/signup`    | User registration in sign up page. |
| POST      | `/users/login` | User log in.                         |
| PATCH     | `/users/:id`   | User profile edition. |
| DELETE   | `/users/:id` | User profile deletion.     |
| GET         | `/movies`                        | Display of all movies available                              |
| GET         | `/movies/:id`                    | Show details of one specific movie                           |
| POST        | `/movies`                        | Route for testing purposes, to seed the database with movies. |
| POST        | `/sessions`                      | Route for testing purposes, to seed the database with sessions assigned to movies. |
| GET         | `/users/:id/orders`              | Show all orders from one user. Private route.                |
| GET         | `/users/:userId/orders/:orderId` | Show one specific order from a user. Private route.          |
| POST        | `/users/:id/orders/`             | Complete an order. Private route.                            |

All routes tested in Postman.

Authentication created with **JSON Web Tokens** (**JWT**).

### Courses

- [Tim Buchalka's Learn Programming Academy](https://mantugroup.udemy.com/user/learn-programming-academy/) SQL course on Udemy.
- [Maximilian Schwarzmüller](https://www.udemy.com/course/vuejs-2-the-complete-guide/) Vue.js course on Udemy.
- [The Net Ninja](https://youtu.be/5LYrN_cAJoA) Vue.js course on YouTube.
- [AZR Media](https://youtube.com/playlist?list=PLn9Y084aviLmTy5TO6sw6Ky6NjEO5uCme) Sequelize ORM & Authentication with JWT course on YouTube.