import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  selectedLanguage!: string;
  languages: {id: string, code: string}[] = [];
  constructor(
    private router: Router,
    public auth: AuthService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.selectedLanguage = environment.defaultLocale; //['lang.ua', 'lang.en']
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

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/admin', 'login']);
  }
}
