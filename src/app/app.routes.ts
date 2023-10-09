import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'articles' },
  {
    path: 'articles',
    loadChildren: () =>
      import('./articles/articles.routes').then((mod) => mod.articlesRoutes),
  },
];
