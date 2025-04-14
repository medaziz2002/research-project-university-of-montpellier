import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConsulterAnnonceComponent } from './admin-consulter-annonce.component';

describe('AdminConsulterAnnonceComponent', () => {
  let component: AdminConsulterAnnonceComponent;
  let fixture: ComponentFixture<AdminConsulterAnnonceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminConsulterAnnonceComponent]
    });
    fixture = TestBed.createComponent(AdminConsulterAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
