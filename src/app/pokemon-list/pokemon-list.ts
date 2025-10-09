import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css'
})
export class PokemonList {
  pokemonService = inject(Pokemon);

  get pokemons() {
    return this.pokemonService.pokemons();
  }

  get loading() {
    return this.pokemonService.loading();
  }

  loadPokemons() {
    this.pokemonService.fetchPokemons();
  }
}
