import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBundleDetailsComponent } from './create-bundle-details.component';

describe('CreateBundleDetailsComponent', () => {
  let component: CreateBundleDetailsComponent;
  let fixture: ComponentFixture<CreateBundleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBundleDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBundleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
