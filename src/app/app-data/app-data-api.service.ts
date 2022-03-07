import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { Customer } from '../models/customer.interface';
import { Order, OrderDetail } from '../models/order.interface';
import { Product } from '../models/product.interface';

const CACHE_SIZE = 1;

@Injectable({ providedIn: 'root' })
export class AppDataApiService {
  products$: Observable<Product[]> = this.http.get<Product[]>('api/products');

  customers$: Observable<Customer[]> =
    this.http.get<Customer[]>('api/customers');

  orders$: Observable<Order[]> = this.http.get<Order[]>('api/orders');
  orderInfo$: any;

  constructor(private http: HttpClient) {}
}
