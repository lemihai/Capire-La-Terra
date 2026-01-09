import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button implements OnInit, OnChanges {
  @Input({ required: true }) buttonText!: string;
  @Input({ required: true }) iconType!: string;
  @Input() externalFocus?: boolean;
  @Input() size?: string;

  focusedState = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // Query parameters are always strings, so you must convert 'true'/'false' to boolean
      const editModeParam = params['editMode'];

      // Check if the parameter exists and is explicitly 'true'
      let editModeFromState = editModeParam === 'true';
      if (editModeFromState == true) {
        this.toggleActive();
      }

      // Now you can safely use the 'this.editMode' property elsewhere.
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['externalFocus']) {
      const isFocused = changes['externalFocus'].currentValue;
      // console.log(1, this.externalFocus);

      // // Update the internal state based on the external input
      // if (isFocused === true) {
      //   this.focusedState = 'focused';
      // } else if (isFocused === false) {
      //   this.focusedState = '';
      // }

      // // Console log for debugging
      // console.log(`Button [${this.buttonText}] externalFocus changed to: ${isFocused}. Setting focusedState to: ${this.focusedState}`);
    }
  }

  toggleActive() {
    if (this.buttonText == 'Edit' && this.focusedState === '') {
      this.focusedState = 'focused';
    } else if (this.buttonText == 'Edit' && this.focusedState === 'focused') {
      this.focusedState = '';
    }
    // console.log(2, this.focusedState);
  }
}
