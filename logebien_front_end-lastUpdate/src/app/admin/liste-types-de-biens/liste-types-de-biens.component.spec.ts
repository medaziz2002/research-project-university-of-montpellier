import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTypesDeBiensComponent } from './liste-types-de-biens.component';

describe('ListeTypesDeBiensComponent', () => {
  let component: ListeTypesDeBiensComponent;
  let fixture: ComponentFixture<ListeTypesDeBiensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeTypesDeBiensComponent]
    });
    fixture = TestBed.createComponent(ListeTypesDeBiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
