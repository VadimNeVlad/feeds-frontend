import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesService } from 'src/app/shared/services/articles.service';
import { Observable } from 'rxjs';
import { Article } from 'src/app/shared/models/article';
import { ArticlesItemComponent } from '../articles-item/articles-item.component';
import { NzListModule } from 'ng-zorro-antd/list';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, ArticlesItemComponent, NzListModule],
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent implements OnInit, OnDestroy {
  articles$ = new Observable<Article[]>();
  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.getAllArticles();
  }

  ngOnDestroy(): void {}

  getAllArticles(): void {
    this.articles$ = this.articlesService.getAllArticles();
  }

  trackById(idx: number, article: Article): string {
    return article.id!;
  }
}
