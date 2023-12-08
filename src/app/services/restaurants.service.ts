import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurants } from '../model/Restaurants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  constructor(private http:HttpClient) { }
  baseURL:string = 'http://localhost:8185/';

  getAll(token:any){
    console.log('In Restaurant Service: GET ALL');
    console.log(token);
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      return this.http.get(this.baseURL+"Restaurants/getAllRestaurants",{headers,responseType:'text' as 'json'});
  
    }

    addAdmin(addAdmin: Restaurants, token: string): Observable<Restaurants> {
      console.log(addAdmin);
      console.log('restarant service');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post<Restaurants>(`${this.baseURL}Restaurants/addRestaurants`, addAdmin, { headers });
    }

    delete(adminId: number, token: any): Observable<string> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.delete<string>(`${this.baseURL}Restaurants/deleteById/${adminId}`, { headers });
    }

    updateMenu(updatedAdmin: Restaurants, token: string): Observable<Restaurants> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.put<Restaurants>(`${this.baseURL}Restaurants/updateRestaurants`,updatedAdmin, { headers });
    }
    
  
  

}
