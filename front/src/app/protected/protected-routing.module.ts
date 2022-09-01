import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarPerroComponent } from './agregar-perro/agregar-perro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditarPerroComponent } from './editar-perro/editar-perro.component';
import { HistorialComponent } from './historial/historial.component';
import { MisPerrosComponent } from './mis-perros/mis-perros.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { SoporteComponent } from './soporte/soporte.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,
  children:[]
  },
  {path:'misPerros',component:MisPerrosComponent},
  {path:'agregarPerro',component:AgregarPerroComponent},
  {path:'editarPerro',component:EditarPerroComponent},
  {path:'historial',component:HistorialComponent},
  {path:'soporte',component:SoporteComponent},
  {path:'seguimiento',component:SeguimientoComponent},
  {path:'solicitud',component:SolicitudComponent},
  {path:'**',redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
