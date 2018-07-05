import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMenuTriggerComponent } from './context-menu-trigger.component';

describe('ContextMenuTriggerComponent', () => {
  let component: ContextMenuTriggerComponent;
  let fixture: ComponentFixture<ContextMenuTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextMenuTriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextMenuTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
