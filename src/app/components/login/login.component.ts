import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginObj: any = {
    mac: '',
  };

  clients: Client[] = [];

  constructor(private router: Router, private authService: AuthService, private clientService: ClientService,) { };
  ngOnInit(): void {
    this.getClient();
  }

  getClient() {
    this.clientService.findAll().subscribe(clients => {
      this.clients = clients
    }
    );
  }

  onLogin(mac: any) {
    if (mac === 'admin') {
      this.router.navigate(['/dashbord']);
    } else {
      const client = this.clients.find((c) => c.mac === mac);
      if (client) {
        const id = client.id;
        this.authService.isLoggedIn = true;
        this.router.navigate(['/clients', id]);
      } else {
        console.log("Le client avec la MAC spécifiée n'a pas été trouvé");
      }
    }
  }

}