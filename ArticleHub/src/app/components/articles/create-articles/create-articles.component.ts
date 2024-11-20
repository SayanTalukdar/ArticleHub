import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/articles/article.service';

@Component({
  selector: 'app-create-articles',
  templateUrl: './create-articles.component.html',
  styleUrls: ['./create-articles.component.scss']
})
export class CreateArticlesComponent {
  articleForm: FormGroup;
  isSubmitting = false;
  imgPath: { dbPath: ""; } | undefined;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      thumbnail: [''],
      content: ['', Validators.required],
      tags: [''],
    });
  }


  uploadFinished = (event: any) => {
    this.imgPath = event;
  }

  publishArticle(): void {
    if (this.articleForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const articleData = {
      ...this.articleForm.value,
      status: 'published',
      publishDate: new Date(),
    };

    this.articleService.createArticle(articleData, {}).subscribe({
      next: () => {
        this.isSubmitting = false;
        alert('Article published successfully!');
        this.router.navigate(['/']);
      },
      error: () => {
        this.isSubmitting = false;
        alert('An error occurred while publishing the article.');
      },
    });
  }

  back() {
    this.router.navigate(['/user/your-posts']);
  }
}
