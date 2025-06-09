import db from "../db/db.js";
import bcrypt from "bcryptjs";

export const register = (req, res) => {
  const { username, password } = req.body;

  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const insertQuery = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(insertQuery, [username, hash], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json("User registered");
    });
  });
};

export const login = (req, res) => {
  const { username, password } = req.body;

  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data.length) return res.status(404).json("User not found");

    const isPasswordCorrect = bcrypt.compareSync(password, data[0].password);
    if (!isPasswordCorrect) return res.status(400).json("Wrong credentials");

    res.status(200).json({
      message: "Login successful",
      user: {
        id: data[0].id,
        username: data[0].username,
      },
    });
  });
};
