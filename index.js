import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/isAlive', (req, res) => {
  res.send('IM ALIVE')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
