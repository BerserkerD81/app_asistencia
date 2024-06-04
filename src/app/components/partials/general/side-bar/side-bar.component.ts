import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-side-bar',
  standalone: true,
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  
  //puede ser admin o docente
  //Podría encriptars
  tipo: string;
  constructor(private _authService: AuthService, private router: Router) {
    this._authService = _authService;
    this.tipo = this._authService.getRol();
    console.log(this.tipo);
   }

}
