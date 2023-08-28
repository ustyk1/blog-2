import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../../shared/posts.service';
import {switchMap} from 'rxjs/operators';
import {Post} from '../../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form!: FormGroup
  post!: Post
  submitted: boolean = false

  uSub!: Subscription

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alert: AlertService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params['id'])
      })
    ).subscribe((post: Post) => {
      this.post = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        description: new FormControl(post.description, Validators.required)
      })
    })
  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    this.uSub = this.postsService.update(this.post._id!,{
      ...this.post,
      description: this.form.value.description,
      title: this.form.value.title
    }).subscribe(() => {
      this.submitted = false
      this.alert.success(this.translateService.instant('creation.status.created'))
    })
  }
}
