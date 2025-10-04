import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallaxBackground } from './parallax-background';

describe('ParallaxBackground', () => {
  let component: ParallaxBackground;
  let fixture: ComponentFixture<ParallaxBackground>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParallaxBackground]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParallaxBackground);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
