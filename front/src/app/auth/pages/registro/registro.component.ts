import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  miFormulario: FormGroup=this.fb.group({
    name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]]
  })
  constructor(private fb:FormBuilder,private router:Router,private authService:AuthService) { }

  registro(){

    const {name,email, password}=this.miFormulario.value;

    this.authService.registro(name,email,password)
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
