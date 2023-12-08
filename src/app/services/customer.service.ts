import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../model/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }
token:any;
customer:any
  baseURL:string = 'http://localhost:8185/';

  getGeneratedToken(requestBody: any){
    this.token= this.http.post(this.baseURL+"api/login/customerlogin",requestBody,{responseType: 'text' as 'json'});
    this.customer=true;
    return this.token;

    }

    getAll(token:any){

          let tokenString = "Bearer "+token;

         const headers =  new HttpHeaders().set("Authorization",tokenString);


        return this.http.get(this.baseURL+"customers/getAllCustomers",{headers,responseType:'text' as 'json'});

    }
    insert(body:Customer):Observable<Customer>{

      console.log(body);

        return this.http.post<Customer>(this.baseURL+"customers/addCustomers",body);

    }
    delete(customerId: number, token: any): Observable<string> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.delete<string>(`${this.baseURL}customers/deleteByCustomers/${customerId}`, { headers });
    }
    updateAdmin(updateCustomer: Customer, token: string): Observable<Customer> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.put<Customer>(`${this.baseURL}customers/updateCustomers`, updateCustomer, { headers });
    }
  
  }
    
  