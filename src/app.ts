import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './database/dbConfig';
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await sequelize.sync();
    console.log('Models synced with database successfully.');
  } catch (error) {
    console.error('Unable to sync models with database:', error);
  }
});