const express = require('express');
const app = express();

app.use(express.json());

let users = [];
let idCount = 1;

//add new user
app.post('/users', (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newUser = {
    id: idCount++,
    name,
    email,
    age
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

//get all users
app.get('/users', (req, res) => {
  res.json(users);
});

//get user ny id
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

//update user
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, email, age } = req.body;

  if (name) 
    user.name = name;
  if (email)
     user.email = email;
  if (age)
     user.age = age;

  res.json(user);
});

//delete user
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);
  res.json({ message: "User deleted successfully" });
});

app.listen(4000, () => {
  console.log("Server is running on PORT 4000");
});
