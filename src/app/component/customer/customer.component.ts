import { Component } from '@angular/core';
import { AuthRequest } from 'src/app/model/AuthRequest';
import { customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  deleteId!: number;
  response: any;
  token: any;
  authRequest: AuthRequest = new AuthRequest();

  constructor(private jwtService: CustomerService, private admService: CustomerService) {}

  readFormData(formData: any) {
    this.authRequest.username = formData.form.value.username;
    this.authRequest.password = formData.form.value.password;
    this.getAccessToken(this.authRequest);
  }
  public getAccessToken(authRequest: any) {
    let response = this.jwtService.getGeneratedToken(authRequest);
    response.subscribe((genToken) => {
      this.token = genToken;
      console.log(genToken);
       this.accessApi(this.token);
    });
  }
  public accessApi(token: any) {
    let response = this.jwtService.authorizationTest(token);
    response.subscribe((responseData: any) => {
      if (typeof responseData === 'string') {
        this.response = JSON.parse(responseData); // Parse string to array
        console.log('Response Data:', this.response);
      } else {
        console.log('Unexpected response type:', responseData);
        // Handle unexpected response if necessary
      }
    });
  }
  isshowFormVisible: boolean = false;
  showForm() {
    this.isshowFormVisible = !this.isshowFormVisible;
  }
  isFormVisible: boolean = false;
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }
  isdeleteFormVisible: boolean = false;
  deleteForm() {
    this.isdeleteFormVisible = !this.isdeleteFormVisible;
  }
  isupdateFormVisible: boolean = false;
  updateForm() {
    this.isupdateFormVisible = !this.isupdateFormVisible;
  }




  insertEmployee(data:customer){
    console.log(data)
    
    this.admService.insert(data)
    .subscribe(
      (adm)=>{console.log(adm);}
      );
}

deleteById() {
  this.getAccessToken(this.authRequest);

  // Now, make the delete request with the entered ID
  this.jwtService.delete(this.deleteId, this.token).subscribe((msg) => {
    console.log("Deleted " + msg);
  });
}

update(formData: any) {
  const customerId: number = formData.form.value.customerId;
  const customerName: string = formData.form.value.customerName;
  const email: string = formData.form.value.email;

  const phoneNumber: string = formData.form.value.phoneNumber;

  const deliveryAddress: string = formData.form.value.deliveryAddress;


  const password: string = formData.form.value.password;

  const updatedAdmin: customer = {
    

    customerId:customerId,
    customerName:customerName,
    email:email,
    phoneNumber:phoneNumber,
    deliveryAddress:deliveryAddress,
    password:password


  };

  this.admService.updateAdmin(updatedAdmin, this.token)
    .subscribe(
      (updatedAdmin: customer) => {
        console.log('Updated Admin is: ', updatedAdmin);
        // Handle any further logic or UI updates after a successful update
      },
      (error: any) => {
        console.error('Error updating Admin: ', error);
        // Handle error scenarios
      }
    );
}


}
