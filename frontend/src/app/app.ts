import { Component, DOCUMENT, TemplateRef, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { Dashboard } from './features/dashboard/dashboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Dashboard, MatButtonModule, MatDialogModule, MatToolbarModule],
})
export class App {
  readonly #dialog = inject(MatDialog);
  readonly #titleService = inject(Title);
  readonly #document = inject<Document>(DOCUMENT);

  appname: string;

  public constructor() {
    this.appname = environment.appname;
    this.#titleService.setTitle(this.appname);
    this.#document.body.classList.add(`${environment.theme}-theme`);
  }

  openDialog(ref: TemplateRef<Element>): void {
    this.#dialog.open(ref, {
      maxWidth: '800px',
    });
  }
}
