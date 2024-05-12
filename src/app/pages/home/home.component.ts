import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FotoPokemonComponent } from '../../components/foto-pokemon/foto-pokemon.component';
import { CartaoPokemonComponent } from '../../components/cartao-pokemon/cartao-pokemon.component';
import { DetalheComponent } from '../../components/detalhe/detalhe.component';
import { PokemonService } from '../../services/pokemon.service';
import { Resultado } from '../../interfaces/pokeapi';
import { Pokemon } from '../../interfaces/pokemon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FotoPokemonComponent, CartaoPokemonComponent, DetalheComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private pokemonService: PokemonService) {}

  @ViewChild("cartoes") cartoesElement!:ElementRef;

  listaPokemon:Resultado[] = []
  pagina:number = 1;
  pokemonSelecionado?:Pokemon;
  detalhe:boolean = false;

  ngOnInit(): void {
    this.carregarLista();
  }

  async carregarLista() {
    this.listaPokemon = [...this.listaPokemon, ...await this.pokemonService.getByPage(this.pagina)];
    console.log(this.listaPokemon);
    this.pagina++;
  }

  onScroll(e: any) {
    console.log(e);
    if (
      Math.round(
        this.cartoesElement.nativeElement.clientHeight + this.cartoesElement.nativeElement.scrollTop
      )
      === e.srcElement.scrollHeight) {
        this.carregarLista();
      }
  }

  async cartaoClicado(id:string) {
    if (this.pokemonSelecionado && id === this.pokemonSelecionado?.id.toString()) {
      return this.mudarEstadoDetalhe();
    }
    this.pokemonSelecionado = await this.pokemonService.getById(id);
  }

  mudarEstadoDetalhe() {
    if (this.pokemonSelecionado) this.detalhe = !this.detalhe;
  }
}
