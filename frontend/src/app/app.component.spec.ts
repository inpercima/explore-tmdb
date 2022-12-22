import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      declarations: [
        AppComponent,
      ],
      /**
       * avoid error:
       * ERROR: 'NG0304: 'etmdb-dashboard' is not a known element (used in the 'AppComponent' component template)
       * 
       * Check: https://angular.io/guide/testing-components-scenarios#nested-component-tests
       */
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as appname 'explore TMDb'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.appname).toEqual('explore TMDb');
  });

  it('should render toolbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar')?.textContent).toContain('explore TMDb');
  });
});
