
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Assunto, Autor, Livro } from '../livros/model/livro';
import { MatDialogModule } from '@angular/material/dialog'; // Importar o MatDialogModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Importar o MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Importar o MatInputModule
import { FormsModule } from '@angular/forms'; // Importando o FormsModule
import { LivrosService } from '../services/livros.service';
import { MatSelectModule } from '@angular/material/select'; // Para o mat-select e mat-option
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-livro-dialog',
  standalone: true,
  imports: [MatDialogModule,MatFormFieldModule,
    MatInputModule,FormsModule,MatSelectModule,MatIconModule],
  templateUrl: './livro-dialog.component.html',
  styleUrl: './livro-dialog.component.css'
})

export class LivroDialogComponent implements OnInit {

  livro: Livro = {} as Livro;
  public autores: Autor[]; // Defina a lista de autores
  public assuntos: Assunto[]; // Defina a lista de autores
  isEditMode: boolean = false; // Para controlar o modo de edição
  livroId: number;

  // Suponha que você tenha os autores e assuntos disponíveis em arrays ou objetos
  autoresSelecionados = [
    { id: 1, nome: 'Autor 1' },
    { id: 2, nome: 'Autor 2' }
  ];

  assuntosSelecionados = [
    { id: 10, descricao: 'Assunto 1' },
    { id: 11, descricao: 'Assunto 2' }
  ];

  constructor(
    public dialogRef: MatDialogRef<LivroDialogComponent>,
    private livroService: LivrosService,
    @Inject(MAT_DIALOG_DATA) public data: any 
    ) {
      this.livroId = data.livroId;
      this.isEditMode = data.editMode;
      this.livro = data ? { ...data } : this.criarNovoLivro();
      this.autores = []; // Inicialize a lista de autores
      this.assuntos = []; // Inicialize a lista de assuntos
    }

    criarNovoLivro(): Livro {
      return {
        _id: 0, // ou um valor padrão se necessário
        titulo: '',
        editora: '',
        edicao: 0,
        anopublicacao: '',
        autores: [],
        assuntos: []
      };
    }

    ngOnInit(): void {
      if (this.livroId) {
        this.consultarDadosDoLivro(this.livroId);
      } else {
        this.livro = this.data || {}; // Pode ser um novo livro
      }
    }

    consultarDadosDoLivro(id: number): void {
      this.livroService.getLivroById(id).subscribe(
        (dados) => {
          this.livro = dados;
          console.log(`Dados do livro consultados:`, this.livro);
        },
        (error) => {
          console.error('Erro ao consultar os dados do livro:', error);
        }
      );
    }
  
    onSave(): void {
      if (this.livroId) {
        this.livroService.updateLivro(this.livroId, this.livro).subscribe(() => {
          headers: { 'Content-Type'; 'application/json' }
          this.dialogRef.close(this.livro); // Fecha o diálogo e retorna o livro atualizado
        });
      } else {
        this.livro.autores = this.autoresSelecionados;
        this.livro.assuntos = this.assuntosSelecionados;
        this.livroService.addLivro(this.livro).subscribe(() => {
          headers: { 'Content-Type'; 'application/json' }
          this.dialogRef.close(this.livro); // Fecha o diálogo e retorna o novo livro
        });
      }
    }
  
    onCancel(): void {
      this.dialogRef.close();
    }

    allowOnlyNumbers(event: KeyboardEvent) {
      const charCode = event.which ? event.which : event.keyCode;
      // Permite números (0-9) e teclas de controle (backspace, delete, etc.)
      if ((charCode < 48 || charCode > 57) && charCode !== 8 && charCode !== 0) {
        event.preventDefault();
      }
    }

}
