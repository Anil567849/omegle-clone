import { Server, Socket } from "socket.io";
import http from 'http';
import { UserManager } from "./managers/UserManager";

// Create an HTTP server
const server = http.createServer();

// Initialize the Socket.IO server instance
const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

const userManager = new UserManager();

// Handle a new connection
io.on('connection', (socket: Socket) => {
    
    console.log('user connected');
    userManager.addUser("randomName", socket);


    socket.on("disconnect", () => {
      console.log("user disconnected");
      userManager.removeUser(socket.id);
    })

});

// Start the HTTP server
server.listen(8000, () => {
    console.log('listening on port 8000');
});