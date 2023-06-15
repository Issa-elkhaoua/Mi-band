import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {

  SearchText = "";
  btn: boolean = false;
  clients: Client[] = [];
  resultClients: Client[] = [];

  myClient: Client = {
    mac: '',
    nom: '',
    prenom: '',
    tel: '',
    adresse: '',
    mail: ''
  }

  editMode: boolean = false;

  currentClientId!: number;

  constructor(private clientService: ClientService, private router: Router) {
  }

  ngOnInit() {
    this.getClient();
  }

  getClient() {
    this.clientService.findAll().subscribe(clients =>{
      this.resultClients = this.clients = clients}
      );
  }

  async deleteClient(id: any) {
    try {
      await this.clientService.delete(id).subscribe();
      this.resultClients = this.resultClients.filter(client => client.id !== id);
    } catch (error) {
      console.error(error);
    }
  }

  persistClient() {
    if (!this.editMode) {

        this.clientService.persist(this.myClient).subscribe();
        this.resultClients.push(this.myClient);
        this.btn = false;
        this.resetClient();
    }

    else {
        this.clientService.update(this.currentClientId, this.myClient);
        this.btn = false;

    }
}

  resetClient() {
    this.myClient = {
      mac: '',
      nom: '',
      prenom: '',
      tel: '',
      adresse: '',
      mail: ''
    }
  }


  editClient(id: any) {
    this.currentClientId = id;
    let currentClient: Client | undefined = this.resultClients.find((c) => {
        return c.id == id
    });
    this.btn = true;

    if (currentClient != undefined) {
        this.myClient = currentClient;
    }

    this.editMode = true;

}

  detailsClient(id: any){
    this.router.navigate(['/clients', id]);
  }


  afficheForm() {
    if (this.btn) {
      this.btn = false;
    } else {
      this.btn = true;
    }
  }

  searchClient() {
    this.resultClients = this.clients.filter((client) => client.nom.includes(this.SearchText))
  }
}
