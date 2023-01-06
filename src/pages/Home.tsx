import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Darts Scorer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        
      </IonContent>
    </IonPage>
  );
};

export default Home;
