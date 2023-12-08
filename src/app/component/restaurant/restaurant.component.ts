import { Component } from '@angular/core';
import { Restaurants } from 'src/app/model/Restaurants';
import { AdminService } from 'src/app/services/admin.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent {

  key:any;
  response: any;
  menuService:any
  adminKey:any;
  authRequest: Restaurants = new Restaurants();
  deleteId!: number;
  getName!:String;
  getresponseName:any;

  admin:boolean=false;
  customer:boolean=false;

  constructor(private jwtService:RestaurantsService,admintoken:AdminService,customertoken:CustomerService){

    
    this.menuService=jwtService;
    if(admintoken.admin==true){
      this.admin=true;
      this.customer=false;
    this.key=admintoken.token;
    this.key.subscribe((genToken: any) => {
      this.adminKey = genToken;
      // console.log(genToken);
      // this.accessApi(this.adminKey);
    });}
    if(customertoken.customer==true){
      this.admin=false;
      this.customer=true;
      this.key=customertoken.token;
    this.key.subscribe((genToken: any) => {
      this.adminKey = genToken;
      // console.log(genToken);
      // this.accessApi(this.adminKey);
    });
    }
    
   }

   public getall(){
    this.accessApi(this.adminKey)
    console.log(this.adminKey);
   }

   public accessApi(adminKey: any) {
    console.log('accessApi', adminKey);  
    let response = this.menuService.getAll(adminKey);
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
  isaddFormVisible: boolean = false;
  addForm() {
    this.isaddFormVisible = !this.isaddFormVisible;
  }
  isdeleteFormVisible: boolean = false;
  deleteForm() {
    this.isdeleteFormVisible = !this.isdeleteFormVisible;
  }
  isgetFormNameVisible: boolean = false;
  getFormName() {
    this.isgetFormNameVisible = !this.isgetFormNameVisible;
  }
  isupdateFormVisible: boolean = false;
  updateForm() {
    this.isupdateFormVisible = !this.isupdateFormVisible;
  }


  add(formData: any) {
    console.log(formData);
    const restaurantName: string = formData.form.value.restaurantName;
    const cuisineType: string = formData.form.value.cuisineType;
    const location: string = formData.form.value.location;
    const rating: number = formData.form.value.rating;
    // const customerIds: [] = formData.form.value.customerIds;
  
  
  

    const updatedAdmin: Restaurants = {
      restaurantId: 0,
      restaurantName: restaurantName,
      cuisineType: cuisineType,
      location: location,
      rating: rating,
      // customerIds: customerIds
      
    };
    console.log(updatedAdmin);
    this.menuService.addAdmin(updatedAdmin, this.adminKey)
    
      .subscribe(
        (updatedAdmin: Restaurants) => {
          console.log('Updated Restaurant is: ', updatedAdmin);
          // Handle any further logic or UI updates after a successful update
        },
        (error: any) => {
          console.error('Error updating Restaurant: ', error);
          // Handle error scenarios
        }
      );
  }

  deleteById() {
    // Remove this line, as it is not needed
    // this.menuService(this.authRequest);
  
    // Now, make the delete request with the entered ID
    this.jwtService.delete(this.deleteId, this.adminKey).subscribe((msg: any) => {
      console.log("Deleted " + msg);
    });
  }
  
  update(formData: any) {
    console.log(formData);
    const restaurantId: number = formData.form.value.restaurantId;
    const restaurantName: string = formData.form.value.restaurantName;
    const cuisineType: string = formData.form.value.cuisineType;
    const location: string = formData.form.value.location;
    const rating: number = formData.form.value.rating;
    // const customerIds: number[] = formData.form.value.customerIds;

  
    const updatedAdmin: Restaurants = {
      restaurantId: restaurantId,

      restaurantName: restaurantName,
      cuisineType: cuisineType,
      location: location,
      rating: rating,
      // customerIds: []
    };
  
    this.menuService.updateMenu(updatedAdmin, this.adminKey)
      .subscribe(
        (updatedAdmin: Restaurants) => {
          console.log('Updated Restaurant is: ', updatedAdmin);
          // Handle any further logic or UI updates after a successful update
        },
        (error: any) => {
          console.error('Error updating Restaurant: ', error);
          // Handle error scenarios
        }
      );



}}

 
    
  





