import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsComponents } from './boards.components';

describe('BoardComponent', () => {
  let component: BoardsComponents;
  let fixture: ComponentFixture<BoardsComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardsComponents],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardsComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
