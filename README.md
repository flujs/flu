## Flu

TCP Realtime Application Framework

## Installation

```
$ npm install flu
```

Flu requires __node v4.0.0__ or higher for (partial) ES2015 support.

## Example

```javascript
const Flu = require('flu');

const app = new Flu();

app.on('connection', socket => {
  socket.on('data', data => {
    try {
      data = JSON.parse(data);
      console.log(data);
    } catch (error) {
      throw error;
    }
  });

  socket.on('close', () => {
    // 处理退出问题
    console.log('close');
  });
});

app.listen(8000, () => {
  console.log('listen on', 8000);
});
```
