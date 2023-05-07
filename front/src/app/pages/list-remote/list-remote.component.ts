import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Remote } from 'src/app/shared/models/Remote';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RemoteService } from 'src/app/shared/services/remote.service';

@Component({
  selector: 'app-list-remote',
  templateUrl: './list-remote.component.html',
  styleUrls: ['./list-remote.component.scss']
})
export class ListRemoteComponent implements OnInit {

  Date = Date.now();
  remotes: Remote[] = [];
  remotesCopy: Remote[] = [];
  closeResult = "";
  modalOptions: NgbModalOptions;
  deleteAlertMessage: string = "";
  successMessage: string = "";
  errorMessage: string = "";
  remoteToDelete: Remote;
  isLoading = false;
  permissions: string[] = [];
  itemsPerPage: number = 10;
  currentPage: number = 1;

  hasFilter: boolean = false;

  constructor(
    private remoteService: RemoteService,
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
    this.getRemotes();
    this.permissions = this.authService.getPermissions();
    
  }

  hasPermission(permission: string) {
    return this.permissions.includes(permission);
  }

  getRemotes() {
    this.isLoading = true;
    this.hasFilter = false;
    this.remoteService.getRemotes().subscribe({
      next: (remotes: Remote[]) => {
        this.isLoading = false;
        this.remotes = remotes;
        this.remotesCopy = [...this.remotes];
        console.log(this.remotes);
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

  open(content, remote: Remote) {
    this.deleteAlertMessage = `Are you sure you want to delete `;
    this.remoteToDelete = remote;
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

  deleteRemote() {
    this.isLoading = true;
    this.remoteService.deleteRemote(this.remoteToDelete.id).subscribe({
      next: (response: { message: string }) => {
        this.successMessage = "remote deleted successfully";
        this.getRemotes();
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
    this.remotes = [...this.remotesCopy];
    this.remotes = this.remotes.filter(
      (remote) =>
      remote.Users[0].firstName.includes(search) ||
      remote.Users[0].lastName.includes(search) 
    );
  }

  changeRemoteRequestStatus() {
    this.router.navigate(["/change-remote-request"]);
  }
}
