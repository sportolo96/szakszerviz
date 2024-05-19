import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../../../shared/models/Employee';
import { BookingService } from '../../../shared/services/booking.service';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/User';
import {Booking} from "../../../shared/models/Booking";
import {EmployeesService} from "../../../shared/services/employees.service";

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnChanges {

  @Input() employeeInput?: Employee;
  loadedImage?: string;
  user?: User;
  loadedEmployee?: Employee | null;

  // commentObject: any = {};
  bookings: Array<Booking> = [];

  bookingForm = this.createForm({
    id: '',
    customer_name: '',
    date: '',
    phone: "",
    user_id: ''
  });

  displayedColumns: string[] = ['user_name', 'date', 'customer_name', 'phone'];

  constructor(private fb: FormBuilder,
    private router: Router,
    private galleryService: EmployeesService,
    private bookingService: BookingService,
    private userService: UserService
    ) { }

  ngOnChanges(): void {
    if (this.employeeInput?.id) {
      this.loadedEmployee = this.employeeInput;
      this.galleryService.loadImage(this.employeeInput.image_url).subscribe(data => {
        this.loadedImage = data;
      });
      this.bookingService.getBookingsByUserId(this.employeeInput.id).subscribe(bookings => {
        this.bookings = bookings;
        console.log(this.bookings);
      })
    }
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      this.user = data;
    }, error => {
      console.error(error);
    });

  }

  createForm(model: Booking) {
    let formGroup = this.fb.group(model);
    formGroup.get('customer_name')?.addValidators([Validators.required]);
    formGroup.get('phone')?.addValidators([Validators.required]);
    formGroup.get('date')?.addValidators([Validators.required]);
    return formGroup;
  }

  addBooking() {
    if (this.bookingForm.valid && this.employeeInput) {
      if (this.bookingForm.get('customer_name') && this.bookingForm.get('date') && this.bookingForm.get('phone')) {
        this.bookingService.create(this.bookingForm.value, this.employeeInput?.id).then(_ => {
        alert("Sikeres időpont foglalás!");
        }).catch(error => {
          console.error(error);
        });
      }
    }
  }

}
