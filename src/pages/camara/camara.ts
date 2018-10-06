import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//import { File } from '@ionic-native/file';

import { ReportCategoryProvider } from '../../providers/report-category/report-category';
import { ReportTypeProvider } from '../../providers/report-type/report-type';
import 'rxjs/add/operator/filter';

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
  private category_id: number;

  categorias: Object[];

  tiposReporte: ArrayBuffer;

  categories: ArrayBuffer;
  reportTypes: ArrayBuffer;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private transfer: FileTransfer,
    //private file: File,
    private loadingCtrl: LoadingController,
    public categoriesProvider: ReportCategoryProvider,
    public typeProvider: ReportTypeProvider
  ) {
    this.category_id = navParams.get('data');
  }

  ionViewDidLoad() {
    this.categoriesProvider.getReportCategories().subscribe(
      (data) =>
      {
        this.categories = data;
        console.log(data);
      },
      (error) =>
      {
        console.error(error);
      }
    );

    this.typeProvider.getReportTypes().subscribe(
      (data) =>
      {
        this.reportTypes = data;
        console.log(data);
      },
      (error) =>
      {
        console.error(error);
      }
    );
    
    console.log(this.category_id);
    console.log('ionViewDidLoad CamaraPage');
  }

  /*
  ionViewDidLoad
  ionViewWillEnter
  ionViewDidEnter
  ionViewWillLeave
  ionViewDidLeave
  ionViewWillUnload
  ionViewCanEnter
 */

  ionViewDidEnter(){
    this.onSelectChange(this.category_id);

  }

  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE/*,
      correctOrientation: true,
      saveToPhotoAlbum: true*/
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
    console.log(this.reportTypes);

    this.tiposReporte = this.reportTypes.filter((location) => {
      return location.report_category_id == selectedValue && location.report_class_id == 6;
    });
  }

/*  uploadImage(){
    //Show loading
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();

    //create file transfer object
    const fileTransfer: FileTransferObject = this.transfer.create();

    //random int
    var random = Math.floor(Math.random() * 100);

    //option transfer
    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: "myImage_" + random + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    }

    //file transfer action
    fileTransfer.upload(this.base64Image, 'http://192.168.1.30/api/upload/uploadFoto.php', options)
      .then((data) => {
        alert("Success");
        loader.dismiss();
      }, (err) => {
        console.log(err);
        alert("Error");
        loader.dismiss();
      });
  }
*/


}
