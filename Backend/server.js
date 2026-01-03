import express from "express"
import http from "http"

import {server} from "socket.io"

const app = express();
const server= http.createServer(app)
