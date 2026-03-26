import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EMPTY, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { Item } from './item.model';
import { OPTIONS } from './list.config';
import { List } from './list.model';
import { ListService } from './list.service';
import { Option } from './option.model';
import { Query } from './query.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  imports: [AsyncPipe, ReactiveFormsModule],
})
export class Dashboard implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private listService = inject(ListService);

  loading = false;
  readonly options: Option[] = OPTIONS;

  list: List | undefined;
  items$: Observable<Item[]> = EMPTY;

  listForm = this.fb.group({
    listId: ['', Validators.required],
    language: ['de', Validators.required],
  });

  filterForm = this.fb.group({
    filter: '',
  });

  ngOnInit(): void {
    this.items$ =
      this.filterForm.get('filter')?.valueChanges.pipe(
        debounceTime(1000),
        filter((term) => term.length >= 3 || !term.length),
        distinctUntilChanged(),
        switchMap((term) => (term ? of(this.itemFilter(term)) : EMPTY)),
      ) ?? EMPTY;
  }

  onSubmit(): void {
    this.loading = true;
    this.list = undefined;
    this.listService.list(this.listForm.value as Query).subscribe((list) => (this.list = list));
  }

  private itemFilter(term: string): Item[] {
    return this.list?.items.filter((item) => item.title.toLowerCase().includes(term.toLowerCase())) ?? [];
  }
}
