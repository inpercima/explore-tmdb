import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { EMPTY, Observable, of } from 'rxjs';
import { debounceTime, filter, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Movie } from './movie.model';
import { MovieService } from './movie.service';

@Component({
  selector: 'etmdb-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  loading = false;

  filterForm!: FormGroup;

  movies: Movie[] = [];
  movies$: Observable<Movie[]> = EMPTY;

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
    this.movies$ = this.filterForm.get('filter')?.valueChanges.pipe(
      debounceTime(1000),
      filter(term => term.length >= 3 || !term.length),
      distinctUntilChanged(),
      switchMap(term => term ? of(this.filter(term)) : EMPTY),
    ) ?? EMPTY;

    this.filterForm.get('list')?.valueChanges.subscribe(listId => {
      this.loading = true;
      this.movieService.list(listId).subscribe(movies => {
        this.movies = movies;
        this.loading = false;
      });
    });
  }

  filter(term: string): Movie[] {
    return this.movies.filter(movie => movie?.title.toLowerCase().includes(term.toLowerCase()));
  }
}
