export interface Livro {
    _id : number;
    titulo : string;
    editora : string;   
    edicao : number;    
    anopublicacao : string;
    autores: Autor[]; // Lista de autores
    assuntos: Assunto[]; // Lista de assuntos
}

export interface Autor {
    id: number;
    nome: string;
  }
  
  export interface Assunto {
    id: number;
    descricao: string;
  }