import {Injectable} from '@angular/core';
// @ts-ignore
import * as Stomp from 'stompjs';
// @ts-ignore
import * as SockJS from 'sockjs-client';
// var SockJs = require("sockjs-client");
// var Stomp = require("stompjs");

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  stompClient: any;

  constructor() {
  }

   connect() {
    let socket = new SockJS(`http://localhost:8080/ws`);
    this.stompClient = Stomp.over(socket);
    return this.stompClient;
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }
}
