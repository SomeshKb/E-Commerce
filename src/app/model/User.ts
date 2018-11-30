export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

export interface UserProfile{
  _id:string;
  email:string;
  name:string;
  pastOrder:Array<string>;
  address:Array<Address>;
}

export interface Address{
  name:string;
  houseNo:string;
  lane1:string;
  lane2:string;
  city:string;
  state:string;
  pincode:number;
}

export interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}
