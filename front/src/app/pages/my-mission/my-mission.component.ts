import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Mission } from 'src/app/shared/models/Mission';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MissionService } from 'src/app/shared/services/mission.service';

@Component({
  selector: 'app-my-mission',
  templateUrl: './my-mission.component.html',
  styleUrls: ['./my-mission.component.scss']
})
export class MyMissionComponent implements OnInit {

  Date = Date.now();
  missions: Mission[] = [];
  missionsCopy: Mission[] = [];
  closeResult = "";
  modalOptions: NgbModalOptions;
  deleteAlertMessage: string = "";
  successMessage: string = "";
  errorMessage: string = "";
  isLoading = false;
  permissions: string[] = [];
  missionToDelete: Mission;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  missionuser:Mission;
  hasFilter: boolean = false;

  constructor(
    private authService: AuthService,
    private missionService:MissionService,
    private modalService: NgbModal

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
    this.missionService.getMyMission().subscribe({
      next: (missions) => {
        this.isLoading = false;
        this.missions = missions;
        this.missionsCopy = [...this.missions];
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "An error occurred. Please contact the support";
        setTimeout(() => {
          this.errorMessage = "";
        });
      }
    });
    // this.missionService.getMissions().subscribe({
    //   next: (missions: mission[]) => {
    //     this.isLoading = false;
    //     this.missions = missions;
    //     this.missionsCopy = [...this.missions];
    //     console.log(this.missions);
    //   },
    //   error: (error) => {
    //     this.isLoading = false;
    //     this.errorMessage = "An error occurred. Please contact the support";
    //     setTimeout(() => {
    //       this.errorMessage = "";
    //     });
    //   },
    // });
  }
//   getMissionById(){
//   this.isLoading = true;
//   this.hasFilter = false;
//   this.missionService.getMissionById(this.missionuser.id).subscribe({
//   next:(missionuser:mission )=>{
//     this.isLoading=false;
//     this.missionuser =missionuser;
//     this.missionsCopy=[...this.missions];
//     console.log(this.missionuser);
//   },
//   error:(error)=>{
//     this.isLoading =false;
//     this.errorMessage="An error occurred. Please contact the support";
//     setTimeout(() =>{
//       this.errorMessage="";
//     });
//   },
//   });
// }
  
  open(content, mission: Mission) {
    this.deleteAlertMessage = `Are you sure you want to delete `;
    this.missionToDelete = mission;
    this.modalService.open(content, this.modalOptions).result.then(
      (result) => {
        this.closeResult =  `Closed with: ${result}`;
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
        this.successMessage = "mission deleted successfully";
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
}