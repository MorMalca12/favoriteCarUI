import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebSocketService} from "../../services/web-socket.service";
import {HttpService} from "../../services/http.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-car-grid',
  templateUrl: './car-grid.component.html',
  styleUrls: ['./car-grid.component.css']
})

export class CarGridComponent implements OnInit, OnDestroy {

  topic: String = '/topic/carUpdate';

  maxVotes = 0;

  cars: any;

  maxProgressBarWidth = 200;

  stompClient: any;

  private httpSubscription: Subscription | undefined;

  private webSocketSubscription: Subscription | undefined;

  constructor(private webSocketService: WebSocketService, private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.httpSubscription = this.httpService.getCars().subscribe((carList: any) => {
        this.initCars(carList);
      }
    );

    this.connectAndSubscribeSocket();
  }

  private connectAndSubscribeSocket() {
    // Open connection with server socket
    this.stompClient = this.webSocketService.connect();
    this.stompClient.connect({}, (frame: any) => {
      this.webSocketSubscription = this.stompClient.subscribe(this.topic, (updateEvent: any) => {
        this.onCarUpdate(updateEvent)
      })
    }, (error: any) => {
      this.onError(error)
    });
  }

  private onCarUpdate(updateEvent: any) {
    let car = JSON.parse(updateEvent.body);

    if (car.votesNumber > this.maxVotes) {
      this.maxVotes = car.votesNumber;
    }
    let index = this.cars.findIndex((carItem: any) => car.id === carItem.id);
    this.cars[index] = car;
  }

  private initCars(carList: any) {
    this.cars = carList.reverse();
    this.maxVotes = Math.max(...this.cars.map((item: any) => item.votesNumber));
  }

  vote(car: any) {
    car.votesNumber++;
    this.stompClient.send("/app/cars/vote", {}, JSON.stringify(car));

    if (car.votesNumber > this.maxVotes) {
      this.maxVotes = car.votesNumber;
    }
  }

  getProgressBarWidth(votesNumber: number) {
    if (votesNumber == this.maxVotes)
      return this.maxProgressBarWidth;
    else
      return this.maxProgressBarWidth * (votesNumber / this.maxVotes);
  }

  ngOnDestroy(): void {
    if(this.webSocketSubscription)
      this.webSocketSubscription.unsubscribe();

    if(this.httpSubscription)
      this.httpSubscription.unsubscribe();

    this.webSocketService.disconnect();
  }
  private onError(error: any) {
    console.log(error);
  }
}
