import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExamplesComponent } from './edit-examples.component';

describe('EditExamplesComponent', () => {
  let component: EditExamplesComponent;
  let fixture: ComponentFixture<EditExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExamplesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
