import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Button } from '../../shared/buttons/button/button';
import { News } from '../service/news-service/news-service';
import { AdminService } from '../service/admin-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-bar',
  imports: [Button],
  templateUrl: './edit-bar.html',
  styleUrl: './edit-bar.scss',
})
export class EditBar implements OnInit, OnChanges {
  @Input() mode?: string;
  @Input() componentId?: string;
  @Input() componentData?: News;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['componentData']) {
      // console.log('componentData changed:', this.componentData);
      // React to changes here (e.g., update internal state)
    }
  }

  navigateToPage() {
    // console.log('IURBVEIUBERV');
    window.open(this.componentData?.url, '_blank');
  }

  deleteCurrentArticle() {
    this.router.navigate(['/admin-page/news-view']);
    if (this.mode === 'news-article') {
      if (this.componentData?._id) {
        this.adminService.deleteOneNewsArticle(this.componentData?._id).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            // Error: Handle the error (e.g., show an error message)
            console.error('Error deleting article:', error);
            alert(`Failed to delete article: ${error.message || error}`);
          }
        );
      }
      console.log('nom nom', this.mode);
    }
  }
}
