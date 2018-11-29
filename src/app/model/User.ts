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

interface Address{
  houseNo:string;
  lane1:string;
  lane2:string;
  city:string;
  state:string;
}

export interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}
