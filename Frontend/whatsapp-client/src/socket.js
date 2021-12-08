import socket from 'socket.io-client';
import server from './server';

export default socket(server);