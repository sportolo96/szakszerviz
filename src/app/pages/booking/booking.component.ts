import { Component, OnInit } from '@angular/core';
import { Booking } from '../../shared/models/Booking';
import { BookingService } from '../../shared/services/booking.service';
import {Employee} from "../../shared/models/Employee";
import {EmployeesService} from "../../shared/services/employees.service";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  employeeObject?: Array<Employee>;
  chosenEmployee?: Employee;

  constructor(private galleryService: EmployeesService) { }

  ngOnInit(): void {
    this.galleryService.loadGalleryMeta('__credits.json').subscribe((data: Array<Employee>) => {
      console.log(data);
      this.employeeObject = data;
    })
  }

  loadEmployee(employeeObject: Employee) {
    this.chosenEmployee = employeeObject;
  }
}
