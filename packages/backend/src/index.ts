import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from "http";
import socketIo from "socket.io";
import { v4 } from "uuid";
import logger from './utils/logger';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ roomId: v4() });
});

const server = http.createServer(app);
const io = new socketIo.Server(server, {
  cors: {
    origin: "*",
    credentials: false
  },
});

io.on('connection', socket => {
  logger.info('new connection');
  socket.on('join-room', (roomId, userId) => {
    logger.info('join-room', userId);
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId);
    });
  })
})

server.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${port}`)
});