import { Input } from "@angular/core";
export interface AuthResponse{
  ok:boolean;
  uid?:string;
  name?:string;
  token?:string;
  msg?:string
}
export interface Usuario{
  uid:String;
  name:string
}

export interface Perro {
  nombre:string,
  edad:number,
  raza:string,
  vacunas?:string,
  preferencias?:string,
}
export interface MarcadorColor{
  color:string;
  marker?:mapboxgl.Marker;
  centro?: [number,number]
}
