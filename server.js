const http = require('http');
const url = require('url');
const server = http.createServer();


server.listen(3001, () => {
  console.log('The HTTP Server is listening on port 3001')
});

// server.on('request', (request, response) => {
//   response.writeHead(200, { 'Content-type': 'text/plain' });
//   response.write('Hello World\n');
//   response.end();
// });

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  }
  else if (request.method === 'POST') {
    let newMessage = { 'id': new Date() };

    request.on('data', (data) => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});

let messages = [
  { 'id': 1, 'user': 'brittany storoz', 'message': 'hi there!' },
  { 'id': 2, 'user': 'bob loblaw', 'message': 'check out my law blog' },
  { 'id': 3, 'user': 'lorem ipsum', 'message': 'dolor set amet' }
];

const getAllMessages = (response) => {
  response.writeHead(200, {'Content-type': 'application/json' });
  response.write(JSON.stringify(messages));
  response.end();
  return response;
};

const addMessage = (newMessage, response) => {
  response.writeHead(201, {'Conetent-type': 'application/json'});
  response.write(JSON.stringify(newMessage));
  response.end();
  return response;
};
