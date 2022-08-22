import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { catchError, map, tap } from 'rxjs/operators'
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private baseUrl:string = environment.baseUrl;
  private _usuario!:Usuario;
  get usuario (){
    return {...this._usuario}
  }

  constructor(private http: HttpClient) { }
  registro(name:string,email:string,password:string){
    const url= `${ this.baseUrl }/user/register`;
    const body={ email,password,name};
    return this.http.post<AuthResponse>(url,body)
      .pipe(
        tap( resp => {
          if (resp.ok){
            localStorage.setItem('token',resp.token!)
            this._usuario={
              name:resp.name!,
              uid:resp.uid!
            }
          }
        }),
        map(resp=> resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  login(email:string,password:string){
    const url= `${ this.baseUrl }/user`;
    const body={ email,password };
    return this.http.post<AuthResponse>(url,body)
      .pipe(
        tap( resp => {
          if (resp.ok){
            localStorage.setItem('token',resp.token!)
            this._usuario={
              name:resp.name!,
              uid:resp.uid!
            }
          }
        }),
        map(resp=> resp.ok),
        catchError(err => of(err.error.msg))
      )

  }
  // :Observable<boolean>
  validarToken(){
    const url=`${this.baseUrl}/user/renew`;
    const headers =new HttpHeaders()
      .set('x-token',localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, {headers})
      // .pipe(
      //   map(resp => {
      //     return resp.ok;
      //   }),
      //   catchError(err => of(false))
      // );

  }
}
