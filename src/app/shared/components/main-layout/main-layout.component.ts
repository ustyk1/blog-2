import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  selectedLanguage!: string;
  languages: {id: string, code: string}[] = [];
  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.selectedLanguage = environment.defaultLocale;
    this.translateService
      .get(environment.locales)
      .subscribe(translations => {
        this.languages = environment.locales.map((x: string) => {
          return {
            id: x,
            code: `lang.${x}`,
          };
        });
      });
  }

  changeLocale(): void {
    this.translateService.use(this.selectedLanguage);
  }

}
