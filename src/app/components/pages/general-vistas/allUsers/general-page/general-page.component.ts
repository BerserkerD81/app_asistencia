import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralComponent } from '../../../general/general.component';
import { NavBarComponent } from '../../../../partials/general/nav-bar/nav-bar.component';
import { SideBarComponent } from '../../../../partials/general/side-bar/side-bar.component';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-general-page',
  standalone: true,
  imports: [NavBarComponent, SideBarComponent, GeneralComponent],
  templateUrl: './general-page.component.html',
  styleUrls: ['./general-page.component.css']  // Fixed typo styleUrl -> styleUrls
})
export class GeneralPageComponent {
  tipo: string = '';

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    const rut = this.authService.getRut();
    
    console.log("User RUT:", rut);

    // Data to be sent in the POST request
    const data = { rut };

    // Headers (optional, depending on your server requirements)
    const headers = { 'Content-Type': 'application/json' };

    this.http.post<any>('http://localhost:3000/history', data, { headers }).subscribe(
      (res) => {
        console.log(res);
        alert('Data saved successfully!');
      },
      (err) => {
        console.error(err);
        alert('Error saving data!');
      }
    );
  }
}
