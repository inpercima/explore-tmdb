import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { debounceTime, filter, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { MovieService } from './movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'etmdb-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  loading = false;

  filterForm: FormGroup;

  movies: string[];
  movies$: Observable<string[]>;

  lists = [{
    id: 13628,
    title: 'All seen movies',
  }, {
    id: 102118,
    title: 'All seen series',
  }];

  constructor(private formBuilder: FormBuilder, private movieService: MovieService) { }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      list: [''],
      filter: [''],
    });
    this.movies$ = this.filterForm.get('filter').valueChanges.pipe(
      debounceTime(1000),
      filter(term => term.length >= 3 || !term.length),
      distinctUntilChanged(),
      switchMap(term => term ? of(this.filter(term)) : of([])),
    );

    this.filterForm.get('list').valueChanges.subscribe(value => {
      this.loading = true;
      this.movieService.list(value).subscribe(movies => {
        this.movies = movies;
        this.loading = false;
      });
    });
  }

  filter(term: string): string[] {
    return this.movies.filter(movie => movie != null && movie.toLowerCase().includes(term.toLowerCase()));
  }
}
