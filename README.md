## CINEMA APP

### Idea

This is a full-stack project of a cinema booking site created to learn and combine the stack described below.

##### Prerequisites

- [x] Have [**Git**](https://gitforwindows.org/), **[Node.js](https://nodejs.org/en/download/)** and **npm** installed (optional: [nvm](https://github.com/nvm-sh/nvm)).
- [x] Front-end and back-end decided to be created under one same repository on [**GitHub**](https://docs.github.com/en/free-pro-team@latest/github/using-git/adding-a-remote).

```cli
mkdir cinema-app
cd cinema-app
git init
git remote add origin https://github.com/user/repo.git
```

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
        validate: {
            notNull: {
                msg: "El campo no puede ser nulo"
            },
            isAlpha: {
                args: true,
                msg: "El nombre solo puede contener letras"
            },
            len: {
                args: [3, 255],
                msg: "El nombre tiene que ser entre 3 y 255 caracteres"
            }
        },
    }, 
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: {
                args: true,
                msg: "El campo tiene que ser un correo valido"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 255],
                msg: "La contraseña tiene que tener al menos 6 caracteres"
            }
        }
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

###### **Models relationship**:

```javascript
User.hasMany(Order);
Order.belongsTo(User);

Movie.hasMany(Session);
Session.belongsTo(Movie);

Session.hasMany(Order);
Order.belongsTo(Session);
```



![img](https://lh4.googleusercontent.com/qj70AJEOhbcogLJoL66w49V_xnzKQqv3xIKvkN5NNymNeiTlnq35UO3NM_l96dWLvcW5zboAfow4HUmrkE8J-XrJ7VJns2HzcEI7Ps0RA3J5NdcLxqnRJtJ3PC5VpOn_b9MnXcwm)

#### API

ok


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | :--------------------------: | -------------- | ------------ | ------------------------------------------------------------ |
|             |                |                                            |                |              |                                                              |
| POST        | `/auth/signup`                | {name, surname, username, email, password} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                | {username, password}         | 200            | 401        | Checks if fields not empty (422), if user exists (404), and if password matches (401), then stores user in session |
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs out the user. Destroys the session.                    |
| GET         | `/lists`          |                              | 200 | 400          | Show all lists                                     |
| GET         | `/lists/:id`        | {id}                         |                |              | Show specific list by id                           |
| POST        | `/lists` | {name, tasks, status, private} | 201            | 400          | Create and save a new list                          |
| PUT         | `/lists/:id`   | {name, status, private, contributors} | 200            | 400          | edit list by id                                    |
| DELETE      | `/lists/:id` | {id}                         | 201            | 400          | delete list by id                                   |



## Links

#### [Trello](https://trello.com/b/CZkVbfro/to-do-mix) 

[Client repository Link](https://)

[Server repository Link](https://)

[Deployed App Link](http://)

#### [Slides](https://docs.google.com/presentation/d/15JxsPhwzZCTvGTaRzZ6YfQ6UZbrzIejMkqFbhfK6vQk/edit?usp=sharing)




