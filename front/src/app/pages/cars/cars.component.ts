import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/app/shared/models/Car';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Carservice } from 'src/app/shared/services/cars.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  cars: Car[] = [];
  carsCopy: Car[] = [];
  closeResult = "";
  modalOptions: NgbModalOptions;
  deleteAlertMessage: string = "";
  successMessage: string = "";
  errorMessage: string = "";
  carToDelete: Car;
  isLoading = false;
  permissions: string[] = [];

  itemsPerPage: number = 10;
  currentPage: number = 1;

  hasFilter: boolean = false;

  constructor(
    private carService: Carservice,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
    };
  }

  ngOnInit(): void {
    this.getCars();
    this.permissions = this.authService.getPermissions();
  }

  hasPermission(permission: string) {
    return this.permissions.includes(permission);
  }

  getCars() {
    this.isLoading = true;
    this.hasFilter = false;
    this.carService.getCars().subscribe({
      next: (cars: Car[]) => {
        this.isLoading = false;
        this.cars = cars;
        this.carsCopy = [...this.cars];
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

  open(content, car: Car) {
    this.deleteAlertMessage = `Are you sure you want to delete ${car.marque} ${car.matricule} `;
    this.carToDelete = car;
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

  deleteCar() {
    this.isLoading = true;
    this.carService.deleteCar(this.carToDelete.id).subscribe({
      next: (response: { message: string }) => {
        this.successMessage = "Car deleted successfully";
        this.getCars();
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
    this.cars = [...this.carsCopy];
    this.cars = this.cars.filter(
      (car) =>
        car.marque.includes(search) ||
        car.matricule.includes(search) 
    );
  }
}
