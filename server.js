const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let members = [];

// Get all members
app.get('/api/members', (req, res) => {
  res.json(members);
});

// Add a new member
app.post('/api/members', (req, res) => {
  const member = req.body;
  members.push(member);
  res.status(201).json(member);
});

// Update a member
app.put('/api/members/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (id >= 0 && id < members.length) {
    members[id] = req.body;
    res.json(members[id]);
  } else {
    res.status(404).json({ error: 'Member not found' });
  }
});

// Delete a member
app.delete('/api/members/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (id >= 0 && id < members.length) {
    members.splice(id, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Member not found' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
