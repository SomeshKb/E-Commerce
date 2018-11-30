import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public messages: string[] = [];
  public alert: Subject<string> = new Subject<string>();

  constructor() {
    this.alert.subscribe(value => {
      console.log(value);

      if(this.messages.length){
         this.messages.map(x=>{
           this.messages.pop();
         })  
      }


      this.messages.push(value);
      setTimeout(() => {
        this.messages.pop();
      }, 4000);
    });
  }
  addAlertToast(message: string) {
    this.alert.next(message);
  }

}