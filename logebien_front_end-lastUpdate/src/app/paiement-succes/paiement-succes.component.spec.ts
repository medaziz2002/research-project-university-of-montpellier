import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementSuccesComponent } from './paiement-succes.component';

describe('PaiementSuccesComponent', () => {
  let component: PaiementSuccesComponent;
  let fixture: ComponentFixture<PaiementSuccesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaiementSuccesComponent]
    });
    fixture = TestBed.createComponent(PaiementSuccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
