import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {QuillModule} from 'ngx-quill';
import {PostComponent} from "./components/post/post.component";
import {RouterLink} from "@angular/router";
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    HttpClientModule,
    QuillModule.forRoot(),
    RouterLink,
    DatePipe
  ],
  exports: [
    HttpClientModule,
    QuillModule,
    PostComponent
  ]
})
export class SharedModule {

}
