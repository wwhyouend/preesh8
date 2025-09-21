const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

let images = [];

app.use(express.static('public'));

app.post('/upload', upload.single('image'), (req, res) => {
  const imgPath = `/uploads/${req.file.filename}`;
  const desc = req.body.desc;
  images.push({ url: imgPath, desc });
  res.sendStatus(200);
});

app.get('/images', (req, res) => {
  res.json(images);
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(3000, () => console.log('Galerie console lancée sur http://localhost:3000'));