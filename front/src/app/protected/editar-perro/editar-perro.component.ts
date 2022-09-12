import { Component, OnInit } from '@angular/core';
import { Perro } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-editar-perro',
  templateUrl: './editar-perro.component.html',
  styleUrls: ['./editar-perro.component.css']
})
export class EditarPerroComponent implements OnInit {
  perro:Perro[]=[]

  constructor(private authService:AuthService ) { }
  ngOnInit(): void {

  }

}
