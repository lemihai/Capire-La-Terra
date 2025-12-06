import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticlePage } from './admin-article-page';

describe('AdminArticlePage', () => {
  let component: AdminArticlePage;
  let fixture: ComponentFixture<AdminArticlePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminArticlePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminArticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
