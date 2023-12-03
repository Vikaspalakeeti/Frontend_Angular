import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  baseURL:string = 'http://localhost:8185/';

  getGeneratedToken(requestBody: any){

        return this.http.post(this.baseURL+"api/login/customerlogin",requestBody,{responseType: 'text' as 'json'});

    }

    authorizationTest(token:any){

          let tokenString = "Bearer "+token;

         const headers =  new HttpHeaders().set("Authorization",tokenString);


        return this.http.get(this.baseURL+"customers/getAllCustomers",{headers,responseType:'text' as 'json'});

    }
    insert(body:customer):Observable<customer>{

      console.log(body);

        return this.http.post<customer>(this.baseURL+"customers/addCustomers",body);

    }
    delete(adminId: number, token: any): Observable<string> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.delete<string>(`${this.baseURL}customers/deleteByCustomers/${adminId}`, { headers });
    }
    updateAdmin(updatedAdmin: customer, token: string): Observable<customer> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.put<customer>(`${this.baseURL}customers/updateCustomers`, updatedAdmin, { headers });
    }
  
  }
    
  