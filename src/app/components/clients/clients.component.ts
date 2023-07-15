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

  // Variable pour la recherche des clients
  SearchText = "";

  // Variable pour gérer l'état du bouton
  btn: boolean = false;

  // Tableaux pour stocker les clients
  clients: Client[] = [];
  resultClients: Client[] = [];

  // Objet représentant un client individuel
  myClient: Client = {
    mac: '',
    nom: '',
    prenom: '',
    tel: '',
    adresse: '',
    mail: ''
  }

  // Propriétés pour les conditions de validation
  isValidMac = true; // Validation pour l'adresse MAC
  isValidEmail = true; // Validation pour l'adresse email
  isValidTel = true; // Validation pour le numéro de téléphone
  isValidNom = true; // Validation pour le nom
  isValidPrenom = true; // Validation pour le prénom
  isValidAddress = true; // Validation pour l'adresse

  // Mode d'édition des clients
  editMode: boolean = false;

  // ID du client actuel
  currentClientId!: number;

  constructor(private clientService: ClientService, private router: Router) {
  }

  ngOnInit() {
    // Appel de la méthode pour récupérer les clients au chargement de la page
    this.getClient();
  }

  // Méthode pour récupérer les clients
  getClient() {
    this.clientService.findAll().subscribe(clients => {
      this.resultClients = this.clients = clients;
    });
  }

  // Méthode asynchrone pour supprimer un client
  async deleteClient(id: any) {
    try {
      // Appel de la méthode de suppression du service client
      await this.clientService.delete(id).subscribe();
      // Filtrage du tableau de clients pour exclure le client supprimé
      this.resultClients = this.resultClients.filter(client => client.id !== id);
    } catch (error) {
      console.error(error);
    }
  }

  persistClient() {
    // Vérification des conditions de validation
    this.isValidMac = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(this.myClient.mac); // Vérifie si l'adresse MAC est valide
    this.isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.myClient.mail); // Vérifie si l'adresse email est valide
    this.isValidTel = /^\d{10}$/.test(this.myClient.tel); // Vérifie si le numéro de téléphone est valide
    this.isValidNom = /^[A-Za-z]+$/.test(this.myClient.nom); // Vérifie si le nom est valide (lettres uniquement)
    this.isValidPrenom = /^[A-Za-z]+$/.test(this.myClient.prenom); // Vérifie si le prénom est valide (lettres uniquement)
    this.isValidAddress = /^[a-zA-Z0-9\s,'-]*$/.test(this.myClient.adresse); // Vérifie si l'adresse est valide (lettres, chiffres, espaces, apostrophes, tirets)

    if (this.isValidMac && this.isValidEmail && this.isValidTel && this.isValidNom && this.isValidPrenom && this.isValidAddress) {
      // Code de persistance du client

      if (!this.editMode) {
        // Persister un nouveau client
        this.clientService.persist(this.myClient).subscribe();
        this.resultClients.push(this.myClient); // Ajouter le nouveau client au tableau des clients
        this.btn = false;
        this.resetClient(); // Réinitialiser les champs du client
      }
      else {
        // Mettre à jour le client existant
        this.clientService.update(this.currentClientId, this.myClient);
        this.btn = false;
      }
    }
  }

  resetClient() {
    // Réinitialiser les champs du client
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
    // Éditer le client avec l'ID spécifié
    this.currentClientId = id;
    let currentClient: Client | undefined = this.resultClients.find((c) => {
      return c.id == id
    });
    this.btn = true;
    if (currentClient != undefined) {
      this.myClient = currentClient; // Charger les informations du client dans le formulaire d'édition
    }

    this.editMode = true; // Activer le mode d'édition

  }

  detailsClient(id: any) {
    // Afficher les détails du client avec l'ID spécifié
    this.router.navigate(['/clients', id]);
  }


  // Méthode pour afficher le formulaire d'ajout/modification de client
  afficheForm() {
    if (this.btn) {
      // Si le bouton est déjà activé, le désactiver
      this.btn = false;
      // Réinitialiser l'objet myClient
      this.myClient = {
        mac: '',
        nom: '',
        prenom: '',
        tel: '',
        adresse: '',
        mail: ''
      }

      // Désactiver le mode d'édition
      this.editMode = false;
    } else {
      // Si le bouton n'est pas activé, l'activer
      this.btn = true;
    }
  }

// Méthode pour rechercher un client
searchClient() {
  // Filtrer les clients en fonction du nom
  this.resultClients = this.clients.filter((client) => client.nom.includes(this.SearchText))
  }
  
  // Méthode pour annuler le formulaire
  cancelForm() {
  // Désactiver le formulaire
  this.btn = false;
  }
}
