import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { TareaPage } from './tarea.page';

describe('TareaPage', () => {
  let component: TareaPage;
  let fixture: ComponentFixture<TareaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TareaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
