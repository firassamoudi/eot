import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightItemComponent } from './insight-item.component';

describe('InsightItemComponent', () => {
  let component: InsightItemComponent;
  let fixture: ComponentFixture<InsightItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsightItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
