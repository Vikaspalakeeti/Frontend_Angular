import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../model/Cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http:HttpClient) { }
  baseURL:string = 'http://localhost:8185/';


  getAll(token:any){
    console.log('In Cart Service: GET ALL');
    console.log(token);
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      return this.http.get(this.baseURL+"cart/getAllCart",{headers,responseType:'text' as 'json'});
  
    }

    add(addCart: Cart, token: string): Observable<Cart> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post<Cart>(`${this.baseURL}cart/addCart`, addCart, { headers });
    }
  
  
    delete(Id: number, token: any): Observable<string> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.delete<string>(`${this.baseURL}cart/deleteById/${Id}`, { headers });
    }
  
    
    updateMenu(updatedcart: Cart, token: string): Observable<Cart> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.put<Cart>(`${this.baseURL}cart/updateCart`,updatedcart, { headers });
    }
  


}
