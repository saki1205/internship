const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = [{ username: "user1", password: "pass123", token: "xyz" }];
let accounts = [
  { id: 1, company: "TechCorp", matchScore: 86, status: "Not Target" },
  { id: 2, company: "InnoSoft", matchScore: 72, status: "Target" }
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) return res.json({ message: "Login successful", token: user.token });
  res.status(401).json({ message: "Invalid credentials" });
});

app.get("/accounts", (req, res) => {
  res.json(accounts);
});

app.post("/accounts/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const acc = accounts.find(a => a.id == id);
  if (acc) {
    acc.status = status;
    return res.json({ message: "Status updated", account: acc });
  }
  res.status(404).json({ message: "Account not found" });
});

const PORT = 3000;
app.listen(PORT, () => console.log("✅ Backend running on http://localhost:" + PORT));
