import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { useEffect, useState } from 'react';
import PlayerCard from '../components/PlayerCard';

const GameSettings: React.FC = () => {
    const [numberOfPlayers, setNumberOfPlayers] = useState(0);
    const players = [];

    const handleNumberOfPlayersChange = (number) => {
        setNumberOfPlayers(number);

    }

    useEffect(() => {
        console.log(players);
        for (var i = 0; i < numberOfPlayers; i++) {
            players.push({
                index: i,
                name: 'pippo',
                color: ''
            });
        }
        console.log(players);
    }, [numberOfPlayers, players])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>New Game Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">
                {/*<IonList>
                    <IonItem>
                        <IonLabel>Number of players</IonLabel>

                    </IonItem>
                    <IonItem>
                        <IonButton size="large" class="player-button" onClick={() => handleNumberOfPlayersChange(2)}>2</IonButton>
                        <IonButton size="large" class="player-button" onClick={() => handleNumberOfPlayersChange(3)}>3</IonButton>
                        <IonButton size="large" class="player-button" onClick={() => handleNumberOfPlayersChange(4)}>4</IonButton>
                    </IonItem>
                </IonList>

                {players.map((player) =>
                    <PlayerCard index={player.index} name={player.name} />
                )}*/}

                <IonButton expand="block" size="large" routerLink="/game">
                    Start game
                </IonButton>

            </IonContent>
        </IonPage>
    );
};

export default GameSettings;
