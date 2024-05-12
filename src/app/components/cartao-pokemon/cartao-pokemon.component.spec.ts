import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoPokemonComponent } from './cartao-pokemon.component';

describe('CartaoPokemonComponent', () => {
  let component: CartaoPokemonComponent;
  let fixture: ComponentFixture<CartaoPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaoPokemonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartaoPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
