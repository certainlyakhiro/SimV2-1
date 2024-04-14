import express from 'express';
import fs from 'fs-extra';
import path from 'path';
const sim = fs.readJSONSync('./simi.json');
const cwd = process.cwd();
const app = express();

app.use(express.static(path.join(cwd, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(
    cwd, 'public', 'index.html'
  ));
});

app.get('/chat', (req, res) => {
  res.sendFile(path.join(
    cwd, 'public', 'chat.html'
  ));
});

app.get('/api/sim', (req, res) => {
  const {
    content
  } = req.query;

  if (!content) {
    res.send({
      status: false,
      message: 'No content provided'
    });
  } else {
    const response = sim.responses[
      content.toLowerCase()
    ];
    if (Array.isArray(response) && response.length > 0) {
      const random = Math.floor(
        Math.random() * response.length
      );

      res.send({
        status: true,
        message: response[random]
      });
    } else {
      res.send({
        status: true,
        message: response || 'Im sorry, but i dont know how to respond.'
      });
    }
  };
});

app.listen(3000);