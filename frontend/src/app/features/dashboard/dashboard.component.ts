import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EMPTY, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';
import { Item } from './item.model';
import { OPTIONS } from './list.config';
import { List } from './list.model';
import { ListService } from './list.service';
import { Option } from './option.model';
import { Query } from './query.model';

@Component({
  selector: 'etmdb-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatOptionModule,
    MatProgressBarModule,
    ReactiveFormsModule,
  ],
})
export class DashboardComponent implements OnInit {
  loading = false;

  filteredOptions$: Observable<Option[]> = EMPTY;
  list: List | undefined;
  items$: Observable<Item[]> = EMPTY;

  listForm = this.fb.group({
    listId: ['', Validators.required],
    language: ['de', Validators.required],
  });

  filterForm = this.fb.group({
    filter: '',
  });

  constructor(private fb: NonNullableFormBuilder, private listService: ListService) {}

  ngOnInit(): void {
    this.filteredOptions$ =
      this.listForm.get('listId')?.valueChanges.pipe(
        startWith(''),
        map((value) => this.optionsFilter(value))
      ) ?? EMPTY;

    this.items$ =
      this.filterForm.get('filter')?.valueChanges.pipe(
        debounceTime(1000),
        filter((term) => term.length >= 3 || !term.length),
        distinctUntilChanged(),
        switchMap((term) => (term ? of(this.itemFilter(term)) : EMPTY))
      ) ?? EMPTY;
  }

  onSubmit(): void {
    this.loading = true;
    this.list = undefined;
    this.listService.list(<Query>this.listForm.value).subscribe((list) => (this.list = list));
  }

  private optionsFilter(term: string): Option[] {
    return OPTIONS.filter((option) => option.id.toLowerCase().includes(term.toLowerCase()));
  }

  private itemFilter(term: string): Item[] {
    return this.list?.items.filter((item) => item.title.toLowerCase().includes(term.toLowerCase())) ?? [];
  }
}
