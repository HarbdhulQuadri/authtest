class CustomRoomEvents {
    constructor(socket) {
        this.joinRoom = (room) => {
            // basic join
            socket.join(room);
        };
        this.leaveRoom = (room) => {
            // basic leave
            socket.leave(room);
        };
    }
}

module.exports = CustomRoomEvents