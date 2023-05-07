import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Car } from 'src/app/shared/models/Car';
import { ReservationCars } from 'src/app/shared/models/ReservationCars';
import { Carservice } from 'src/app/shared/services/cars.service';
import { ReservationCarsService } from 'src/app/shared/services/reservationcars.service';

@Component({
  selector: 'app-add-reservation-car',
  templateUrl: './add-reservation-car.component.html',
  styleUrls: ['./add-reservation-car.component.scss']
})
export class AddReservationCarComponent implements OnInit {

  errorMessage: string = "";
  successMessage: string = "";
  cars: Car[] = [];
  reservationcar: ReservationCars;
  reservationcarForm: FormGroup;
  mode: string = "create";
  reservationcarId: number;
  isLoading = false;
  hidePassword = true;
  isSubmit: boolean = false;
  constructor(
    private carService: Carservice,
    private reservationcarService: ReservationCarsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCars();
    this.initReservationCarForm();
    this.checkMode();
  }

  initReservationCarForm() {
    this.reservationcarForm = this.fb.group({
      StartDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      type: [null, [Validators.required, Validators.email]],
      CarId: [null, [Validators.required]],
    });
  }

  getCars() {
    this.isLoading = true;
    this.carService.getCars().subscribe({
      next: (cars: Car[]) => {
        this.isLoading = false;
        this.cars = cars;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "An error occurred please connect the support";
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      },
    });
  }


  checkMode() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.reservationcarId = +paramMap.get("id");
        this.mode = "edit";
        this.getReservationCarById(this.reservationcarId);
      } else {
        this.mode = "create";
        this.reservationcarForm.addControl(
          "",
          new FormControl("", Validators.required)
        );
        this.reservationcarId = null;
      }
    });
  }

  getReservationCarById(id: number) {
    this.isLoading = true;
    this.reservationcarService.getReservationCarById(id).subscribe({
      next: (reservationcar: ReservationCars) => {
        this.isLoading = false;
        this.reservationcar = reservationcar;
        this.patchReservationCarForm();
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "An error occurred please connect the support";
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      },
    });
  }

  patchReservationCarForm() {
    this.reservationcarForm.patchValue({
      StartDate: this.reservationcar.StartDate,
      endDate: this.reservationcar.endDate,
      type: this.reservationcar.type,
      CarId: this.reservationcar.CarId,
    });
  }

  saveReservationCar() {
    this.isLoading = true;
    this.isSubmit = true;
    if (this.reservationcarForm.invalid) {
      this.isLoading = false;
      return;
    }
    if (this.mode === "create") {
      this.reservationcarService.createReservationCars(this.reservationcarForm.value).subscribe({
        next: (response: { message: string }) => {
          this.isLoading = false;
          this.router.navigate(["/reservation-cars"]);
        },
        error: (error) => {
          this.isLoading = false;
         {
            this.errorMessage =
              "An error occurred please try again or contact the support";
          }
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        },
      });
    } else {
      this.reservationcarService.editReservationCar(this.reservationcarId, this.reservationcarForm.value).subscribe({
        next: (response: { message: string }) => {
          this.isLoading = false;
          this.router.navigate(["/reservation-cars"]);
        },
        error: (error) => {
          this.isLoading = false;
           {
            this.errorMessage =
              "An error occurred please try again or contact the support";
          }
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        },
      });
    }
  }

 
}
