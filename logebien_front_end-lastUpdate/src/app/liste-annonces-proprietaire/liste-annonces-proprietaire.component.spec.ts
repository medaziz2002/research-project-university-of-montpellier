import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAnnoncesProprietaireComponent } from './liste-annonces-proprietaire.component';

describe('ListeAnnoncesProprietaireComponent', () => {
  let component: ListeAnnoncesProprietaireComponent;
  let fixture: ComponentFixture<ListeAnnoncesProprietaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeAnnoncesProprietaireComponent]
    });
    fixture = TestBed.createComponent(ListeAnnoncesProprietaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
