import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent{
    @Input() imageName ='';
    @Input() votesNumber = 0;
    @Input() progressBarWidth = 0;


}
