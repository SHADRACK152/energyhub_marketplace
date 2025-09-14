const http = require('http');

const data = JSON.stringify({
  message: 'I need help finding solar panels for my home',
  userId: 'test-user',
  userRole: 'buyer',
  conversationHistory: []
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/ena-chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    try {
      const response = JSON.parse(body);
      console.log('REPLY:', response.reply);
      if (response.metadata) {
        console.log('METADATA:', response.metadata);
      }
    } catch (e) {
      console.log('BODY:', body);
    }
  });
});

req.on('error', e => console.error('ERR:', e.message));
req.write(data);
req.end();
