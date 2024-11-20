import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/articles/article.service';
import { UserService } from 'src/app/services/users/user-service.service';

@Component({
  selector: 'app-users-articles',
  templateUrl: './users-articles.component.html',
  styleUrls: ['./users-articles.component.scss']
})
export class UsersArticlesComponent implements OnInit {
  articles: any = [];
  filteredArticles: any = [];
  page = 1;
  pageSize = 10;
  sortBy = 'latest';
  userId: string = "";

  constructor(private articleService: ArticleService, private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getAllArticlesByUserId(this.userId).subscribe((data: any) => {
      this.articles = data;
    });
  }

  applyFilters(): void {
    let data: any = this.articles;
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

  onSortChange(sortBy: string): void {
    this.sortBy = sortBy;
    this.applyFilters();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.applyFilters();
  }

  viewArticle(id: number) {
    this.router.navigate(['', id]);
  }

  editArticle(id: number){
    this.router.navigate(['', id]);
  }
}
