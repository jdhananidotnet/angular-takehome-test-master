import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Customer } from "../models/customer.interface";
import { Order } from "../models/order.interface";

@Injectable()
export class AppDataService {
  private emptyData = [];
  ordersDataSource= new BehaviorSubject<Order[]>(this.emptyData);
  customerDataSource= new BehaviorSubject<Customer[]>(this.emptyData);
  selectedCustomer= new BehaviorSubject<number>(0);
  constructor() {}

}
