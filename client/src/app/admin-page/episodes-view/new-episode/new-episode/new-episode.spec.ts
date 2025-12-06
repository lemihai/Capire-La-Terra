import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEpisode } from './new-episode';

describe('NewEpisode', () => {
  let component: NewEpisode;
  let fixture: ComponentFixture<NewEpisode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEpisode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEpisode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
