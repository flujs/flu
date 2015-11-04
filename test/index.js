const Flu = require('../lib/application');
const app = new Flu();
app.on('connection', socket => {
  console.log('new connect');
  socket.on('haha', data => {
    console.log(socket.id, 'on:haha', data);
  });
  socket.join('test');
  app.to('test').broadcast('haha', 'this is broadcast message');
});
app.listen(8000, () => {
  console.log('server listen:', 8000);
});
