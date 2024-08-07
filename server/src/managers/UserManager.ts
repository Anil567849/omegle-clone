import { Socket } from "socket.io";
import { RoomManager } from "./RoomManager";

export interface User {
    socket: Socket;
    name: string;
}

export class UserManager {
    private users: User[]; // store all the users
    private queue: string[]; // we will pick 2 users from queue and create room for them and remove users from queue
    private roomManager: RoomManager;
    
    constructor() {
        this.users = [];
        this.queue = [];
        this.roomManager = new RoomManager();
    }

    addUser(name: string, socket: Socket) {
        this.users.push({
            name, socket
        })
        this.queue.push(socket.id);
        this.createRoom()
        this.initHandlers(socket);
        socket.emit("lobby");
    }

    removeUser(socketId: string) {
        // const user = this.users.find(x => x.socket.id === socketId);        
        this.users = this.users.filter(x => x.socket.id !== socketId);
        this.queue = this.queue.filter(x => x === socketId);
    }

    createRoom() {
        if (this.queue.length < 2) {
            console.log("return from queue");
            return;
        }

        const id1 = this.queue.pop();
        const id2 = this.queue.pop();
        const user1 = this.users.find(x => x.socket.id === id1);
        const user2 = this.users.find(x => x.socket.id === id2);

        if (!user1 || !user2) {
            return;
        }

        console.log("creating room");

        this.roomManager.createRoom(user1, user2);
        this.createRoom(); // Keep doing it until queue becomes < 2
    }

    initHandlers(socket: Socket) {
        // SDP = The Session Description Protocol (SDP) is a text-based format that describes the multimedia sessions in WebRTC.
        socket.on("offer", ({sdp, roomId}: {sdp: string, roomId: string}) => {
            this.roomManager.onOffer(roomId, sdp, socket.id);
        })

        socket.on("answer",({sdp, roomId}: {sdp: string, roomId: string}) => {
            this.roomManager.onAnswer(roomId, sdp, socket.id);
        })

        socket.on("add-ice-candidate", ({candidate, roomId, type}) => {
            this.roomManager.onIceCandidates(roomId, socket.id, candidate, type);
        });
    }

}