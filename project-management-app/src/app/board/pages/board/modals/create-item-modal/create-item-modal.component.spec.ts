import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItemModalComponent } from './create-item-modal.component';

describe('CreateItemModalComponent', () => {
  let component: CreateItemModalComponent;
  let fixture: ComponentFixture<CreateItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateItemModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
