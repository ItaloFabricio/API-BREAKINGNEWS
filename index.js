import express from 'express';
import connectDatabase from './src/database/db.js';
import userRoute from './src/routes/user.route.js';

const app = express();
const port = 3000

connectDatabase();
app.use(express.json());
app.use('/user', userRoute);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
