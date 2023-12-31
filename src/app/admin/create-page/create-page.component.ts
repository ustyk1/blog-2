import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../shared/interfaces';
import {PostsService} from '../../shared/posts.service';
import {AlertService} from '../shared/services/alert.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  public form!: FormGroup;

  constructor(
    private postsService: PostsService,
    private alert: AlertService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required)
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      description: this.form.value.description
    }

    this.postsService.create(post).subscribe(() => {
      this.form.reset()
      this.alert.success(this.translateService.instant('creation.status.created'))
    })
  }

}
