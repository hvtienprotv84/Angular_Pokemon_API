import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-pokedex-detail',
  templateUrl: './pokedex-detail.component.html',
  styleUrl: './pokedex-detail.component.css'
})
export class PokedexDetailComponent implements OnInit {

  @Input() pokemonName!: string;
  pokemonDetails: any;
  @Output() close = new EventEmitter<void>(); 

  constructor(private pokemonService: PokemonService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonDetails(this.pokemonName).subscribe(
      data => {
        this.pokemonDetails = data;
        console.log('Pokemon details loaded:', this.pokemonDetails);
        this.cdr.detectChanges(); // Forcer la détection de changement

      },
      error => {
        console.error('Error fetching Pokémon details', error);
      }
    );
  }

  onClose(): void {
    this.close.emit(); // Émettre l'événement de fermeture
  }

}
