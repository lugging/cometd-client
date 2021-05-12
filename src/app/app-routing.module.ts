import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CometdComponent } from './pages/cometd/cometd.component';

const routes: Routes = [
  { path: 'cometd', component: CometdComponent },
  { path: '', redirectTo: '/cometd', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
