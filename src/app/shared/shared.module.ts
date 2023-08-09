import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {QuillModule} from 'ngx-quill';
import {PostComponent} from "./components/post/post.component";
import {RouterLink} from "@angular/router";
import {DatePipe} from "@angular/common";
import {MissingTranslationService} from "./missing-translation.service";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    HttpClientModule,
    QuillModule.forRoot(),
    RouterLink,
    DatePipe,
    TranslateModule,
  ],
  exports: [
    HttpClientModule,
    QuillModule,
    PostComponent,
  ],
  providers: [
    MissingTranslationService
  ]
})
export class SharedModule {

}
