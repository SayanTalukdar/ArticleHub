import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticleService } from 'src/app/services/articles/article.service';
import { UserService } from 'src/app/services/users/user-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent  implements OnInit {
  article: any = {};
  relatedArticles: any[] = [];
  id: number = 0;
  isAuthenticated: boolean = false;

  constructor(
    private routerService: Router,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    // private commentsService: CommentsService,
    private userService: UserService,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.router.snapshot.paramMap.get('id') || "");
    if (this.id) {
      this.loadArticle();
    }
  }

  loadArticle(): void {
    this.articleService.getArticleById(this.id).subscribe({
      next: (data) => {
        this.article = data;
        // this.loadRelatedArticles(articleId);
      },
      error: () => {
        alert('Error loading article.');
      },
    });
  }

  // loadAllComment() {
  //   this.commentsService.getAllComment(this.id).subscribe((res) => {
  //     this.comments = res
  //   }, (err: any) => {
  //     console.log(err)
  //   })
  // }

  ImagePath(path: string) {
    if (path != null) {
      return `${environment.imgUrl}${path}`;
    }
    else {
      return "No Images";
    }
  }

  back() {
    if (this.isAuthenticated){
      this.routerService.navigate(['']);
    } else {
      this.routerService.navigate(['/']);
    }
  }

  // onSubmit() {
  //   if (this.commentForm.valid) {
  //     this.commentsService.postComment(this.commentForm.value.comment, this.id).subscribe((res: any) => {
  //       this.commentForm.reset();
  //       this.loadAllComment();
  //     },
  //       (err: any) => {
  //         console.log(err)
  //       });
  //   }
  // }
}
