import { Component, OnInit } from '@angular/core';
import { ReservationCars } from '../shared/models/ReservationCars';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../shared/services/auth.service';
import { ReservationCarsService } from '../shared/services/reservationcars.service';

@Component({
  selector: 'app-reservation-cars',
  templateUrl: './reservation-cars.component.html',
  styleUrls: ['./reservation-cars.component.scss']
})
export class ReservationCarsComponent implements OnInit {

  reservationcars: ReservationCars[] = [];
  reservationcarsCopy: ReservationCars[] = [];
  closeResult = "";
  modalOptions: NgbModalOptions;
  deleteAlertMessage: string = "";
  successMessage: string = "";
  errorMessage: string = "";
  reservationcarsToDelete: ReservationCars;
  isLoading = false;
  permissions: string[] = [];

  itemsPerPage: number = 10;
  currentPage: number = 1;

  hasFilter: boolean = false;

  constructor(
    private reservationcarService: ReservationCarsService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
    };
  }

  ngOnInit(): void {
    this.getReservationCar();
    this.permissions = this.authService.getPermissions();
  }

  hasPermission(permission: string) {
    return this.permissions.includes(permission);
  }

  getReservationCar() {
    this.isLoading = true;
    this.hasFilter = false;
    this.reservationcarService.getReservationCars().subscribe({
      next: (reservationcars: ReservationCars[]) => {
        this.isLoading = false;
        this.reservationcars = reservationcars;
        this.reservationcarsCopy = [...this.reservationcars];
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

  open(content, reservationcars: ReservationCars) {
    this.deleteAlertMessage = `Are you sure you want to delete `;
    this.reservationcarsToDelete = reservationcars;
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

  deleteReservationCar() {
    this.isLoading = true;
    this.reservationcarService.deleteReservationCar(this.reservationcarsToDelete.id).subscribe({
      next: (response: { message: string }) => {
        this.successMessage = "Reservation car deleted successfully";
        this.getReservationCar();
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
