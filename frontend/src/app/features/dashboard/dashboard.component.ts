import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';
import { EMPTY, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';
import { CustomItem, Item } from './item.model';
import { ItemService } from './item.service';
import { OPTIONS } from './list.config';
import { List } from './list.model';
import { ListService } from './list.service';
import { Option } from './option.model';
import { Query } from './query.model';

@Component({
  selector: 'etmdb-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    AsyncPipe,
    NgClass,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatOptionModule,
    MatProgressBarModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
})
export class DashboardComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private listService = inject(ListService);
  private itemService = inject(ItemService);

  private readonly MESSAGE_DISPLAY_DURATION = 5000;

  loading = false;
  addItemSubmitting = false;
  addItemSuccess = false;
  addItemMessage = '';

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

  addItemForm = this.fb.group({
    title: ['', Validators.required],
    comment: [''],
    media_type: ['movie' as 'movie' | 'tv', Validators.required],
  });

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
    this.listService.list(this.listForm.value as Query).subscribe((list) => (this.list = list));
  }

  onAddItem(): void {
    if (this.addItemForm.invalid) {
      return;
    }

    this.addItemSubmitting = true;
    this.addItemMessage = '';

    const item: CustomItem = this.addItemForm.value as CustomItem;

    this.itemService.addItem(item).subscribe({
      next: () => {
        this.addItemSuccess = true;
        this.addItemMessage = 'Item added successfully!';
        this.addItemForm.reset({ media_type: 'movie' });
        this.addItemSubmitting = false;

        // Clear message after 5 seconds
        setTimeout(() => {
          this.addItemMessage = '';
        }, this.MESSAGE_DISPLAY_DURATION);
      },
      error: (error) => {
        this.addItemSuccess = false;
        this.addItemMessage = error.error?.message || 'Failed to add item. Please check your API key and try again.';
        this.addItemSubmitting = false;

        // Clear message after 5 seconds
        setTimeout(() => {
          this.addItemMessage = '';
        }, this.MESSAGE_DISPLAY_DURATION);
      },
    });
  }

  private optionsFilter(term: string): Option[] {
    return OPTIONS.filter((option) => option.id.toLowerCase().includes(term.toLowerCase()));
  }

  private itemFilter(term: string): Item[] {
    return this.list?.items.filter((item) => item.title.toLowerCase().includes(term.toLowerCase())) ?? [];
  }
}
