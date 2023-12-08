import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { AdminService } from 'src/app/services/admin.service';
import { Menu } from 'src/app/model/Menu';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
   key:any;
   response: any;
   menuService:any
   adminKey:any;
   authRequest: Menu = new Menu();
   deleteId!: number;
   getName!:String;
   getresponseName:any;

  
  //  constructor(private jwtService:MenuService,admintoken:AdminService){

    
  //   this.menuService=jwtService;
  //   this.key=admintoken.token;
  //   this.key.subscribe((genToken: any) => {
  //     this.adminKey = genToken;
  //     // console.log(genToken);
  //     // this.accessApi(this.adminKey);
  //   });
    
  //  }


  admin:boolean=false;
  customer:boolean=false;

  constructor(private jwtService:MenuService,admintoken:AdminService,customertoken:CustomerService){

    
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
  ngOnInit(): void {
    
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
    const restaurantId: number = formData.form.value.restaurantId;
    const itemName: string = formData.form.value.itemName;
    
  
    const description: string = formData.form.value.description;
  
    const price: number = formData.form.value.price;

  
    const updatedAdmin: Menu = {
      
      restaurantId: restaurantId,
      itemName: itemName,
      description: description,
      price: price,
      menuItemId: 0
    };
  
    this.menuService.add(updatedAdmin, this.adminKey)
      .subscribe(
        (updatedAdmin: Menu) => {
          console.log('Updated Admin is: ', updatedAdmin);
          // Handle any further logic or UI updates after a successful update
        },
        (error: any) => {
          console.error('Error updating Admin: ', error);
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
  
  getByName(){
    this.jwtService.getName(this.getName,this.adminKey).subscribe((msg) => {
      this.getresponseName=msg
      console.log("get Name is success " + msg);
    });
  }

  update(formData: any) {
    const menuItemId: number = formData.form.value.menuItemId;
    const restaurantId: number = formData.form.value.restaurantId;
    const itemName: string = formData.form.value.itemName;
    
  
    const description: string = formData.form.value.description;
  
    const price: number = formData.form.value.price;

  
    const updatedAdmin: Menu = {
      
      restaurantId: restaurantId,
      itemName: itemName,
      description: description,
      price: price,
      menuItemId: menuItemId
    };
  
    this.menuService.update(updatedAdmin, this.adminKey)
      .subscribe(
        (updatedAdmin: Menu) => {
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
