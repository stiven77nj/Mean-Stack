import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  constructor(private AuthService:AuthService) { }

  ngOnInit(): void {
  }
  get marcador(){
    return this.AuthService.Marcador;
  }
}
