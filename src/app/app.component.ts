import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; // Importar o MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Importar o MatInputModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatTableModule, 
    MatCardModule,
    MatDialogModule,MatFormFieldModule,MatInputModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cadastro-livros-desafiotj-web';
}
