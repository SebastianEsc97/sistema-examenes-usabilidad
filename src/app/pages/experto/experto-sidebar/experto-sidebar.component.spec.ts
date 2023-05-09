import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertoSidebarComponent } from './experto-sidebar.component';

describe('ExpertoSidebarComponent', () => {
  let component: ExpertoSidebarComponent;
  let fixture: ComponentFixture<ExpertoSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpertoSidebarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExpertoSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
