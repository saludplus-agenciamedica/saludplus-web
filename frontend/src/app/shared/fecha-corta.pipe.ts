import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaCorta'
})
export class FechaCortaPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';
    let date: Date;
    if (typeof value === 'string') {
      // Si ya viene en formato yyyy-MM-dd, parsear correctamente
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        const [y, m, d] = value.split('-').map(Number);
        date = new Date(y, m - 1, d);
      } else {
        date = new Date(value);
      }
    } else {
      date = value;
    }
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const anio = date.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }
}
