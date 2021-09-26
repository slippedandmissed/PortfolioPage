import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinetiesComponent } from './nineties.component';

describe('NinetiesComponent', () => {
  let component: NinetiesComponent;
  let fixture: ComponentFixture<NinetiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NinetiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NinetiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
