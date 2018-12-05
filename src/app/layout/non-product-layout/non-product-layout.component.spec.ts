import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonProductLayoutComponent } from './non-product-layout.component';

describe('NonProductLayoutComponent', () => {
  let component: NonProductLayoutComponent;
  let fixture: ComponentFixture<NonProductLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonProductLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonProductLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
