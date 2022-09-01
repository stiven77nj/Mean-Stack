import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PlacesService } from 'src/app/auth/services';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  styles:[
    `
    *{
      /* margin:20px; */
    }
    `

  ]
})
export class DashboardComponent  {

  get usuario(){
    return this.authService.usuario;
  }
  constructor(private router:Router, private authService:AuthService,private placesService:PlacesService) { }
  logout(){
    this.router.navigateByUrl('/auth');
  }
}
