const http = require('http');//importing http module to create a server
const app = require('./app');
const port = process.env.PORT || 3000;//this is used to get the port number from environment variables or use 3000 if not defined


const server = http.createServer(app);//creating the server

server.listen(port,() => {
        console.log(`Server is running on port ${port}`);
});//server is listening on port 3000