import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
const app = express();
const port = 3000;
const prisma = new PrismaClient();
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});
