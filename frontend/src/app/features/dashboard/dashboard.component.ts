import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { EMPTY, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';

import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Item } from './item.model';
import { ListDto } from './list-dto.model';
import { List } from './list.model';
import { ListService } from './list.service';

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

  lists = [
    {
      id: '13628',
      title: '13628 (inpercima - all seen movies)',
    },
    {
      id: '102118',
      title: '102118 (inpercima - all seen series)',
    },
  ];
  filteredLists$: Observable<List[]> = EMPTY;
  list: ListDto | undefined;

  items$: Observable<Item[]> = EMPTY;

  form = this.fb.group({
    listId: ['', Validators.required],
    language: ['de', Validators.required],
  });

  filterForm = this.fb.group({
    filter: '',
  });

  constructor(private fb: NonNullableFormBuilder, private listService: ListService) {}

  ngOnInit(): void {
    this.filteredLists$ =
      this.form.get('listId')?.valueChanges.pipe(
        startWith(''),
        map((value) => this.listFilter(value))
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
    this.listService.list(this.form.value).subscribe((list) => (this.list = list));
  }

  private listFilter(term: string): List[] {
    return this.lists.filter((list) => list.id.toLowerCase().includes(term.toLowerCase()));
  }

  private itemFilter(term: string): Item[] {
    return this.list?.items?.filter((item) => item?.title.toLowerCase().includes(term.toLowerCase())) ?? [];
  }
}
