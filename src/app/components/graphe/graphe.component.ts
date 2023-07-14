import { Component, OnInit } from '@angular/core';
import { Chart} from 'angular-highcharts';


@Component({
  selector: 'app-graphe',
  templateUrl: './graphe.component.html',
  styleUrls: ['./graphe.component.css']
})
export class GrapheComponent implements OnInit {
  debug: boolean = false;
  cursorGrabbed: boolean = false;
  gameOver: boolean = false;

  ngOnInit() {}

  handleToggleDebug() {
    this.debug = !this.debug;
  }

  handleCursorGrabbed() {
    this.cursorGrabbed = true;
    setTimeout(() => {
      this.cursorGrabbed = false;
    }, 2000);
  }

  handleButtonClicked() {
    this.gameOver = true;
    setTimeout(() => {
      this.gameOver = false;
    }, 4000);
  }
  
}
