import { Component, OnInit } from '@angular/core';
import { Livro } from './model/livro';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog'; // Importar o MatDialogModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Importar o MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Importar o MatInputModule
import { LivrosService } from '../services/livros.service';
import { LivroDialogComponent } from '../livro-dialog/livro-dialog.component';
import { CommonModule } from '@angular/common'; // Adicione esta linha

@Component({
  selector: 'app-livros',
  standalone: true,
  imports: [MatTableModule, 
    MatCardModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    LivroDialogComponent,MatDialogModule,MatFormFieldModule,MatInputModule,CommonModule],
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.css'
})

export class LivrosComponent implements OnInit{
  
  livros: Livro[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  displayedColumns = ['titulo','editora','edicao','anopublicacao','acoes']

  constructor( private livrosServices : LivrosService, private dialog: MatDialog ){
    
  }

  openDialog(livro?: Livro): void {
    const dialogRef = this.dialog.open(LivroDialogComponent, {
      width: '400',
      data: livro ? { ...livro } : { livroId: null, editMode: true } 
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Livro incluido:', result);
        this.successMessage = 'Livro incluido com sucesso.'
        this.getLivros();
        setTimeout(() => {
          this.successMessage = null;
        }, 5000);
      }     
    });
  }

  adicionarNovoLivro() : void {
    this.openDialog();    
  }

  consultarLivro(id: number) {
    const dialogRef = this.dialog.open(LivroDialogComponent, {
      width: '400px',
      data: { livroId: id, editMode: false }
    });
  }

  editarLivro(id: number) {
    const dialogRef = this.dialog.open(LivroDialogComponent, {
      width: '400px',
      data: { livroId: id, editMode: true }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Livro alterado:', result);
        this.successMessage = 'Livro alterado com sucesso.'
        this.getLivros();
        setTimeout(() => {
          this.successMessage = null;
        }, 5000);
      }
    });
  }

  excluirLivro(id: number) {
    this.livrosServices.deleteLivro(id).subscribe(() => {
      console.log('Livro excluído: ' + id);
      this.successMessage = 'Livro excluído com sucesso!';
      this.getLivros();
      setTimeout(() => {
        this.successMessage = null;
      }, 5000);
    }, error => {
      this.errorMessage = 'Erro ao excluir livro. Tente novamente.';
      console.error('Erro ao excluir livro', error);
      setTimeout(() => {
        this.errorMessage = null; 
      }, 5000);
    });
  }

  getLivros() {
    console.log("GetLivros()")
    this.livrosServices.list().subscribe(
      (data: Livro[]) => {
        this.livros = data;
      },
      (error) => {
        console.error('Erro ao buscar os livros:', error); // Verifique se há algum erro
      }
    );
  }

  ngOnInit(): void {
    this.getLivros();
  }

}
