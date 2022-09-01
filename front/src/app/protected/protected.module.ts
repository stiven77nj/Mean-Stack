import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MapasComponent } from './mapas/mapas.component';
import { MisPerrosComponent } from './mis-perros/mis-perros.component';
import { AgregarPerroComponent } from './agregar-perro/agregar-perro.component';
import { RouterModule } from '@angular/router';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { SoporteComponent } from './soporte/soporte.component';
import { HistorialComponent } from './historial/historial.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { EditarPerroComponent } from './editar-perro/editar-perro.component';
import { MapaMarcadorComponent } from './mapa-marcador/mapa-marcador.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MenuComponent,
    SidebarComponent,
    MapasComponent,
    MisPerrosComponent,
    AgregarPerroComponent,
    SeguimientoComponent,
    SoporteComponent,
    HistorialComponent,
    SolicitudComponent,
    EditarPerroComponent,
    MapaMarcadorComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    MenuComponent,
    DashboardComponent,
    SidebarComponent,
    MapasComponent,
    MisPerrosComponent,
    MapasComponent,
    MapaMarcadorComponent

  ]
})
export class ProtectedModule { }
