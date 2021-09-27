import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernContentComponent } from './modern-content.component';

describe('ModernContentComponent', () => {
  let component: ModernContentComponent;
  let fixture: ComponentFixture<ModernContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
