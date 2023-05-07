import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Mission } from 'src/app/shared/models/Mission';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MissionService } from 'src/app/shared/services/mission.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-list-mission',
  templateUrl: './list-mission.component.html',
  styleUrls: ['./list-mission.component.scss']
})
export class ListMissionComponent implements OnInit {
  Date = Date.now();
  missions: Mission[] = [];
  missionsCopy: Mission[] = [];
  closeResult = "";
  modalOptions: NgbModalOptions;
  deleteAlertMessage: string = "";
  successMessage: string = "";
  errorMessage: string = "";
  missionToDelete: Mission;
  isLoading = false;
  permissions: string[] = [];
  itemsPerPage: number = 10;
  currentPage: number = 1;

  hasFilter: boolean = false;

  constructor(
    private missionService: MissionService,
    private authService: AuthService,
    private modalService: NgbModal,
  ) {
    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
    };
  }

  ngOnInit(): void {
    this.getMissions();
    this.permissions = this.authService.getPermissions();
    
  }

  hasPermission(permission: string) {
    return this.permissions.includes(permission);
  }

  getMissions() {
    this.isLoading = true;
    this.hasFilter = false;
    this.missionService.getMissions().subscribe({
      next: (missions: Mission[]) => {
        this.isLoading = false;
        this.missions = missions;
        this.missionsCopy = [...this.missions];
        console.log(this.missions);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "An error occurred. Please contact the support";
        setTimeout(() => {
          this.errorMessage = "";
        });
      },
    });
  }

  open(content, mission: Mission) {
    this.deleteAlertMessage = `Are you sure you want to delete `;
    this.missionToDelete = mission;
    this.modalService.open(content, this.modalOptions).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  deleteMission() {
    this.isLoading = true;
    this.missionService.deleteMission(this.missionToDelete.id).subscribe({
      next: (response: { message: string }) => {
        this.successMessage = "Mission deleted successfully";
        this.getMissions();
        setTimeout(() => {
          this.successMessage = "";
        }, 5000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "An error occurred. Please contact the support";
        setTimeout(() => {
          this.errorMessage = "";
        });
      },
    });
  }

  search(event: any) {
    let search = event.target.value;
    this.hasFilter = search ? true : false;
    this.missions = [...this.missionsCopy];
    this.missions = this.missions.filter(
      (mission) =>
        mission.Users[0].firstName.includes(search) ||
        mission.Users[0].lastName.includes(search) 
    );
  }
}
