import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {

  active = 1;
  alertMessage: string = "";
  alertType: string;
  constructor() { }

  ngOnInit(): void {
  }

  handleAlert(event: { alertType: string; alertMessage: string }) {
    this.alertType = event.alertType;
    this.alertMessage = event.alertMessage;
    if (event.alertType === "danger") {
      setTimeout(() => {
        this.alertMessage = "";
      }, 5000);
    }
  }

  closeAlert() {
    this.alertMessage = "";
  }

}
