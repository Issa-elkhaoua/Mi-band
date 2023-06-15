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

  heartbeat: Heartbeat = {
    data1: 0,
    data2: 0,
    data3: 0,
    data4: 0,
    date_prelevement: ''
  };

  heartbeats!: Heartbeat[];
  showForm: Boolean = false;
  constructor(private route: ActivatedRoute, private clientService: ClientService, private heartbeatService: HeartbeatService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getClient(this.id)
    this.getHeartbeatsById(this.id)
  }

  async getClient(id: any) {
    try {
      this.client = await this.clientService.getById(id).toPromise() as Client;
    } catch (error) {
      console.error(error);
    }
  }

  persistHeartbeat() {
    this.heartbeat.mac = this.client.mac;

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 23).replace('T', ' ');
    this.heartbeat.date_prelevement = formattedDate;

    this.heartbeatService.persist(this.heartbeat).subscribe();
    this.heartbeats.push(this.heartbeat);
    this.displayForm(false);
  }

  getHeartbeatsById(id: any) {
    this.heartbeatService.findAllById(id).subscribe(heartbeats => {
      this.heartbeats = heartbeats;
    });
  }

  displayForm(bool: any) {
    this.showForm = bool;
  }

}
