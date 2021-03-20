const express = require('express');
const { response, request } = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid')

// const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find(user => users.username === username);

  if (!user) {
    return response.status(400).json({ error: "User not found!" })
  }

  request.user = user;
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;
  const customerAlredyExists = users.some((user) => users.username === username);

  if (customerAlredyExists) {
    return response.status(400).json({ error: "Username alredy exists!" })
  };

  users.push({
    id: uuidv4, // precisa ser um uuid
    name: name,
    username: username,
    todos: []
  })
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;