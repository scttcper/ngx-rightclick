import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMenuTriggerDirective } from '../lib/context-menu-trigger.directive';

describe('ContextMenuTriggerComponent', () => {
  let component: ContextMenuTriggerDirective;
  let fixture: ComponentFixture<ContextMenuTriggerDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextMenuTriggerDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextMenuTriggerDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
