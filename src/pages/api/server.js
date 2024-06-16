const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('Novo dado recebido');

  // Enviar dados simulados a cada segundo
  setInterval(() => {
    const potValue = Math.floor(Math.random() * 100);
    socket.emit('potData', { value: potValue, timestamp: new Date() });
  }, 1000);

  socket.on('disconnect', () => {
    console.log('dado removido');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
