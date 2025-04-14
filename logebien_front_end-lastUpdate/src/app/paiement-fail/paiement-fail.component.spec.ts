import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementFailComponent } from './paiement-fail.component';

describe('PaiementFailComponent', () => {
  let component: PaiementFailComponent;
  let fixture: ComponentFixture<PaiementFailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaiementFailComponent]
    });
    fixture = TestBed.createComponent(PaiementFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
