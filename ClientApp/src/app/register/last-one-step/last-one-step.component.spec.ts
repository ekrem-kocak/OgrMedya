import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastOneStepComponent } from './last-one-step.component';

describe('LastOneStepComponent', () => {
  let component: LastOneStepComponent;
  let fixture: ComponentFixture<LastOneStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastOneStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastOneStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
