import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { ClientsComponent } from './components/clients/clients.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { GrapheComponent } from './components/graphe/graphe.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: 'main', component: ClientsComponent  },
  { path: 'clients/:id', component: DetailsComponent  },
  { path: '', component: LoginComponent },
  {path: 'dashbord', component: GrapheComponent},
  {path: 'about', component: AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
