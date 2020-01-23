import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { LeyService } from '../../services/ley.service';
import { Ley } from '../../models/ley';

import { ArticuloService } from '../../services/articulo.service';
import { Articulo } from '../../models/articulo';

import { User } from "../../models/user";
import { Router } from '@angular/router';


declare var M: any;
@Component({
  selector: 'app-votar',
  templateUrl: './votar.component.html',
  styleUrls: ['./votar.component.css']
  // providers: [LeyService]

})

export class VotarComponent implements OnInit {
  selectedStatus : string;
  leyes: Ley[];

  constructor(public leyService: LeyService, public articuloService: ArticuloService) { }

  public articuloSeleccionada:Articulo;
  public userLogueado:User;

/*   ngOnInit() {
    this.userLogueado=JSON.parse(localStorage.getItem("currentUser"));
    if(this.userLogueado!=undefined){
      this.getLeyes();
      this.getArticulos();
    }else{
      this.router.navigate(['/admin/login']);
    }
  } */

  ngOnInit() {

      this.getLeyes();
      this.getArticulos();
 
  }

  addLey(form?: NgForm) {
    console.log(form.value);
    if (form.value._id) {
      this.leyService.putLey(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.getLeyes();
          M.toast({ html: 'ley actualizada' });
        });
    } else {
      this.leyService.postLey(form.value)
        .subscribe(res => {
          this.getLeyes();
          this.resetForm(form);
          M.toast({ html: 'ley Guardado' });
        });
    }
  }

  getLeyes() {
    this.leyService.getLeyes()
      .subscribe(res => {
        this.leyService.leyes = res as Ley[];
      });
  }

  
  getLeyesPorEstado(){
    console.log('getLeyes x estado: '+ this.selectedStatus);
     
    if (this.selectedStatus=='Todos'){
        this.getLeyes();
    }else
    {
     this.leyService.getLeyPorEstado(this.selectedStatus).subscribe(objLeyes =>{
     console.log('objLeyes');
      console.log(objLeyes[0]);
      this.leyes =  objLeyes;
     console.log('consulta getLey x estado');
     console.log(this.leyes)
     })    
    }

  }

  public setSelectedStatus(value: any): void {
    this.selectedStatus =  value.target.value;
  }

   buscar(){
     this.getLeyesPorEstado();
   }


   editLey(ley: Ley) {
    this.leyService.selectedLey = ley;
  }


  getLeyArticulo(){
    this.leyService.getLeyArticulo(this.articuloSeleccionada)
      .subscribe((res: Ley[]) => {
        this.leyService.leyes = res as Ley[];
      });
  }

  /////////Articulos/////////////////

  addArticulo(form?: NgForm) {
    console.log(form.value);
    if(form.value._id) {
      this.articuloService.putArticulo(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.getArticulos;
          M.toast({html: 'Articulo actualizado'});
        });
    } else {
      this.articuloService.postArticulo(form.value)
      .subscribe(res => {
        this.getArticulos();
        this.resetForm(form);
        M.toast({html: 'articulo Guardado'});
      });
    }
    
  }

  getArticulos() {
    this.articuloService.getArticulos()
      .subscribe(res => {
        this.articuloService.articulos = res as Articulo[];
      });
  }

  editArticulo(articulo: Articulo) {
    this.articuloService.selectedArticulo = articulo;
  }

  deleteArticulo(_id: string, form: NgForm) {
    if(confirm('¿Esta seguro de articulo?')) {
      this.articuloService.deleteArticulo(_id)
        .subscribe(res => {
          this.getArticulos();
          this.resetForm(form);
          M.toast({html: 'Eiminado'});
        });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.articuloService.selectedArticulo = new Articulo();
    }
  }

}