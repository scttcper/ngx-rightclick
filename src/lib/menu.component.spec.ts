import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonService, MdoButtonModule } from '@ctrl/ngx-github-buttons';
import { of as ObservableOf } from 'rxjs';

import { MenuComponent } from './menu.component';

class FakeButtonService {
  repo() {
    return ObservableOf({ stargazers_count: 0 });
  }
}

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuComponent],
      imports: [MdoButtonModule],
      providers: [{ provide: ButtonService, useClass: FakeButtonService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
