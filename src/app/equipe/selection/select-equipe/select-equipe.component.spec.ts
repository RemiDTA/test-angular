import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEquipeComponent } from './select-equipe.component';

describe('SelectEquipeComponent', () => {
  let component: SelectEquipeComponent;
  let fixture: ComponentFixture<SelectEquipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectEquipeComponent]
    });
    fixture = TestBed.createComponent(SelectEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
