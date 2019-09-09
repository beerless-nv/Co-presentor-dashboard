import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-overzicht',
  templateUrl: './settings-overzicht.page.html',
  styleUrls: ['./settings-overzicht.page.scss'],
})
export class SettingsOverzichtPage implements OnInit {
  public settingsPages = [
    {
      title: 'Text to speech',
      url: '/instellingen/text-to-speech',
      icon: 'text'
    }
  ];

  constructor() { }

  ngOnInit() {
  }



}
