"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const UserManager_1 = require("./managers/UserManager");
// Create an HTTP server
const server = http_1.default.createServer();
// Initialize the Socket.IO server instance
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
const userManager = new UserManager_1.UserManager();
// Handle a new connection
io.on('connection', (socket) => {
    console.log('user connected');
    userManager.addUser("randomName", socket);
    socket.on("disconnect", () => {
        console.log("user disconnected");
        userManager.removeUser(socket.id);
    });
});
// Start the HTTP server
server.listen(8000, () => {
    console.log('listening on port 8000');
});
