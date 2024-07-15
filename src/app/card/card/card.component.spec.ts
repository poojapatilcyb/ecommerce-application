import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onClickWishlist should emit onClickWishlistEvent', () => {
    const id = 1;
    const emitSpy = jest.spyOn(component.onClickWishlistEvent, 'emit');
    component.onClickWishlist(id);
    expect(emitSpy).toHaveBeenCalledWith(id);
  });

  it('onClickCart should emit onClickCartEvent', () => {
    const id = 2;
    const emitSpy = jest.spyOn(component.onClickCartEvent, 'emit');
    component.onClickCart(id);
    expect(emitSpy).toHaveBeenCalledWith(id);
  });

  it('onRemovefromWishlist should emit onClickRemoveWishlistItemEvent', () => {
    const id = 3;
    const emitSpy = jest.spyOn(component.onClickRemoveWishlistItemEvent, 'emit');
    component.onRemovefromWishlist(id);
    expect(emitSpy).toHaveBeenCalledWith(id);
  });

});
