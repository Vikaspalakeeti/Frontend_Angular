import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Orders } from '../model/Orders';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }
    baseURL:string = 'http://localhost:8185/';

    getAll(token:any){
     
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
        return this.http.get(this.baseURL+"Orders/getAllOrders",{headers,responseType:'text' as 'json'});
    
    }

    add(add: Orders, token: string): Observable<Orders> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post<Orders>(`${this.baseURL}Orders/addOrders`, add, { headers });
    }
  
  
    delete(Id: number, token: any): Observable<string> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.delete<string>(`${this.baseURL}Orders/deleteById/${Id}`, { headers });
    }
  
    
    update(update: Orders, token: string): Observable<Orders> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.put<Orders>(`${this.baseURL}Orders/updateOrders`,update, { headers });
    }

}
