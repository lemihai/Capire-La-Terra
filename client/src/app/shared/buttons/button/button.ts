import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button implements OnInit {
  @Input({ required: true }) buttonText!: string;
  @Input({ required: true }) iconType!: string;
  @Input() size?: string;

  focusedState = '';

  ngOnInit(): void {
    console.log(this.buttonText);
  }

  toggleActive() {
    if (this.buttonText == 'Edit' && this.focusedState === '') {
      this.focusedState = 'focused';
    } else if (this.buttonText == 'Edit' && this.focusedState === 'focused') {
      this.focusedState = '';
    }
    console.log(this.focusedState);
    console.log(1);
  }
}
