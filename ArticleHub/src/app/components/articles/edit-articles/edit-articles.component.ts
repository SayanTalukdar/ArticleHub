import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/articles/article.service';
import { UserService } from 'src/app/services/users/user-service.service';

@Component({
  selector: 'app-edit-articles',
  templateUrl: './edit-articles.component.html',
  styleUrls: ['./edit-articles.component.scss']
})
export class EditArticlesComponent {

  isUpdated: boolean = false;
  displayMsg: string = "";
  articleData: any = {};
  editForm: FormGroup;
  isSubmitting = false;
  imgPath: { dbPath: ""; } | undefined;
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private userService: UserService,
    private router: ActivatedRoute,
    private routerService: Router,
  ) {
    this.editForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', Validators.required],
      tags: [''],
    });
  }

  ngOnInit(): void {
    this.id = parseInt(this.router.snapshot.paramMap.get("id") || "");

    this.articleService.getArticleById(this.id).subscribe((res: any) => {
      if (res) {
        // this.articleData = res?.['apartmentModel'];
        this.onloadData();
      }
      else {
        this.routerService.navigate(["not-found"])
      }
    })
  }

  onloadData(): void {
    this.editForm.patchValue({
      title: this.articleData.title,
      content: this.articleData.content,
      tags: this.articleData.tags
    })
  }

  onSubmit() {
    this.articleData = {
      Id: this.id,
      UserId: this.articleData.userId,
      Email: this.userService.getEmail(),
      title: this.editForm.value.title,
      content: this.editForm.value.content,
      tags: this.editForm.value.tags,
      thumbnail: this.articleData.thumbnail,
      date: new Date,
    }
    this.articleService.updateArticleById(this.id, this.articleData).subscribe((res: any) => {

      if (res?.["message"] == "Updated Successfully") {
        this.isUpdated = true;
        this.displayMsg = "Data Updated Successfully";
        setTimeout(() => {
          this.routerService.navigate(['', this.id]);
        }, 1000)
      }
      else {
        this.displayMsg = res?.["message"]
      }
    })
  }

  back() {
    this.routerService.navigate(['']);
  }
}
