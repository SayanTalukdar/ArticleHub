import { Component, OnInit } from '@angular/core';

import { ArticleService } from 'src/app/services/articles/article.service';

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss']
})
export class AllArticlesComponent implements OnInit {

  articles: any = [];
  filteredArticles: any = [];
  page = 1;
  pageSize = 10;
  sortBy = 'latest';
  searchKeyword = '';

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getAllArticles().subscribe((data: any) => {
      this.articles = data;
    });
  }

  applyFilters(): void {
    let data: any = this.articles;
    if (this.searchKeyword) {
      data = data.filter((article: any) =>
        article.title.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }

    data = this.sortArticles(data, this.sortBy);

    const startIndex = (this.page - 1) * this.pageSize;
    this.filteredArticles = data.slice(startIndex, startIndex + this.pageSize);
  }

  sortArticles(data: any, sortBy: string) {
    if (sortBy === 'latest') {
      return data.sort((a: any, b: any) => +new Date(b.publishDate) - +new Date(a.publishDate));
    } else if (sortBy === 'popular') {
      return data.sort((a: any, b: any) => b.views - a.views);
    }
    return data;
  }

  onSearch(): void {
    this.page = 1;
    this.applyFilters();
  }

  onSortChange(sortBy: string): void {
    this.sortBy = sortBy;
    this.applyFilters();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.applyFilters();
  }
}
