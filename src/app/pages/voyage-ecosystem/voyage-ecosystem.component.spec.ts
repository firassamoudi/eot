import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyageEcosystemComponent } from './voyage-ecosystem.component';

describe('VoyageEcosystemComponent', () => {
  let component: VoyageEcosystemComponent;
  let fixture: ComponentFixture<VoyageEcosystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoyageEcosystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoyageEcosystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
