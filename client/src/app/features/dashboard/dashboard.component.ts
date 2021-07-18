import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable, of, empty } from 'rxjs';
import { debounceTime, filter, distinctUntilChanged, switchMap, startWith, map } from 'rxjs/operators';

import { Title } from './title.model';
import { TitleService } from './title.service';

@Component({
  selector: 'etmdb-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  appRunning = false;

  form!: FormGroup;
  filterForm!: FormGroup;

  options = [{
    id: '13628',
    comment: '',
    title: '13628 (inpercima - all seen movies)',
  }, {
    id: '102118',
    comment: '',
    title: '102118 (inpercima - all seen series)',
  }];
  filteredOptions$: Observable<Title[]> = empty();

  titles!: Title[] | undefined;
  titles$: Observable<Title[]> = empty();

  constructor(private formBuilder: FormBuilder, private titleService: TitleService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      listId: [''],
    });
    this.filteredOptions$ = this.form.get('listId')?.valueChanges.pipe(
      startWith(''),
      map(value => this.listFilter(value)),
    ) ?? empty();

    this.filterForm = this.formBuilder.group({
      filter: [''],
    });
    this.titles$ = this.filterForm.get('filter')?.valueChanges.pipe(
      debounceTime(1000),
      filter(term => term.length >= 3 || !term.length),
      distinctUntilChanged(),
      switchMap(term => term ? of(this.titleFilter(term)) : empty()),
    ) ?? empty();
  }

  onSubmit(): void {
    this.appRunning = true;
    this.titles = undefined;
    this.titleService.list(this.form.value.listId).subscribe(titles => this.titles = titles);
  }

  private listFilter(term: string): Title[] {
    return this.options.filter(option => option?.id.toLowerCase().includes(term.toLowerCase()));
  }

  titleFilter(term: string): Title[] {
    return this.titles?.filter(title => title?.title.toLowerCase().includes(term.toLowerCase())) ?? [];
  }
}
