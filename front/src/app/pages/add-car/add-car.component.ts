import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Car } from 'src/app/shared/models/Car';
import { Carservice } from 'src/app/shared/services/cars.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {

  errorMessage: string = "";
  successMessage: string = "";
  carForm: FormGroup;
  mode: string = "create";
  carId: number;
  isLoading = false;
  isSubmit: boolean = false;
  car: Car;
  constructor(
    
    private carService: Carservice,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {
    this.initCarForm();
    this.checkMode();

  }
  initCarForm() {
    this.carForm = this.fb.group({
      marque: [null, [Validators.required]],
      matricule: [null, [Validators.required]],

    });
  }

  
  checkMode() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.carId = +paramMap.get("id");
        this.mode = "edit";
        this.getCarById(this.carId);
      } else {
        this.mode = "create";
        this.carForm.addControl(
          "matricule",
          new FormControl("", Validators.required)
        );
        this.carId = null;
      }
    });
  }
  getCarById(id: number) {
    this.isLoading = true;
    this.carService.getCarById(id).subscribe({
      next: (car: Car) => {
        this.isLoading = false;
        this.car = car;
        this.patchCarForm();
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

  patchCarForm() {
    this.carForm.patchValue({
      marque: this.car.marque,
      matricule: this.car.matricule,

      
    });
  }

  saveCar() {
    this.isLoading = true;
    this.isSubmit = true;
    
    if (this.carForm.invalid) {
      this.isLoading = false;
      return;
    }
    if (this.mode === "create") {
      this.carService.createCar(this.carForm.value).subscribe({
        next: (response: { message: string }) => {
          this.isLoading = false;
          this.router.navigate(["/cars"]);
        },
        error: (error) => {
          this.isLoading = false;
          if (error.error.message === "Matricule_exist") {
            this.errorMessage =
              "matricule car already exist please choose another matricule";
          } else {
            this.errorMessage =
            "An error occurred please connect the support";
          }
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        },
      });
    } else {
      this.carService.editCar(this.carId, this.carForm.value).subscribe({
        next: (response: {message: string}) => {
          this.isLoading = false;
          this.router.navigate(["/cars"]);
        },
        error: (error) => {
          this.isLoading = false;
          
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        }
      })
    }
  }
}
