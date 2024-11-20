import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersArticlesComponent } from './users-articles.component';

describe('UsersArticlesComponent', () => {
  let component: UsersArticlesComponent;
  let fixture: ComponentFixture<UsersArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersArticlesComponent]
    });
    fixture = TestBed.createComponent(UsersArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
