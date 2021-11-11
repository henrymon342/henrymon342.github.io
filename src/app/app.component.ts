import { Component } from '@angular/core';
import { PacientesService } from '../services/pacientes.service';
import { Paciente } from '../interfaces/paciente';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'peticion';

  public data: Paciente[] = [];
  public paciente: Paciente;

  constructor( private pacienteservice: PacientesService){
    this.getPacientes();
  }


  getPacientes(){
    this.pacienteservice.getPacientes()
    .subscribe((res: Paciente[]) => {
      this.data = res;
      console.log(this.data);
    }, err => {
      console.log(err);
    });
  }


}
