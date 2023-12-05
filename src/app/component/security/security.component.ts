import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AuthRequest } from '../../model/AuthRequest';
import { Admin } from 'src/app/model/Admin';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent {
  // Add this property to store the entered ID
  deleteId!: number;
  getId!:number;
  getName!:String;
  adminDetails: Admin | undefined;
  response: any;
  getResponse:any;
  getResponseName:any;
  token: any;
  authRequest: AuthRequest = new AuthRequest();
  static token: any;

  constructor(private jwtService: AdminService, private admService: AdminService) {}

  readFormData(formData: any) {
    this.authRequest.username = formData.form.value.username;
    this.authRequest.password = formData.form.value.password;
    this.getAccessToken(this.authRequest);
  }

  public getAccessToken(authRequest: any) {
    let response = this.jwtService.getGeneratedToken(authRequest);
    response.subscribe((genToken: any) => {
      this.token = genToken;
      console.log(genToken);
      this.accessApi(this.token);
    });
  }

  public accessApi(token: any) {
    let response = this.jwtService.getAll(token);
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

  
  isFormVisible: boolean = false;
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }
  isshowFormVisible: boolean = false;
  showForm() {
    this.isshowFormVisible = !this.isshowFormVisible;
  }
  isdeleteFormVisible: boolean = false;
  deleteForm() {
    this.isdeleteFormVisible = !this.isdeleteFormVisible;
  }
  isgetFormVisible: boolean = false;
  getForm() {
    this.isgetFormVisible = !this.isgetFormVisible;
  }
  isgetFormNameVisible: boolean = false;
  getFormName() {
    this.isgetFormNameVisible = !this.isgetFormNameVisible;
  }
  isupdateFormVisible: boolean = false;
  updateForm() {
    this.isupdateFormVisible = !this.isupdateFormVisible;
  }


  insertEmployee(data:Admin){
    
        this.admService.insert(data)
        .subscribe(
          (adm)=>{console.log('Added Admin is: '+adm);}
          );
  }
  // Modify deleteById to use the entered ID
  deleteById() {
    this.getAccessToken(this.authRequest);

    // Now, make the delete request with the entered ID
    this.jwtService.delete(this.deleteId, this.token).subscribe((msg) => {
      console.log("Deleted " + msg);
    });
  }

  getById(){
    this.getAccessToken(this.authRequest);
    this.jwtService.getId(this.getId,this.token).subscribe((msg) => {
      this.getResponse=msg
      console.log("get id is success " + msg);
    });
  }
  getByName(){
    this.getAccessToken(this.authRequest);
    this.jwtService.getName(this.getName,this.token).subscribe((msg) => {
      this.getResponseName=msg
      console.log("get Name is success " + msg);
    });
  }

  update(formData: any) {
    const adminId: number = formData.form.value.AdminId;
    const username: string = formData.form.value.username;
    const password: string = formData.form.value.password;
  
    const updatedAdmin: Admin = {
      adminId: adminId, // Include the adminId property
      userName: username,
      password: password
    };
  
    this.admService.updateAdmin(updatedAdmin, this.token)
      .subscribe(
        (updatedAdmin: Admin) => {
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
