import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataApiService } from '../app-data/app-data-api.service';
import { Customer } from '../models/customer.interface';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- 3. TODO Display the properties of the selected customer -->
    <ul *ngIf="customer">
      <li>Customer Id: {{customer.id}}</li>
      <li>Customer Name: {{customer.name}}</li>
      <li>Customer Address: {{customer.address}}</li>
      <li>Customer City: {{customer.city}}</li>
      <li>Customer Country: {{customer.country}}</li>
    </ul>`,
})
export class SelectedCustomerPageComponent implements OnInit {
  customer!: Customer;
  selected: any;
  constructor(private route: ActivatedRoute, private dataService: AppDataApiService, private changeDetectorRef: ChangeDetectorRef) {
    this.dataService.customers$.subscribe((data: Customer[]) => {
      this.customer = data.filter(o => o.id === this.selected)[0];
      this.changeDetectorRef.markForCheck();
    });
  }
  ngOnInit(): void {

    this.route.queryParams.subscribe((params: { [x: string]: string | number; }) => {
      this.selected = +params['id'];
      this.changeDetectorRef.markForCheck();
    });
  }
}
