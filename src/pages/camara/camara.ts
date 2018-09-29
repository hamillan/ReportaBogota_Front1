import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the CamaraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camara',
  templateUrl: 'camara.html',
})
export class CamaraPage {
  public base64Image: string;

  categorias: Object[];

  tiposReporte: Object[];

  

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera) {
  }

  ionViewDidLoad() {

    this.categorias = [
      {
        "name":"Seguridad",
          "tipos":[
            {"name":"Robo de bicicleta"},
            {"name":"Robo de celular"},
            {"name":"Robo de carro"}
          ]
      },
      {"name":"Movilidad",
          "tipos":[
            {"name":"Trancón"},
            {"name":"SITP demorado"},
            {"name":"Semáforo dañado"},
          ]
      }
    ];
    //this.categoriaSeleccionada.selectedValue = 0;
    /*
    this.tipos = new String[this.categorias.length];
    <ion-option>Malla vial</ion-option>
          <ion-option>Señales de tránsito</ion-option>
          <ion-option>Semaforización</ion-option>
    this.tipos[0] = [
      "Robo de bicicleta",
      "Robo de celular",
      "Robo de carro",
    ];
  
    this.tipos["Movilidad"] = [
      "Trancón",
      "SITP demorado",
      "Semáforo dañado",
    ];
    */

    console.log('ionViewDidLoad CamaraPage');
  }

  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     console.log(err);
    });
  }

  onSelectChange(selectedValue: any) {
    
    this.tiposReporte = [];
    this.categorias.forEach(categoria => {
      if(categoria.name == selectedValue)
      { 
          this.tiposReporte = categoria.tipos;
      }
    });
    console.log(this.categoriaSeleccionada);
  }
}
