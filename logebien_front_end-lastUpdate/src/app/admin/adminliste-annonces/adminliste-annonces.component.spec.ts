import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminlisteAnnoncesComponent } from './adminliste-annonces.component';

describe('AdminlisteAnnoncesComponent', () => {
  let component: AdminlisteAnnoncesComponent;
  let fixture: ComponentFixture<AdminlisteAnnoncesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminlisteAnnoncesComponent]
    });
    fixture = TestBed.createComponent(AdminlisteAnnoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
