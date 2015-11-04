const Flu = require('../lib/application');
const app = new Flu();
app.on('connection', socket => {
  console.log('new connect');
  socket.on('haha', data => {
    console.log(socket.id, 'on:haha', data);
  });
  socket.on('data', data => {
    console.log(data);
  });
  socket.on('close', data => {
    console.log('close');
  });
  socket.join('test1');
  socket.join('test2');
  app.to('test').broadcast('haha', 'this is broadcast message');
  console.log(app.rooms);
});
app.listen(8000, () => {
  console.log('server listen:', 8000);
});
