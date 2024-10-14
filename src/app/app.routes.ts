import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '' , pathMatch: 'full' , redirectTo: 'livros' },
    {
        path: 'livros',
        loadChildren: () => import('./livros/livros.module').then(m => m.LivrosModule)
    }
];
