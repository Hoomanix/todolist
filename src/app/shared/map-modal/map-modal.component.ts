import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Capacitor, Plugins} from '@capacitor/core';
import {map} from 'rxjs/operators';
import actions from '@angular/fire/schematics/deploy/actions';
import {HelperService} from '../../services/helper.service';

const {Geolocation} = Plugins;
declare var google;


@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit {
  locations: Observable<any>;
  locationCollection: AngularFirestoreCollection<any>;
  user = null;
  @ViewChild('map', {static: false}) mapElement: ElementRef;
  map: any;
  markers = [];
  isTracking = false;
  watch = null;

  constructor(private modalCtrl: ModalController,
              private angularFireAuth: AngularFireAuth,
              private angularFireStore: AngularFirestore,
              private helperService: HelperService
  ) {
    this.getData();
  }

  ionViewWillEnter() {
    this.loadMap();
  }

  ngOnInit() {
  }

  onCancel() {
    this.modalCtrl.dismiss();

  }

  getData() {
    this.user = this.angularFireAuth.auth.currentUser;
    console.log('user is', this.user.uid);
    this.locationCollection = this.angularFireStore.collection(
        `users/${this.user.uid}/track`,
        ref => ref.orderBy('timestamp')
    );
    //load firebase data
    this.locations = this.locationCollection.snapshotChanges().pipe(map(actions =>
        actions.map(
            a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return {id, ...data};
            }
        ))
    );
    //update map
    this.locations.subscribe(locations => {
      console.log('new position', locations);
      this.updateMap(locations);
    });
  }

  updateMap(locations) {
    this.markers.map(marker => marker.setMap(null));
    this.markers = [];
    for (let loc of locations) {
      let LatLng = new google.maps.LatLng(loc.lat, loc.lng);
      let marker = new google.maps.Marker({
        position: LatLng,
        animation: google.maps.Animation.DROP,
        map: this.map
      });
      this.markers.push(marker);
    }

  }

  loadMap() {

    let latLng = new google.maps.LatLng(51.9036442, 7.6673268);
    let mapOptions = {
      center: latLng,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }

  startTracking() {
    this.isTracking = true;
    this.helperService.presentToast('Tracking your location is started!');
    this.watch = Geolocation.watchPosition({}, (position, err) => {
      console.log('new position: ', position);
      if (position) {
        this.addNewLocation(
            position.coords.latitude,
            position.coords.longitude,
            position.timestamp,
        );
      }
    });
  }

  stopTracking() {
    Geolocation.clearWatch({id: this.watch}).then(() => {
      this.isTracking = false;
      this.helperService.presentToast('Tracking your location is stopped!');

    });
  }

  addNewLocation(lat, lng, timestamp) {
    this.locationCollection.add({
      lat,
      lng,
      timestamp
    });
    let position = new google.maps.LatLng(lat, lng);
    this.map.setCenter(position);
    this.map.setZoom(5);

  }

  deleteLocation(position, slidingItem) {
    this.helperService.presentAlertConfirm(
        'Delete Product',
        'Are you sure you want to delete this location?',
        [
          {
            text: 'No',
            role: 'cancel',
            handler: (blah) => {
            }
          }, {
          text: 'Yes',
          handler: async () => {
            try {
    this.locationCollection.doc(position.id).delete();
    slidingItem.close();
            } catch (error) {
              this.helperService.presentToast(error.message);
              console.log('Error in Delete location', error);}
            }
          }
        ]
    );
  }
}
