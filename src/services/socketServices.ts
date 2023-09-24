import io from "socket.io-client";
const socket = io(process.env.REACT_APP_PUSH_SERVICE || "");

const socketServices = {
  subscribeApplicationActions(cb: any) {
    socket.on("gtkChatRelay", (data: any) => cb(null, data));
  },

  unSubscribeApplicationActions() {
    socket.removeAllListeners("gtkChatRelay");
  },

  sendOverlayActions(data: any) {
    socket.emit("gtkOverlayAction", data);
  }
};

export default socketServices;
