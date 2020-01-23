import { Component, OnInit } from '@angular/core';
import { LeyService } from '../../services/ley.service';
import { Ley } from '../../models/ley';
import {Router} from "@angular/router"


@Component({
  selector: 'app-leyes',
  templateUrl: './leyes.component.html',
  styleUrls: ['./leyes.component.css']
})
export class LeyesComponent implements OnInit {
   leyes: Ley[];
   selectedStatus : string;

  constructor(private leyService:LeyService , private router: Router) { }

  ngOnInit() {
     this.getLeyes();   
  }

  getLeyes(){
    this.leyService.getLeyes().subscribe(obtenerLeyes => {
      this.leyes = obtenerLeyes;
      console.log('getLeyes');
      console.log(this.leyes);
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

}
