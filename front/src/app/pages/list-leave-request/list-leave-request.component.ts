import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LeaveRequest } from 'src/app/shared/models/LeaveRequest';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LeaverequestService } from 'src/app/shared/services/leaverequest.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-leave-request',
  templateUrl: './list-leave-request.component.html',
  styleUrls: ['./list-leave-request.component.scss']
})
export class ListLeaveRequestComponent implements OnInit {
  Date = Date.now();
  leaverequests: LeaveRequest[] = [];
  leaverequestsCopy: LeaveRequest[] = [];
  closeResult = "";
  modalOptions: NgbModalOptions;
  deleteAlertMessage: string = "";
  successMessage: string = "";
  errorMessage: string = "";
  leaverequestToDelete: LeaveRequest;
  isLoading = false;
  permissions: string[] = [];
  itemsPerPage: number = 10;
  currentPage: number = 1;

  hasFilter: boolean = false;
  constructor(
    private leaverequestService: LeaverequestService,
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal,
    
  ) {
    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
    };
  }

  ngOnInit(): void {
    this.getLeaverequests();
    this.permissions = this.authService.getPermissions();
    
  }

  hasPermission(permission: string) {
    return this.permissions.includes(permission);
  }

  getLeaverequests() {
    this.isLoading = true;
    this.hasFilter = false;
    this.leaverequestService.getLeaverequest().subscribe({
      next: (leaverequest: LeaveRequest[]) => {
        this.isLoading = false;
        this.leaverequests = leaverequest;
        this.leaverequestsCopy = [...this.leaverequests];
        console.log(this.leaverequests);
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

  open(content, leaverequest: LeaveRequest) {
    this.deleteAlertMessage = `Are you sure you want to refuse `;
    this.leaverequestToDelete = leaverequest;
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
  
  search(event: any) {
    let search = event.target.value;
    this.hasFilter = search ? true : false;
    this.leaverequests = [...this.leaverequestsCopy];
    this.leaverequests = this.leaverequests.filter(
      (leaverequest) =>
      leaverequest.User.firstName.includes(search) ||
      leaverequest.User.lastName.includes(search) 
    );
  }

  deleteLeaverequest() {
    this.isLoading = true;
    this.leaverequestService.deleteLeaverequest(this.leaverequestToDelete.id).subscribe({
      next: (response: { message: string }) => {
        this.successMessage = "Leaverequest deleted successfully";
        this.getLeaverequests();
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
