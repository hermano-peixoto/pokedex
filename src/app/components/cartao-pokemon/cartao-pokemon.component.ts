import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Resultado } from '../../interfaces/pokeapi';
import { Pokemon } from '../../interfaces/pokemon';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-cartao-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cartao-pokemon.component.html',
  styleUrl: './cartao-pokemon.component.scss'
})
export class CartaoPokemonComponent implements OnChanges{
    
  constructor(private pokemonService: PokemonService) {}
    
  ngOnChanges(): void {
    this.extrairInformacao();
  }

  @Input() data?:Resultado;
  @Input() selecionado:boolean = false;
  @Input() fullData?:Pokemon;
  @Output() clicado = new EventEmitter<string>();

  id:string = "0";

  extrairInformacao() {
    if (this.data && this.data.url !== "") {
      this.id = this.data.url.substring(34, this.data.url.length - 1);
      this.pokemonService.getById(this.id);
      return;
    }
    if (this.fullData) {
      this.id = this.fullData.species.url.substring(42, this.fullData.species.url.length - 1);
      this.data = {
        name: this.fullData.species.name,
        url: ""
      }
    }

  }
}
