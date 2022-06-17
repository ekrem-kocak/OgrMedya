import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/models/image';

@Component({
  selector: 'photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {

  @Input() Images?: Image[];

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.Images)
  }

}
