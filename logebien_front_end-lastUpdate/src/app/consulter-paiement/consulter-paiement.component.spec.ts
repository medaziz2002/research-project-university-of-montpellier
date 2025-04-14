import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterPaiementComponent } from './consulter-paiement.component';

describe('ConsulterPaiementComponent', () => {
  let component: ConsulterPaiementComponent;
  let fixture: ComponentFixture<ConsulterPaiementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsulterPaiementComponent]
    });
    fixture = TestBed.createComponent(ConsulterPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
