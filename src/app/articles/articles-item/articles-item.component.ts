import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from 'src/app/shared/models/article';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-articles-item',
  standalone: true,
  imports: [CommonModule, NzListModule, RouterLink, NzIconModule],
  templateUrl: './articles-item.component.html',
  styleUrls: ['./articles-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesItemComponent {
  @Input() article!: Article;
}
