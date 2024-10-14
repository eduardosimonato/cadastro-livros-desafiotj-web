import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivrosRoutingModule } from './livros-routing.module';
import { LivrosComponent } from './livros/livros.component';
import { LivroDialogComponent } from './livro-dialog/livro-dialog.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LivrosRoutingModule,
    LivrosComponent,
    LivroDialogComponent
  ]
})
export class LivrosModule { }
