import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { CarGridComponent } from './components/car-grid/car-grid.component';
import {WebSocketService} from "./services/web-socket.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    CarGridComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
