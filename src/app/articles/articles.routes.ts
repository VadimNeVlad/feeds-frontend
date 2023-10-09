import { Routes } from '@angular/router';

export const articlesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./articles.component').then((mod) => mod.ArticlesComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./articles-list/articles-list.component').then(
            (mod) => mod.ArticlesListComponent
          ),
      },
      {
        path: ':slug',
        loadComponent: () =>
          import('./article/article.component').then(
            (mod) => mod.ArticleComponent
          ),
      },
    ],
  },
];
