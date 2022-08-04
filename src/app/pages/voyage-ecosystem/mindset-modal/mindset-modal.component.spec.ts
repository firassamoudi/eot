import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MindsetModalComponent } from './mindset-modal.component';

describe('MindsetModalComponent', () => {
  let component: MindsetModalComponent;
  let fixture: ComponentFixture<MindsetModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MindsetModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MindsetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
