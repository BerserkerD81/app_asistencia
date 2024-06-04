import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  dropdownUser: boolean = false;
  dropdownUserClick(){
    if(this.dropdownUser){
      this.dropdownUser = false;
    }else{
      this.dropdownUser = true;
    }
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
}
