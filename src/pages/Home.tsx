import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import {
  play as playIcon,
  settings as settingsIcon,
  statsChart as statsChartIcon
} from 'ionicons/icons';
import { App } from '@capacitor/app'

const Home: React.FC = () => {
  App.addListener('backButton', e => {
    if (window.location.pathname === "/home") {
      // Show A Confirm Box For User to exit app or not
      let ans = window.confirm("Are you sure");
      if (ans) {
        App.exitApp();
      }
    }
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Darts Scorer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonText id='home-title' class='ion-margin ion-text-center'>
          <h1>Darts Scorer</h1>
        </IonText>
        <IonImg class="home-image" src="/assets/icons/icon-512.webp"></IonImg>
        <IonButton expand="block" size="large" routerLink="/game-settings">
          <IonIcon slot="start" icon={playIcon}></IonIcon>
          Start new game
        </IonButton>
        <IonButton expand="block" size="large">
          <IonIcon slot="start" icon={statsChartIcon}></IonIcon>
          Scores
        </IonButton>
        <IonButton expand="block" size="large">
          <IonIcon slot="start" icon={settingsIcon}></IonIcon>
          Settings
        </IonButton>
      </IonContent>
      <IonFooter collapse="fade">
        <IonToolbar>
          <IonTitle class="home-footer-text">Darts Scorer by RickyPax v0.3</IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
