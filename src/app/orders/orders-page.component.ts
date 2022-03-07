import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AppDataApiService } from '../app-data/app-data-api.service';
import { AppDataService } from '../app-data/app-dataservice.service';
import { Customer } from '../models/customer.interface';
import { Order } from '../models/order.interface';
import { Product } from '../models/product.interface';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <select #selectCustomer (change)="selectedCustomer(selectCustomer.value)">
    <option value="0"></option>
      <option *ngFor="let customer of dbService.customerDataSource |async" [value]="customer.id">
      {{customer.name}}
      </option>
    </select>
    <table>
      <thead>
        <th>Order Id</th>
        <th>Customer Name</th>
        <th>Order Date</th>
        <th>Product Name</th>
      </thead>
      <tbody>
      <tr *ngFor="let order of dbService.ordersDataSource|async">
          <td>{{order.id}}</td>
          <td  *ngIf="customers$"><a [routerLink]="['/customer']" [queryParams]="{id:order.customerId}">{{order.customerId| customerById:customers$  }}</a></td>
          <td>{{order.date | date: 'dd/MM/yyyy'}}</td>
          <td *ngIf="products$">{{order.productId| productById:products$ }}</td>
        </tr>
      </tbody>
    </table>
  `,
})
export class OrdersPageComponent {

  @ViewChild('selectCustomer') selectCustomer!: ElementRef;

  orders$: Order[] = [];
  filteredOrders$: Order[] = [];
  customers$: Customer[] = [];
  products$: Product[] = [];

  
	
  constructor(private apiDataService: AppDataApiService, public dbService: AppDataService, private cd: ChangeDetectorRef) {
    this.loadData();
  }

  loadData() {
    forkJoin([this.apiDataService.orders$, this.apiDataService.customers$, this.apiDataService.products$]).subscribe((results: any) => {
      this.dbService.ordersDataSource.next(results[0]);
      this.dbService.customerDataSource.next(results[1]);
      this.customers$ = results[1];
      this.products$ = results[2];
      this.orders$ = results[0]; 
      if (this.dbService.selectedCustomer.value != 0) {
        this.filterOrderList(this.dbService.selectedCustomer.value);
        this.selectCustomer.nativeElement.value = this.dbService.selectedCustomer.value;
      } else {
        this.selectedCustomer(0);
      }
    });
  }
	
	
	// filtereddData(customerId: any): void {

  //   if(customerId == 'null' || customerId == null) {
  //     this.filteredOrders$ = this.orders$;
  //     return;
  //   }

	// 	this.dbService.customerDataSource.pipe(
  //    withLatestFrom(this.customers$),
  //     map(([val, customer]) =>
  //       !val ? customer : customer.filter((x: { customerId: any; }) => x.customerId == customerId)
  //     ));
	// }

  // public getCustomerName(custId: number) : Observable<any> {
    
  // }

  // public getProductName(custId: number) : any {
  //   return '';
  //     //return this.prod.filter((r: { id: any; })=>r.id === custId)[0].name;
  // }

  selectedCustomer(customerId: any) {
    if (customerId != 0) {
      this.filterOrderList(customerId);
      this.dbService.selectedCustomer.next(customerId);
    }
    else {
      this.clearFilter();
    }
  }
  clearFilter() {
    this.dbService.ordersDataSource.next(this.orders$);
    this.dbService.selectedCustomer.next(0);
  }

  filterOrderList(value: any) {
    this.dbService.ordersDataSource.next(this.orders$.filter((x: { customerId: any; }) => x.customerId == value));    
  }
}
