const express = require("express");
const app = express();
const data = require("./data.json");
const fs = require("fs");
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send(data);
});

app.post("/", (req, res) => {
  const { id, name, email, age } = req.body;
  const newData = { id, name, email, age };
  data.push(newData);
  try {
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
      if (err) {
        res.status(404).json({ message: "failed" });
      }
      res.status(200).json({ message: newData });
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.put("/:id", (req, res) => {
  const { name, email, age } = req.body;
  const newData = { name, email, age };
  const id = parseInt(req.params.id)
  const selectedUser = data.find(ele => ele.id === id)
  selectedUser.name=name
  selectedUser.email = email
  selectedUser.age= age

  try {
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
      if (err) {
        res.status(404).json({ message: "failed" });
      }
      res.status(200).json({ message: newData });
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.delete("/:id", (req, res) =>{
  const id = parseInt(req.params.id)
  const exist = data.find(ele => ele.id === id)
  if(!exist){
    return res.status(404).json({ message: "User not found" });
  }
  const selectedUser = data.filter(ele => ele.id !== id)
    try {
    fs.writeFile("data.json", JSON.stringify(selectedUser, null, 2), (err) => {
      if (err) {
        res.status(404).json({ message: "failed" });
      }
      res.status(200).json({ message: selectedUser });
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.listen(3000, () => console.log("The server is running...."));
