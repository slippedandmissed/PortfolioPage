import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrehistoricComponent } from './prehistoric.component';

describe('PrehistoricComponent', () => {
  let component: PrehistoricComponent;
  let fixture: ComponentFixture<PrehistoricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrehistoricComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrehistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
