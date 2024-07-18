import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css'
})
export class PokedexComponent implements OnInit {

  pokemonList: any[] = [];
  filteredPokemonList: any[] = [];
  searchTerm: string = '';
  selectedPokemon: string | null = null;

   // Pagination variables
   currentPage: number = 1;
   itemsPerPage: number = 5;
   totalPages: number = 0;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe(
      data => {
        this.pokemonList = data.results;
        this.filteredPokemonList = this.pokemonList;
        this.totalPages = Math.ceil(this.filteredPokemonList.length / this.itemsPerPage);
      },
      error => {
        console.error('Error fetching Pokémon list', error);
      }
    );
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredPokemonList = this.pokemonList;
    } else {
      this.filteredPokemonList = this.pokemonList.filter(pokemon => 
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
    this.currentPage = 1; // Reset to first page on search
    this.totalPages = Math.ceil(this.filteredPokemonList.length / this.itemsPerPage);
  }
  onSelectPokemon(pokemonName: string): void {
    this.selectedPokemon = pokemonName;
  }
  onCloseDetail(): void {
    this.selectedPokemon = null; // Réinitialiser la sélection de Pokémon
  }
// Pagination functions
get paginatedPokemonList(): any[] {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  return this.filteredPokemonList.slice(startIndex, startIndex + this.itemsPerPage);
}

goToPage(page: number): void {
  this.currentPage = page;
}

nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
  console.log("Current page", this.currentPage);
  console.log("Total pages", this.totalPages);
}

previousPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}


}
