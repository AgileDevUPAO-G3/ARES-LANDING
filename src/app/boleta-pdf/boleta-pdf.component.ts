import { Component } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-boleta-pdf',
  standalone: true,
  templateUrl: './boleta-pdf.component.html',
  styleUrls: ['./boleta-pdf.component.css']
})
export class BoletaPdfComponent {

  generarPDF(): void {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(128, 0, 0); // Rojo vino, elegante
    doc.text('Restaurante Delicioso', 20, 20);

    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text('Boleta de Ejemplo', 20, 30);

    doc.setTextColor(0, 0, 0);
    doc.text('Cliente: Juan Pérez', 20, 40);
    doc.text('Fecha: 26/05/2025', 20, 50);
    doc.text('Producto: Pollo a la brasa', 20, 60);
    doc.text('Precio: S/ 25.00', 20, 70);

    doc.setTextColor(0, 100, 0);
    doc.text('¡Gracias por su compra!', 20, 90);

    doc.save('boleta_ejemplo.pdf');
  }
}
