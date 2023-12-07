
import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service'; // Update this path

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  

  
  isDropdownOpen: boolean = false;

  toggleDropdown(isOpen: boolean) {
    this.isDropdownOpen = isOpen;


 
}}
