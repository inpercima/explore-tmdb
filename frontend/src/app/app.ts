import { Component, DOCUMENT, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { Dashboard } from './features/dashboard/dashboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Dashboard],
})
export class App {
  readonly #titleService = inject(Title);
  readonly #document = inject<Document>(DOCUMENT);

  appname: string;

  public constructor() {
    this.appname = environment.appname;
    this.#titleService.setTitle(this.appname);
  }

  openDialog(): void {
    const modal = this.#document.getElementById('app-info-modal') as HTMLDialogElement;
    modal?.showModal();
  }
}
