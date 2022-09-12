import { Input } from "@angular/core";
export interface AuthResponse{
  ok:boolean;
  uid?:string;
  name?:string;
  email?:string;
  token?:string;
  msg?:string
}
export interface AuthPerro{
  ok:boolean;
  token?:string;
  name?:string;
  age?:number;
  breed?:string;
  vaccines?:string;
  preferences?:string
}
export interface listarPerro{
  newDogs:[]
}
export interface Usuario{
  uid:String;
  name:string;
  email:string;
}

export interface Perro {
  name:string,
  age:number,
  breed:string,
  vaccines?:string,
  preferences?:string,
}
export interface MarcadorColor{
  color:string;
  marker?:mapboxgl.Marker;
  centro?: [number,number]
}
