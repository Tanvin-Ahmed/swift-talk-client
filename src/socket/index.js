import io from "socket.io-client";
import { BASE_URL } from "../config";

export let socket;

export const connectSocket = (userId) => {
  socket = io(BASE_URL, {
    query: `userId=${userId}`,
  });
};
