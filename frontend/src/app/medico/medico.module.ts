import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicoListComponent } from './medico-list/medico-list.component';



@NgModule({
  declarations: [MedicoListComponent],
  imports: [
    CommonModule
  ],
  exports: [MedicoListComponent]
})
export class MedicoModule { }
