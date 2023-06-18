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

  // Ajoutez ces propriétés pour les conditions de validation
  isValidMac = true;
  isValidEmail = true;
  isValidTel = true;
  isValidNom = true;
  isValidPrenom = true;
  isValidAddress = true;

  editMode: boolean = false;

  currentClientId!: number;

  constructor(private clientService: ClientService, private router: Router) {
  }

  ngOnInit() {
    this.getClient();
  }

  getClient() {
    this.clientService.findAll().subscribe(clients => {
      this.resultClients = this.clients = clients
    }
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

    // Vérification des conditions de validation
    this.isValidMac = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(this.myClient.mac);
    this.isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.myClient.mail);
    this.isValidTel = /^\d{10}$/.test(this.myClient.tel);
    this.isValidNom = /^[A-Za-z]+$/.test(this.myClient.nom);
    this.isValidPrenom = /^[A-Za-z]+$/.test(this.myClient.prenom);
    this.isValidAddress = /^[a-zA-Z0-9\s,'-]*$/.test(this.myClient.adresse);

    if (this.isValidMac && this.isValidEmail && this.isValidTel && this.isValidNom && this.isValidPrenom && this.isValidAddress) {
      // Code de persistance du client

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

  detailsClient(id: any) {
    this.router.navigate(['/clients', id]);
  }


  afficheForm() {
    if (this.btn) {
      this.btn = false;
      this.myClient = {
        mac: '',
        nom: '',
        prenom: '',
        tel: '',
        adresse: '',
        mail: ''
      }
      this.editMode = false;
    } else {
      this.btn = true;
    }
  }

  searchClient() {
    this.resultClients = this.clients.filter((client) => client.nom.includes(this.SearchText))
  }

  cancelForm() {
    this.btn = false;
  }
}
