import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokedex-card',
  templateUrl: './pokedex-card.component.html',
  styleUrl: './pokedex-card.component.css'
})
export class PokedexCardComponent implements OnInit {

  @Input() pokemonName!: string;
  @Output() selectPokemon = new EventEmitter<string>();
  pokemonDetails: any;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonDetails(this.pokemonName).subscribe(
      data => {
        this.pokemonDetails = data;
      },
      error => {
        console.error('Error fetching Pokémon details', error);
      }
    );
  }

  onSelect(): void {
   
    this.selectPokemon.emit(this.pokemonName);
    console.log('Selected Pokémon', this.pokemonName );
    
  }

}
