import app from "./app.js";
import { v2 as cloudinary } from "cloudinary";
import http from "http";
import { Server } from "socket.io";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinAuction", (auctionId) => {
    socket.join(auctionId);
    console.log(`Client joined auction: ${auctionId}`);
  });

  socket.on("leaveAuction", (auctionId) => {
    socket.leave(auctionId);
    console.log(`Client left auction: ${auctionId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server Listening on port http://localhost:${PORT}`);
});
