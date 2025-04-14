import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterProfilComponent } from './consulter-profil.component';

describe('ConsulterProfilComponent', () => {
  let component: ConsulterProfilComponent;
  let fixture: ComponentFixture<ConsulterProfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsulterProfilComponent]
    });
    fixture = TestBed.createComponent(ConsulterProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
