import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class Pokemon {
  private searchTerm$ = new Subject<string>();
  pokemons$ = new BehaviorSubject<any[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.loading$.next(true)),
        switchMap(term =>
          this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=200').pipe(
            map(response => {
              const results = response.results;
              if (!term) return results;
              return results.filter((p: any) => p.name.toLowerCase().includes(term.toLowerCase()));
            }),
            catchError(() => of([])),
            tap(() => this.loading$.next(false))
          )
        )
      )
      .subscribe(pokemons => this.pokemons$.next(pokemons));
  }

  setSearchTerm(term: string) {
    this.searchTerm$.next(term);
  }
}
