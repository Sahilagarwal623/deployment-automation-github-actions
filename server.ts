import express from 'express';

const app = express();

const PORT = process.env.PORT;


app.get('/', (req, res) => {
  // 2. Send the response to the browser
  res.send('Hello World i am sahil agarwal');
});

app.listen(PORT, () => {

    console.log(`server running on port ${PORT}`);
})