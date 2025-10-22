import { Component, OnInit, inject } from '@angular/core';
import { Pokemon } from '../pokemon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pokemon-list.html',
  styleUrls: ['./pokemon-list.css']
})
export class PokemonListComponent implements OnInit {
  pokemonService = inject(Pokemon);

  pokemons$ = this.pokemonService.pokemons$;
  loading$ = this.pokemonService.loading$;

  ngOnInit() {
    this.pokemonService.setSearchTerm('');
  }

  onSearch(term: string) {
    this.pokemonService.setSearchTerm(term);
  }
}
