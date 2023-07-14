import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClientsComponent } from './components/clients/clients.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './components/details/details.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts'; 
import { GrapheComponent } from './components/graphe/graphe.component';
import { AboutComponent } from './components/about/about.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClientsComponent,
    DetailsComponent,
    LoginComponent,
    GrapheComponent,
    AboutComponent,
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CanvasJSAngularChartsModule
  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
