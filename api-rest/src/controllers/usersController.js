const { v4: uuidv4 } = require('uuid');

const users = require('../data/users.js');

// Obtener todos los usuarios
const getUsers = (req, res) => {
  res.json(users);
};

// Obtener un usuario por ID
const getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: `El usuario con ID ${id} no existe.` });
  }
};

//Obtener un usuario por username
const getUserByUsername = (req, res) => {
  const { username } = req.body;
  const user = users.find((user) => user.username === username);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: `El usuario con username ${username} no existe.` });
  }
};

// Crear un nuevo usuario
const createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).json({ message: 'El nombre y el email son obligatorios.' });
    return;
  }

  const newUser = { id: uuidv4(), name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};

// Actualizar un usuario existente
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const user = users.find((user) => user.id === id);

  if (!user) {
    res.status(404).json({ message: `El usuario con ID ${id} no existe.` });
    return;
  }

  user.name = name || user.name;
  user.email = email || user.email;

  res.json(user);
};

// Eliminar un usuario existente
const deleteUser = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    res.status(404).json({ message: `El usuario con ID ${id} no existe.` });
    return;
  }

  users.splice(index, 1);

  res.json({ message: `El usuario con ID ${id} ha sido eliminado correctamente.` });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByUsername
};