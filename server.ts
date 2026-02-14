import express from 'express';
import { connectDB } from './db'

const app = express();

const PORT = process.env.PORT;

let dbConnected = false;

connectDB().then(() => {
  dbConnected = true;
}).catch(() => {
  dbConnected = false;
});


app.get('/', (req, res) => {
  const dbStatus = dbConnected ? 'MongoDB is connected ✅' : 'MongoDB is NOT connected ❌';
  res.send(`welcome everbody how's everybody, what is going on | ${dbStatus}`);
});

app.listen(PORT, () => {

  console.log(`server running on port ${PORT}`);
})