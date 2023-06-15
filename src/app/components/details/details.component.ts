import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/models/client';
import { Heartbeat } from 'src/app/models/heartbeat';
import { ClientService } from 'src/app/services/client.service';
import { HeartbeatService } from 'src/app/services/heartbeat.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent {
  id!: string | null;
  client: Client = {
    mac: '',
    nom: '',
    prenom: '',
    tel: '',
    adresse: '',
    mail: ''
  }
  hearbeat: Heartbeat = {
    data1: 0,
    data2: 0,
    data3: 0,
    data4: 0,
    date_prelevement: ''
  };
  hearbeats!: Heartbeat[];
  showModal: Boolean = false;
  constructor(private route: ActivatedRoute, private clientService: ClientService, private heartbeatService: HeartbeatService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log('ID:', this.id);
    });
    this.getClient(this.id)
    this.getHeartbeatsById(this.id)
  }

  async getClient(id: any) {
    try {
      this.client = await this.clientService.getById(id).toPromise() as Client;
      console.log(this.client)
    } catch (error) {
      console.error(error);
    }
  }

  persistHeartbeat() {
    this.hearbeat.mac = this.client.mac;
    this.heartbeatService.persist(this.hearbeat).subscribe();
    this.hearbeats.push(this.hearbeat);
    this.displayModal(false);
  }

  getHeartbeatsById(id: any) {
    this.heartbeatService.findAllById(id).subscribe(hearbeats => this.hearbeats = hearbeats);
    console.log(this.hearbeats)
  }

  displayModal(bool: any) {
    this.showModal = bool;
  }

}
