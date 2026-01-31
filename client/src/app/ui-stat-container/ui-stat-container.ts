import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-ui-stat-container',
  imports: [],
  templateUrl: './ui-stat-container.html',
  styleUrl: './ui-stat-container.scss',
})
export class UIStatContainer implements OnInit, OnChanges {
  @ViewChild('containerDetails') containerDetails!: ElementRef;
  @ViewChild('containerDetailsRight') containerDetailsRight!: ElementRef;

  isAdminPage = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
    this.router.events
      .pipe(filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.handleRouteChange(event.urlAfterRedirects);
      });
  }

  aaa = '';
  bbb = '';
  exp = false;
  expanded = '';
  containerWidth = '64px';
  containerHeight = '16px';
  containerBottom = '6vh';
  containerOpacity = '0';
  containerZIndex = '32 !important';
  isInforActive = '';

  translateXLeft = '0rem';
  translateYLeft = '0rem';
  scaleLeft = '.8';
  opacityLeft = '0';

  translateXRight = '1.6rem';
  translateYRight = '1.6rem';
  scaleRight = '.8';
  opacityRight = '0';

  expRight = false;
  expandedRight = '';
  containerWidthRight = '64px';
  containerHeightRight = '16px';
  containerBottomRight = '6vh';
  containerOpacityRight = '0';
  containerZIndexRight = '-10';
  isInforActiveRight = '';

  ngAfterViewInit() {
    // console.log(this.containerDetails);
    this.aaa = this.containerDetails.nativeElement;
    this.bbb = this.containerDetailsRight.nativeElement;
    setTimeout(() => {
      this.handleRouteChange(this.router.url);
    }, 3000);
  }

  expand() {
    if (this.exp == false) {
      this.isInforActive = 'info-active';
      this.exp = true;
      this.containerWidth = '338px';
      this.containerHeight = '153px';
      this.containerBottom = '8vh';
      this.containerOpacity = '1';
    } else if ((this.exp = true)) {
      this.isInforActive = '';
      this.exp = false;
      this.containerWidth = '64px';
      this.containerHeight = '16px';
      this.containerBottom = '6vh';
      this.containerOpacity = '0';
    }
  }

  expandRight() {
    if (this.expRight == false) {
      this.isInforActiveRight = 'info-active-right';
      this.expRight = true;
      this.containerWidthRight = '338px';
      this.containerHeightRight = '153px';
      this.containerBottomRight = '8vh';
      this.containerOpacityRight = '1';
    } else if ((this.expRight = true)) {
      this.isInforActiveRight = '';
      this.expRight = false;
      this.expandedRight = '';
      this.containerWidthRight = '64px';
      this.containerHeightRight = '16px';
      this.containerBottomRight = '6vh';
      this.containerOpacityRight = '0';
    }
  }

  ngOnInit() {
    this.handleRouteChange(this.router.url);
    setTimeout(() => {}, 2800);
  }

  ngOnChanges(changes: SimpleChanges): void {
    let page = this.router.url;
  }

  appearAnimation() {
    this.translateXLeft = '1.6rem';
    this.translateYLeft = '-1.6rem';
    this.scaleLeft = '1';
    this.opacityLeft = '1';
    this.containerZIndex = '32 !important';

    this.translateXRight = '0rem';
    this.translateYRight = '0rem';
    this.scaleRight = '1';
    this.opacityRight = '1';
    this.cdr.detectChanges();
  }

  enterAdmin() {
    this.translateXLeft = '0rem';
    this.translateYLeft = '0rem';
    this.scaleLeft = '.8';
    this.opacityLeft = '0';
    this.containerZIndex = '0 !important';

    this.translateXRight = '1.6rem';
    this.translateYRight = '1.6rem';
    this.scaleRight = '.8';
    this.opacityRight = '0';
    this.cdr.detectChanges();
  }

  private handleRouteChange(url: string) {
    const hasLoaded = localStorage.getItem('landingPageLoaded');

    this.isAdminPage = url.includes('admin-page');
    if (url.includes('admin-page')) {
      this.enterAdmin();
    } else if (url.includes('')) {
      if (!hasLoaded) {
        setTimeout(() => {
          this.appearAnimation();
        }, 2800);
      } else {
        this.appearAnimation();
      }
    } else {
      this.appearAnimation();
    }
    this.resetContainers();
  }

  resetContainers() {
    this.exp = false;
    this.expRight = false;
  }
}
