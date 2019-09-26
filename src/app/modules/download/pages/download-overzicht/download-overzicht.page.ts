import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download-overzicht',
  templateUrl: './download-overzicht.page.html',
  styleUrls: ['./download-overzicht.page.scss'],
})
export class DownloadOverzichtPage implements OnInit {

  downloadItems = [{
    name: 'Co-presentator app',
    image: 'https://freeiconshop.com/wp-content/uploads/edd/android-flat.png',
    platform: 'Android',
    icon: 'logo-android',
    link: 'https://storage.cloud.google.com/applicaties/CoPresentator.apk',
  }, {
    name: 'Kinect applicatie',
    image: 'https://cdn2.iconfinder.com/data/icons/black-white-social-media/32/windows_online_social_media_operating_system-512.png',
    platform: 'Windows',
    icon: 'logo-windows',
    link: 'https://storage.cloud.google.com/applicaties/Gesture%20Controller.zip',
  }, {
    name: 'Handleiding setup',
    image: 'https://www.zamzar.com/images/filetypes/pdf.png',
    platform: 'PDF',
    icon: 'document',
    link: 'https://storage.cloud.google.com/applicaties/Handleiding%20setup.pdf',
  }, {
    name: 'Bewegingen Kinect',
    image: 'https://www.zamzar.com/images/filetypes/pdf.png',
    platform: 'PDF',
    icon: 'document',
    link: 'https://storage.cloud.google.com/applicaties/Bewegingen%20kinect.pdf',
  }];

  constructor() { }

  ngOnInit() {
  }

}
