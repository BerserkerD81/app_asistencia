import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoadingDialogComponent } from '../../partials/loading-dialog/loading-dialog.component';
import { ErrorDialogComponent } from '../../partials/error-dialog/error-dialog.component';
import { OkDialogComponent } from '../../partials/ok-dialog/ok-dialog.component';

@Component({
  selector: 'app-validar',
  templateUrl: './validar.component.html',
  styleUrls: ['./validar.component.css']
})
export class ValidarComponent implements OnInit {
  id: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') ?? '';
      if (this.id) {
        this.verifyUser(this.id);
      }
    });
  }

  verifyUser(token: string): void {
    const dialogRef = this.dialog.open(LoadingDialogComponent, {
      disableClose: true
    });

    const requestData = { token: token };
    this.userService.verifyUser(requestData).subscribe(
      response => {
        dialogRef.close();
        const dialogOk = this.dialog.open(OkDialogComponent, {
          disableClose: true
        });
        dialogOk.close();
        this.router.navigate(['/login']);
      },
      error => {
        dialogRef.close();
        const dialogError = this.dialog.open(ErrorDialogComponent, {
          disableClose: true
        });
        dialogError.close(); // Cerramos el diálogo de carga aquí también
        this.router.navigate(['/login']);

      }
    );
  }
}
