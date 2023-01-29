import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { home as homeIcon} from 'ionicons/icons';
import { useParams } from 'react-router';

interface RouteParams {
    player: string;
}

const GameEnd: React.FC = () => {
    const props = useParams<RouteParams>();
    console.log(props);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Game Result</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonText id='win-text' class='ion-margin ion-text-center'>
                                <h1>Player {props.player} wins!</h1>
                            </IonText>
                        </IonCol>
                    </IonRow>

                </IonGrid>
                <IonButton expand="block" size="large" routerLink="/home">
                    <IonIcon slot="start" icon={homeIcon}></IonIcon>
                    Home
                </IonButton>

            </IonContent>
        </IonPage>
    );
};

export default GameEnd;
