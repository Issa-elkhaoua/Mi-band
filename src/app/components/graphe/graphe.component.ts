import { Component } from '@angular/core';
import { Chart} from 'angular-highcharts';


@Component({
  selector: 'app-graphe',
  templateUrl: './graphe.component.html',
  styleUrls: ['./graphe.component.css']
})
export class GrapheComponent {
  lineChart = new Chart({
    chart:{
      type:'line'
    },
    title:{
      text: " HeartBeats"

    },
    credits:{
      enabled : false
    },
     series: [{
      name: 'heartbeats',
      data: [10, 2, 6, 5, 8, 7]
    } as any
  ]
  });
  pieChart = new Chart({
    chart: {
      type: 'pie' // Modifier le type de graphique en 'pie' pour un Pie Chart
    },
    title: {
      text: 'HeartBeats'
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'heartbeats',
      data: [10, 2, 6, 5, 8, 7]
    } as any]
  });
  
}
