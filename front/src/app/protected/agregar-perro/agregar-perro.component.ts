import { Component, Input, OnInit } from '@angular/core';

import { Perro } from 'src/app/auth/interfaces/interfaces';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-perro',
  templateUrl: './agregar-perro.component.html',
  styleUrls: ['./agregar-perro.component.css']
})
export class AgregarPerroComponent{
  perro!:Perro;

  miFormularioPerro: FormGroup=this.fb.group({
    name:['',[Validators.required]],
    age:[0,[Validators.required , Validators.min(0)]],
    breed:['',[Validators.required]],
    vaccines:[''],
    preferences:['']
  })
  constructor(private fb:FormBuilder, private router:Router,private authService:AuthService) { }

  registroPerro(){

    const {name,age, breed,vaccines,preferences}=this.miFormularioPerro.value;

    this.authService.registroPerro(name,age,breed,vaccines,preferences)
      .subscribe(ok => {
        console.log(ok);
        if (ok === true ){
          this.router.navigateByUrl('/dashboard/misPerros')
        }
        else{
          Swal.fire('Error',ok,'error');
        }
      });
  }
}
