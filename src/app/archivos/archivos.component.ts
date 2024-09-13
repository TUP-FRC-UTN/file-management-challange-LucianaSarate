import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file.item.model';
import { FILE_LIST } from '../../data/file.storage';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CrearComponent } from '../crear/crear.component';

@Component({
  selector: 'app-archivos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './archivos.component.html',
  styleUrl: './archivos.component.css'
})
export class ArchivosComponent implements OnInit {

 items:FileItem[]=FILE_LIST;
 FileItems: FileItem[]=[]
 b: FileItem[] = []  ;  


constructor(private _modal:NgbModal){

}

 ngOnInit(): void {
  this.ordenarPorNombre()
 }

 ordenarPorNombre(): void {
  this.FileItems = [...this.items];
  this.FileItems.sort((a, b) => {
    const typeComparison =   a.type-b.type; 
    if (typeComparison !== 0) {
      return typeComparison;
    }
    return a.name.localeCompare(b.name); 
  });
  
}

Seleccionado(item: FileItem): void {
  const index = this.b.findIndex(selectedItem => selectedItem.id === item.id);

  if (index === -1) {
    this.b.push(item); 
  } else {
    this.b.splice(index, 1); 
  }
}
borrar(): void {
  if (this.b.length === 1) {
    this.FileItems = this.FileItems.filter(item => item.id !== this.b[0].id);
    this.b = []; 

  } else if (this.b.length > 1) {
   
    if (window.confirm('¿Estás seguro de que deseas borrar los archivos seleccionados?')) {
      this.FileItems = this.FileItems.filter(item => !this.b.includes(item));
      this.b = []; 

    }
  }
}

nuevo(){
  const modal = this._modal.open(CrearComponent, { size: 'lg' , backdrop: 'static', keyboard: false });
  modal.result.then((result) => {
    this.FileItems = [...this.FileItems, ...result]; 
console.log(this.FileItems)
  }).catch((error) => {
    console.log('Modal dismissed with error:', error);
  });
}





 
}
