import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isNumber } from 'highcharts';
import { AuthService } from 'src/app/auth.service';
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
  ajoutBouttons!:boolean;
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

  chartOptions = {
    title: {
    	text: ""
    },
    data: [{
      type: "line",
      dataPoints: []
    }]                
  };


  heartbeats!: Heartbeat[];
  showForm: Boolean = false;

  isValidData1 = true;
  isValidData2 = true;
  isValidData3 = true;
  isValidData4 = true;

  constructor(private route: ActivatedRoute,private authService: AuthService, private clientService: ClientService, private heartbeatService: HeartbeatService) { }

  async ngOnInit() {
    this.ajout();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    await this.getHeartbeatsById(this.id); 
    await this.getClient(this.id)
    
    
  }

  async getClient(id: any) {
    try {
      this.client = await this.clientService.getById(id).toPromise() as Client;
      this.chargerGraphe(); 
    } catch (error) {
      console.error(error);
    }
  }

  persistHeartbeat() {
    this.isValidData1 = !isNaN(this.heartbeat.data1);
    this.isValidData2 = !isNaN(this.heartbeat.data2);
    this.isValidData3 = !isNaN(this.heartbeat.data3);
    this.isValidData4 = !isNaN(this.heartbeat.data4);
    
    if (this.isValidData1 && this.isValidData2 && this.isValidData3 && this.isValidData4) {


    this.heartbeat.mac = this.client.mac;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 23).replace('T', ' ');
    this.heartbeat.date_prelevement = formattedDate;
    this.heartbeatService.persist(this.heartbeat).subscribe();
    this.heartbeats.push(this.heartbeat);
    this.displayForm(false);
    this.chargerGraphe(); 
    // Refresh the page
    location.reload();
    }
  }


getHeartbeatsById(id: any): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    this.heartbeatService.findAllById(id).subscribe(
      heartbeats => {
        this.heartbeats = heartbeats;
        resolve(); // Résoudre la Promise lorsque les données sont récupérées
      },
      error => {
        reject(error);
      }
    );
  });
}

  displayForm(bool: any) {
    this.showForm = bool;
  }

  chargerGraphe() {
    if (this.heartbeats && this.heartbeats.length !== 0) { // Ajoutez cette vérification
      const chartData: any = {
        title: {
          text: this.client.nom + ' ' + this.client.prenom
        },
        data: [{
          type: 'line',
          dataPoints: [] as any[]
        }]
      };
  
      console.log(this.heartbeats.length);
      this.heartbeats.forEach(h => {
        chartData.data[0].dataPoints.push({
          label: h.date_prelevement,
          y: (Number(h.data1) + Number(h.data2) + Number(h.data3) + Number(h.data4)) / 4
        });
      });
  
      this.chartOptions = chartData;
    }
  }

  ajout(){
    console.log("oo",this.authService.admin);
      this.ajoutBouttons = this.authService.admin
    }
}
