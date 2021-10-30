import { v4 as uuidv4 } from "uuid";
let users = [];

export const createUser = (req, res) => {
  console.log("POST ROUTE REACHED");
  //this way we can add users to the database
  const user = req.body;
  const userId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

  //add users as well as id
  const userwithId = {
    ...user,
    id: userId,
  };
  users.push(userwithId);

  res.send(`User would be the name ${user.firstname} added to the database`);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id);

  res.send(`User with the id ${id} deleted from the database`);
};

export const getUser = (req, res) => {
  console.log(users);

  res.send(users);
};

export const getUserID = (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  res.send(foundUser);
};

export const updateUser = (req, res) => {
  const { id } = req.params;

  const { firstname, lastname, age } = req.body;
  const user = users.find((user) => user.id === id);
  if (firstname) {
    user.firstname = firstname;
  }
  if (lastname) {
    user.lastname = lastname;
  }
  if (age) {
    user.age = age;
  }

  res.send(`User with the ${id} has been updated `);
};
