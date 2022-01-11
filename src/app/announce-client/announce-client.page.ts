import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ActionSheetController,
  IonContent,
  IonSlides,
  LoadingController,
  NavController,
} from '@ionic/angular';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AnnounceClientService } from '../services/announce-client.service';
const { Camera } = Plugins;

@Component({
  selector: 'app-announce-client',
  templateUrl: './announce-client.page.html',
  styleUrls: ['./announce-client.page.scss'],
})
export class AnnounceClientPage implements OnInit {
  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  @ViewChild(IonSlides, { static: false }) ionSlides: IonSlides;
  @ViewChild('shippingFormRef', { static: false }) shippingFormRef: NgForm;

  public shippingForm: FormGroup;

  public imagePath: SafeResourceUrl;

  public LuggageType = [];

  public image: string;

  public slidesOpts = {
    allowTouchMove: false,
    autoHeight: true,
  };

  public slides: string[];
  public currentSlide: string;
  public isBeginning: boolean = true;
  public isEnd: boolean = false;

  get shippingFirstName(): AbstractControl {
    return this.shippingForm.get('first_name');
  }

  get shippingLastName(): AbstractControl {
    return this.shippingForm.get('last_name');
  }

  get shippingStartingAddress(): AbstractControl {
    return this.shippingForm.get('starting_address');
  }

  get shippingArrivalAddress(): AbstractControl {
    return this.shippingForm.get('arrival_address');
  }

  get shippingContactPhone(): AbstractControl {
    return this.shippingForm.get('contact_phone');
  }

  get shippingLuggageType(): AbstractControl {
    return this.shippingForm.get('luggage_type');
  }

  get shippingImage(): AbstractControl {
    return this.shippingForm.get('image');
  }

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    private sanitizer: DomSanitizer,
    private announcesService: AnnounceClientService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.setupForm();
    this.buildSlides();
    this.LuggageType = ['Very lite', 'Medium', 'Heavy'];
  }

  ionViewDidEnter() {
    this.ionSlides.updateAutoHeight();
  }

  buildSlides() {
    const slides = ['Shipping'];
    this.currentSlide = slides[0];
    this.slides = slides;
  }

  setupForm() {
    this.shippingForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      starting_address: new FormControl('', Validators.required),
      arrival_address: new FormControl('', Validators.required),
      contact_phone: new FormControl('', Validators.required),
      luggage_type: new FormControl('', Validators.required),
      notes: new FormControl(''),
      image: new FormControl(this.image),
    });
  }

  async onSlidesChanged() {
    const index = await this.ionSlides.getActiveIndex();
    this.currentSlide = this.slides[index];
    this.isBeginning = await this.ionSlides.isBeginning();
    this.isEnd = await this.ionSlides.isEnd();
  }

  onSlidesDidChange() {
    this.ionContent.scrollToTop();
  }

  onBackButtonTouched() {
    this.ionSlides.slidePrev();
    this.ionContent.scrollToTop();
  }

  async onNextButtonTouched() {
    if (this.currentSlide === 'Shipping') {
      this.shippingFormRef.onSubmit(undefined);

      if (this.shippingForm.valid) {
        //console.log(this.shippingForm.value);
        const loading = await this.loadingCtrl.create({
          message: 'Loading...',
        });
        loading.present();
        console.log(this.shippingForm.value);
        this.announcesService
          .addAnnounce(this.shippingForm.value)
          //.pipe(take(1))
          .subscribe((announce) => {
            console.log(announce);
            loading.dismiss();
          });
        this.navCtrl.navigateRoot('/thanks', {
          animated: true,
          animationDirection: 'forward',
        });
      }
    } else {
      this.ionSlides.slideNext();
      this.ionContent.scrollToTop();
    }
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });

  async chooseImage(source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 70,
        width: 600,
        height: 600,
        preserveAspectRatio: true,
        allowEditing: true,
        correctOrientation: true,
        source: source,
        resultType: CameraResultType.Uri,
      });

      const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        image.webPath
      );
      this.imagePath = safeUrl;

      const response = await fetch(image.webPath);
      const blob = await response.blob();
      const base64 = (await this.convertBlobToBase64(blob)) as string;
      this.image = base64;
      //console.log(this.image);
      // Send encoded string to server...
    } catch (error) {
      console.warn(error);
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Choose an option',
      buttons: [
        {
          text: 'Photo Library',
          handler: () => {
            this.chooseImage(CameraSource.Photos);
          },
        },
        {
          text: 'Camera',
          handler: () => {
            this.chooseImage(CameraSource.Camera);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });

    return await actionSheet.present();
  }

  originalOrder = (): number => {
    return 0;
  };
}
