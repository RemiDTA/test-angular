import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProjetComponent } from './select-projet.component';

describe('SelectProjetComponent', () => {
  let component: SelectProjetComponent;
  let fixture: ComponentFixture<SelectProjetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectProjetComponent]
    });
    fixture = TestBed.createComponent(SelectProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
