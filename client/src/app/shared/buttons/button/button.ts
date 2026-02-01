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
      const editModeParam = params['editMode'];

      let editModeFromState = editModeParam === 'true';
      if (editModeFromState == true) {
        this.toggleActive();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['externalFocus']) {
      const isFocused = changes['externalFocus'].currentValue;
    }
  }

  toggleActive() {
    if (this.buttonText == 'Edit' && this.focusedState === '') {
      this.focusedState = 'focused';
    } else if (this.buttonText == 'Edit' && this.focusedState === 'focused') {
      this.focusedState = '';
    }
  }
}
