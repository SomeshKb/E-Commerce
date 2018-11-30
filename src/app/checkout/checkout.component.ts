import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Address } from '../model/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  addresses:Address[]=[];
  enableEditMode:boolean=false;
  isAddressSelected:boolean=false;

  selectedAddress:Address={
    name:"",
    houseNo:"",
    lane1:"",
    lane2:"",
    city:"",
    state:"",
    pincode:0
  }

  constructor(private auth: AuthenticationService,private userService:UserService) {
    if (auth.isLoggedIn()) {
      this.auth.isUserLoggedIn.next(true);
    }
  }
  ngOnInit() {
    this.userService.getAddress(this.auth.getUserDetails()._id).subscribe(res=>{
      console.log(res)
      this.addresses=res;
    });
  }

  Submit() {
    this.userService.postAddress(this.auth.getUserDetails()._id,this.selectedAddress).subscribe();
  }

  enableEditAddress(){
    this.enableEditMode=!this.enableEditMode;
  }
  selectAddress(address){
    this.selectedAddress=address;
    this.isAddressSelected=true;
    console.log(this.selectedAddress)
  }
}
