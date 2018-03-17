import { Component, ViewChild, ElementRef } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';

import { Platform } from 'ionic-angular';
/**  use when auth works
import {  ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
*/
declare var google: any;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public confData: ConferenceData, public platform: Platform) {
  }

  ionViewWillLoad() {
  
      this.confData.getMap().subscribe((mapData: any) => {
        let mapEle = this.mapElement.nativeElement;

        let map = new google.maps.Map(mapEle, {
          center: mapData.find((d: any) => d.center),
          zoom: 16
        });

        mapData.forEach((markerData: any) => {
          let infoWindow = new google.maps.InfoWindow({
            content: `<h5>${markerData.name}</h5>`
          });

          let marker = new google.maps.Marker({
            position: markerData,
            map: map,
            title: markerData.name
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });

        google.maps.event.addListenerOnce(map, 'idle', () => {
          mapEle.classList.add('show-map');
        });

      });

  }
  
}
/** add toast to verify user
 * 
 *   @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(private afAuth: AngularFireAuth, private toast: ToastController,

    
this.afAuth.authState.subscribe(data => {
  if (data.email && data.uid) {
  this.toast.create({
      message: 'Welcome to APP_NAME, ${data.email}',
      duration: 5000
  }).present();
} 
else {
  this.toast.create({
    message: 'No Authentication Details',
    duration:5000
}).present();

*/