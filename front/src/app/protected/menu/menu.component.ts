import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  {

  constructor(private authService:AuthService,private router:Router) { }

  get usuario(){
    return this.authService.usuario;
  }
  logout(){
    this.router.navigateByUrl('/auth');
  }

}
