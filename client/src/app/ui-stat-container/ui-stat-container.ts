import { Component, ViewChild, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-ui-stat-container',
  imports: [],
  templateUrl: './ui-stat-container.html',
  styleUrl: './ui-stat-container.scss',
})
export class UIStatContainer implements OnInit {
  @ViewChild('containerDetails') containerDetails!: ElementRef;
  @ViewChild('containerDetailsRight') containerDetailsRight!: ElementRef;
  aaa = '';
  bbb = '';
  exp = false;
  expanded = '';
  containerWidth = '64px';
  containerHeight = '16px';
  containerBottom = '6vh';
  containerOpacity = '0';
  isInforActive = '';

  translateXLeft = '0rem';
  translateYLeft = '0rem';
  scaleLeft = '.8';
  opacityLeft = '0';

  translateXRight = '3.8rem';
  translateYRight = '3.2rem';
  scaleRight = '.8';
  opacityRight = '0';

  expRight = false;
  expandedRight = '';
  containerWidthRight = '64px';
  containerHeightRight = '16px';
  containerBottomRight = '6vh';
  containerOpacityRight = '0';
  isInforActiveRight = '';

  ngAfterViewInit() {
    // console.log(this.containerDetails);
    this.aaa = this.containerDetails.nativeElement;
    this.bbb = this.containerDetailsRight.nativeElement;
  }

  expand() {
    // console.log(this.containerDetails, 'fwefew', this.aaa);
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
    // console.log(this.containerDetailsRight, 'fwefew', this.aaa);
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

  // Inject ChangeDetectorRef
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.delayedFunction();
    }, 2800);
  }

  delayedFunction() {
    this.translateXLeft = '1.6rem';
    this.translateYLeft = '-1.6rem';
    this.scaleLeft = '1';
    this.opacityLeft = '1';

    this.translateXRight = '0rem';
    this.translateYRight = '0rem';
    this.scaleRight = '1';
    this.opacityRight = '1';
    this.cdr.detectChanges();

    // console.log('feawrfer');
  }
}
