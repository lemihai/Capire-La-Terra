import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

import CustomEase from 'gsap/CustomEase';
import { AdminService } from '../admin-service';

export interface Episode {
  id: string;
  title: string;
  about: string;
  number: number;
  season: number;
  sources: string[];
  transcript: string;
}

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {}
