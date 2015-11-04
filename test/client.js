const net = require('net');

const client = new net.Socket();
client.connect(8000, () => {
  console.log('CONNECTED');
  client.write('1223');
});
