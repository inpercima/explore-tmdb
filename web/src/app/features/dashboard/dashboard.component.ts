import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

import { Observable, of, EMPTY } from 'rxjs';
import { debounceTime, filter, distinctUntilChanged, switchMap, startWith, map } from 'rxjs/operators';

import { List } from './list.model';
import { ListService } from './list.service';
import { Item } from './item.model';
import { ListDto } from './list-dto.model';

@Component({
  selector: 'etmdb-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  appRunning = false;

  predefinedLists = [{
    id: '13628',
    title: '13628 (inpercima - all seen movies)',
  }, {
    id: '102118',
    title: '102118 (inpercima - all seen series)',
  }];
  lists$: Observable<List[]> = EMPTY;
  list!: ListDto | undefined;

  items!: Item[] | undefined;
  items$: Observable<Item[]> = EMPTY;

  form = this.nnfb.group({
    listId: ['', Validators.required],
    language: ['de', Validators.required],
  });

  filterForm = this.nnfb.group({
    filter: '',
  });

  constructor(private nnfb: NonNullableFormBuilder, private listService: ListService) { }

  ngOnInit(): void {
    this.lists$ = this.form.get('listId')?.valueChanges.pipe(
      startWith(''),
      map(value => this.listFilter(value)),
    ) ?? EMPTY;

    this.items$ = this.filterForm.get('filter')?.valueChanges.pipe(
      debounceTime(1000),
      filter(term => term.length >= 3 || !term.length),
      distinctUntilChanged(),
      switchMap(term => term ? of(this.itemFilter(term)) : EMPTY),
    ) ?? EMPTY;
  }

  onSubmit(): void {
    this.appRunning = true;
    this.list = undefined;
    this.listService.list(this.form.value).subscribe(list => this.list = list);
  }

  private listFilter(term: string): List[] {
    return this.predefinedLists.filter(list => list?.id.toLowerCase().includes(term.toLowerCase()));
  }

  private itemFilter(term: string): Item[] {
    return this.list?.items?.filter(item => item?.title.toLowerCase().includes(term.toLowerCase())) ?? [];
  }
}
