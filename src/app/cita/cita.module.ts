import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CitaFormComponent } from './cita-form/cita-form.component';
import { CitaListComponent } from './cita-list/cita-list.component';



@NgModule({
  declarations: [CitaFormComponent, CitaListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [CitaFormComponent, CitaListComponent]
})
export class CitaModule { }
