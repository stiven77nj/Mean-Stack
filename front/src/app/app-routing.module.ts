import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guard/validar-token.guard';
import { DashboardComponent } from './protected/dashboard/dashboard.component';
import { HistorialComponent } from './protected/historial/historial.component';
import { MisPerrosComponent } from './protected/mis-perros/mis-perros.component';
import { SeguimientoComponent } from './protected/seguimiento/seguimiento.component';
import { SolicitudComponent } from './protected/solicitud/solicitud.component';
import { SoporteComponent } from './protected/soporte/soporte.component';

const routes: Routes = [

  {
    path:'auth',
    loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule),

  },
  {
    path:'dashboard',
    loadChildren:() => import('./protected/protected.module').then(m => m.ProtectedModule),
    canActivate:[ValidarTokenGuard],
    canLoad:[ValidarTokenGuard]
  },
  {
    path:'**',
    redirectTo:'auth'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
