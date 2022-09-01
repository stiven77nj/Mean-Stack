import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { PlacesService } from '../../services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  miFormulario:FormGroup=this.fb.group({
    email:['piti@gmail.com',[Validators.required,Validators.email]],
    password:['pato123',[Validators.required,Validators.minLength(6)]]
  });

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authService:AuthService ,
    private placesService:PlacesService
    ) { }

  login(){

    const {email, password}=this.miFormulario.value;

    this.authService.login(email,password)
      .subscribe(ok => {
        console.log(ok);
        if (ok === true ){
          this.router.navigateByUrl('/dashboard')
        }
        else{
          Swal.fire('Error',ok,'error');
        }
      });

  }

}
