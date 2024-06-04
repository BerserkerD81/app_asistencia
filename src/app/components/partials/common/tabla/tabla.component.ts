import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { asistencia } from '../../../../interfaces/asistencia';
export interface Tags {
  id: number;
  name: string;
}

@Component({
  selector: 'app-tabla',
  standalone: true,
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css',
  imports: [CommonModule, FormsModule]
})
export class TablaComponent implements OnInit {
  //send data asistencia
  
  private ascending = true;
  @Input() elements: any[] = [];
  tags: Tags[] = [
    {id: 1, name: 'Tag1'},
    {id: 2, name: 'Tag2'},
    // Agrega más datos aquí
  ];
  
  ngOnInit(): void {}
  
  constructor() {}
  
  getKeys(row: any): string[] {
    if (!row) {
      return [];
    }
    const keys = Object.keys(row);
    return keys;
  }
  //ordenar ascendente o decendente la informacion de una columna de la tabla
  sortData(column: string): void {
    this.elements.sort((a, b) => {
      if (a[column] > b[column]) {
        return this.ascending ? 1 : -1;
      }
      if (a[column] < b[column]) {
        return this.ascending ? -1 : 1;
      }
      return 0;
    });
  
    // Invertir el estado del ordenamiento para la próxima vez que se llame a sortData()
    this.ascending = !this.ascending;
  }


}
