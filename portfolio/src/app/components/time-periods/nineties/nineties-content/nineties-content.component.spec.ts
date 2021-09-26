import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinetiesContentComponent } from './nineties-content.component';

describe('NinetiesContentComponent', () => {
  let component: NinetiesContentComponent;
  let fixture: ComponentFixture<NinetiesContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NinetiesContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NinetiesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
