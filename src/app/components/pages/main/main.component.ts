import { Component } from '@angular/core';
import { MyHeaderComponent } from '../../partials/my-header/my-header.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NavBarComponent } from '../../partials/general/nav-bar/nav-bar.component';
import { CarruselComponent } from '../../partials/general/carrusel/carrusel.component'
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MyHeaderComponent, RouterModule, NavBarComponent, CarruselComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  constructor(
    private router: Router,
  ){}
  
  login(){
    this.router.navigate(["/login"])
  }
}

