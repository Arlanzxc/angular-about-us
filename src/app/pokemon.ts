import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Pokemon {
  private _pokemons = signal<any[]>([]);
  private _loading = signal(false);

  constructor(private http: HttpClient) {}

  pokemons() {
    return this._pokemons();
  }

  loading() {
    return this._loading();
  }

  fetchPokemons() {
    this._loading.set(true);

    this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=20')
      .pipe(delay(2000)) 
      .subscribe({
        next: (response) => {
          this._pokemons.set(response.results);
          this._loading.set(false);
        },
        error: () => {
          this._loading.set(false);
        }
      });
  }
}
