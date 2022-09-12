import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario, Perro, MarcadorColor, AuthPerro, listarPerro } from '../interfaces/interfaces';
import { catchError, map, tap } from 'rxjs/operators'
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private baseUrl:string = environment.baseUrl;
  private _usuario!:Usuario;
  private _dog!:Perro;



  marcadorColor: any;
  get usuario (){
    return {...this._usuario}
  }


  agregarPerro(perro:Perro):Observable<Perro>{
    return this.http.post<Perro>('${this.baseUrl}/user/dogsUser ',perro)
  }
  constructor(private http: HttpClient) { }

  registro(name:string,email:string,password:string){
    const url= `${ this.baseUrl }/user/register`;
    const body={ email,password,name};
    return this.http.post<AuthResponse>(url,body)
      .pipe(
        tap( ({ok,token}) => {
          if (ok){
            localStorage.setItem('token',token!)

          }
        }),
        map(resp=> resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  registroPerro(name:string,age:number,breed:string,vaccines?:string,preferences?:string){
    const url= `${ this.baseUrl }/user/registerDog`;
    const body={ name,age,breed,vaccines,preferences};

    const headers =new HttpHeaders()
      .set('x-token',localStorage.getItem('token') || '');

    return this.http.post<AuthPerro>(url,body, {headers})
      .pipe(
        tap( resp => {
          if (resp.ok){
              this._dog={
                name:resp.name!,
                age:resp.age!,
                breed:resp.breed!,
                vaccines:resp.vaccines!,
                preferences:resp.preferences!
              }
            }
        }),
        map(resp=> resp.ok),
        catchError(err => of(err.error.msg))
      )
  }
  listarPerro():Observable<Perro[]>{
    const url= `${ this.baseUrl }/user/dogsUser`;
    const headers =new HttpHeaders()
      .set('x-token',localStorage.getItem('token') || '');
    return this.http.get<Perro[]> (url,{headers})

  }

  login(email:string,password:string){
    const url= `${ this.baseUrl }/user`;
    const body={ email,password };
    return this.http.post<AuthResponse>(url,body)
      .pipe(
        tap( resp => {
          if (resp.ok){
            localStorage.setItem('token',resp.token!)

          }
        }),
        map(resp=> resp.ok),
        catchError(err => of(err.error.msg))
      )

  }
  // :Observable<boolean>
  validarToken():Observable<boolean>{
    const url=`${this.baseUrl}/user/renew`;
    const headers =new HttpHeaders()
      .set('x-token',localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, {headers})
      .pipe(
        map(resp => {
          // localStorage.setItem('token',resp.token!);
          this._usuario={
            name:resp.name!,
            uid:resp.uid!,
            email:resp.email!
          }
          return resp.ok;
        }),
        catchError(err => of(false))
      );

  }

  logOut(){
    localStorage.clear();
  }


  get Marcador():MarcadorColor[]{
    return[...this.Marcador];
  }
  get Perro():Perro[]{
    return [...this.Perro]
  }
}
