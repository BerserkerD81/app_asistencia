import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent {
  images: string[] = [
    'https://www.utalca.cl/content/uploads/2024/05/Simulacion-Clinica-y-Tecnologias-Digitales.jpg',
    'https://www.utalca.cl/content/uploads/2024/05/red-educacion-continua.jpg',
    'https://www.utalca.cl/content/uploads/2024/05/conferencia-Garreton.jpg'
  ];
  currentIndex = 0;

  prev() {
    this.currentIndex = (this.currentIndex === 0) ? this.images.length - 1 : this.currentIndex - 1;
  }

  next() {
    this.currentIndex = (this.currentIndex === this.images.length - 1) ? 0 : this.currentIndex + 1;
  }
}
