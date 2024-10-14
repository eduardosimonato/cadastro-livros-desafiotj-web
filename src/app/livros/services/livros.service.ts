import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Livro } from '../livros/model/livro';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LivrosService {

  private apiUrl = environment.apiUrl; 

  constructor( private httpClient: HttpClient ) { }

  list(): Observable<Livro[]> { 
    return this.httpClient.get<Livro[]>(this.apiUrl);
  }
  
  addLivro(livro: Livro): Observable<Livro> {
    return this.httpClient.post<Livro>(this.apiUrl, livro);
  }
 
  updateLivro(id: number, livro: Livro): Observable<Livro> {
    return this.httpClient.put<Livro>(`${this.apiUrl}/${id}`, livro );
  }

  getLivroById(id: number): Observable<Livro> {
    return this.httpClient.get<Livro>(`${this.apiUrl}/${id}`);
  }

  deleteLivro(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

}
