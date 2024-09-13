import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileItem, FileOwner, FileType } from '../../models/file.item.model';
import { FormsModule } from '@angular/forms';
import { FILE_LIST, OWNERS } from '../../data/file.storage';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})
export class CrearComponent {
  constructor(public activeModal: NgbActiveModal) {}

  archivo: FileItem[] = [];
  nombre: string = "";
  fecha: Date = new Date();
  tipo: string = "";
  Carpeta: string = "";
  dueno: FileOwner[] = []; 

  duenos: FileOwner[] = OWNERS;
  tipos = Object.keys(FileType).filter(key => isNaN(Number(key)));
  carpetas: FileItem[] = FILE_LIST.filter(item => item.type === FileType.FOLDER);

  selectedDueno: FileOwner | undefined; 

  guardarDuen(dueno: FileOwner | undefined) {
    if (dueno) {
      this.dueno.push(dueno); 
      
      console.log(this.dueno);
    }
  }
  guardarArch() {
    
    const nuevoArchivo: FileItem = {
      id: (Math.random() * 100).toString(), 
      name: this.nombre,
      creation: this.fecha,
      type: this.tipo === 'FILE' ? FileType.FILE : FileType.FOLDER,
      owners: this.dueno, 
      parentId: this.Carpeta ? this.Carpeta : undefined,
    };

    this.archivo.push(nuevoArchivo);
  }

  cerrar() {
    this.guardarArch(); 
    this.activeModal.close(this.archivo); 
  }
}
