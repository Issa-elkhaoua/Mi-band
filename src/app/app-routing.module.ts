import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { ClientsComponent } from './components/clients/clients.component';

const routes: Routes = [
  { path: '', component: ClientsComponent },
  { path: 'clients/:id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
