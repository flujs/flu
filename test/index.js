const Flu = require('../lib/application');
const app = new Flu();
app.on('connection', socket => {
  console.log('new connect');
  socket.on('data', data => {
    console.log('on:data');
  });
  socket.join('test');
  console.log(app.rooms);
  socket.leave('test');
  console.log(app.rooms);
  app.to('test').emit('data', 'this is a room broadcast');
});
app.listen(8000, () => {
  console.log('server listen:', 8000);
});
