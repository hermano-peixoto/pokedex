import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartaoPokemonComponent } from '../cartao-pokemon/cartao-pokemon.component';
import { Pokemon  } from '../../interfaces/pokemon';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CartaoPokemonComponent, CommonModule],
  templateUrl: './detalhe.component.html',
  styleUrl: './detalhe.component.scss'
})
export class DetalheComponent implements OnChanges {
  
  @Input() pokemon?:Pokemon;
  @Input() aberto:boolean = false;
  @Output() clicado = new EventEmitter();
  descricao:string = "";

  constructor(private pokemonService: PokemonService){}

  ngOnChanges(): void {
    if (this.pokemon) {
      this.pokemonService.getDescricao(this.pokemon?.id).then(res => {
        this.descricao = res;
        console.log(res);
      })
    }
  }
}
