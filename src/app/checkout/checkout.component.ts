import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Address } from '../model/User';
import { UserService } from '../services/user.service';
import { FormBuilder, Validators, Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  addresses:Address[]=[];
  enableEditMode:boolean=false;
  isAddressSelected:boolean=false;


  addressForm = this.fb.group({
    name:['',Validators.required],
    houseNo:['',Validators.required],
    lane1:['',Validators.required],
    lane2:['',Validators.required],
    city:['',Validators.required],
    state:['',Validators.required],
    pincode:[0,Validators.minLength(6)]}
    )


  selectedAddress:Address={
    name:"",
    houseNo:"",
    lane1:"",
    lane2:"",
    city:"",
    state:"",
    pincode:0
  }

  constructor(private auth: AuthenticationService,private userService:UserService,private fb: FormBuilder) {
    if (auth.isLoggedIn()) {
      this.auth.isUserLoggedIn.next(true);
    }
  }
  ngOnInit() {
    this.getAddress(); 
  }

  postAddress() {
    this.userService.postAddress(this.auth.getUserDetails()._id,this.selectedAddress).subscribe(res=>{
      this.getAddress();
      this.enableEditAddress();
    
    });
  }

  OnSubmit(form:NgForm){
    console.log(form)
    console.log(this.addressForm.value);

  }

  getAddress(){
    this.userService.getAddress(this.auth.getUserDetails()._id).subscribe(res=>{
      this.addresses=res;
    });
  }

  enableEditAddress(){
    this.enableEditMode=!this.enableEditMode;
  }
  selectAddress(address){
    this.selectedAddress=address;
    this.isAddressSelected=true;
  }
}
