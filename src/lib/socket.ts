import { io } from "socket.io-client";

const SERVER_URL = "ws://35.158.220.135:3000";

const socket = io(SERVER_URL);

export default socket;
