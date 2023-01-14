import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItemDivider,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { useState } from 'react';
import { home as homeIcon } from 'ionicons/icons';

const Game: React.FC = () => {
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [player1Score, setPlayer1Score] = useState(501);
    const [player2Score, setPlayer2Score] = useState(501);
    const [currentScore, setCurrentScore] = useState(0);
    const [currentScoreString, setCurrentScoreString] = useState('');

    const handleScoreCreation = (score) => {
        setCurrentScoreString(currentScoreString + score);
    }

    const handleConfirmScore = (confirm) => {
        if (confirm) {
            var dartsNumber = (currentScoreString.split('+').length);
            console.log("Current player: " + currentPlayer);
            console.log("Number of darts: " + dartsNumber);
            if (dartsNumber === 3) {

                if (currentPlayer === 1) {
                    setPlayer1Score(player1Score - currentScore);
                    setCurrentPlayer(2);
                } else if (currentPlayer === 2) {
                    setPlayer2Score(player2Score - currentScore);
                    setCurrentPlayer(1);
                }

                setCurrentScoreString('');
                setCurrentScore(0);

            } else {
                setCurrentScore(0);
                setCurrentScoreString(currentScoreString + '+');
                currentScoreString.split('+').forEach((value) => {
                    switch (value.substring(0, 1)) {
                        case 'T':
                            setCurrentScore(currentScore + 3 * parseInt(value.substring(1)));
                            break;
                        case 'D':
                            setCurrentScore(currentScore + 2 * parseInt(value.substring(1)));
                            break;
                        case 'S':
                            setCurrentScore(currentScore + parseInt(value.substring(1)));
                            break;
                        default:
                            console.log('ERROR');
                            break;
                    }
                })
            }
        } else {
            setCurrentScoreString('');
            setCurrentScore(0);
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Game</IonTitle>
                    <IonButtons slot="end">
                        <IonButton expand="block" size="large" routerLink="/home">
                            <IonIcon icon={homeIcon}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonCard class={`player1Card ${currentPlayer === 1 ? "active" : ""}`}>
                                <IonCardHeader>
                                    <IonCardTitle>Player 1</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    {player1Score}
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                        <IonCol>
                            <IonCard class={`player2Card ${currentPlayer === 2 ? "active" : ""}`}>
                                <IonCardHeader>
                                    <IonCardTitle>Player 2</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    {player2Score}
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>

                    <IonItemDivider></IonItemDivider>

                    <IonRow>
                        <IonCol>
                            <IonText>{currentScoreString}</IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonText>{currentScore}</IonText>
                        </IonCol>
                    </IonRow>

                    <IonItemDivider></IonItemDivider>

                    <IonRow>
                        <IonCol>
                            <IonButton size="large" color="success" class="score-button" onClick={() => handleScoreCreation('T')}>T</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="large" color="danger" class="score-button" onClick={() => handleScoreCreation('D')}>D</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="large" color="light" class="score-button" onClick={() => handleScoreCreation('S')}>S</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton size="large" class="score-button" onClick={() => handleScoreCreation(25)}>25</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="large" class="score-button" onClick={() => handleScoreCreation(20)}>20</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="large" class="score-button" onClick={() => handleScoreCreation(19)}>19</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="large" class="score-button" onClick={() => handleScoreCreation(18)}>18</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton size="large" class="score-button" onClick={() => handleScoreCreation(17)}>17</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="large" class="score-button" onClick={() => handleScoreCreation(16)}>16</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="large" class="score-button" onClick={() => handleScoreCreation(15)}>15</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="large" class="score-button" onClick={() => handleScoreCreation(14)}>14</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton size="large" class="score-button" onClick={() => handleScoreCreation(13)}>13</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="large" class="score-button" onClick={() => handleScoreCreation(12)}>12</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="large" class="score-button" onClick={() => handleScoreCreation(11)}>11</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="large" class="score-button" onClick={() => handleScoreCreation(10)}>10</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton size="large" class="score-button" onClick={() => handleScoreCreation(9)}>9</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="large" class="score-button" onClick={() => handleScoreCreation(8)}>8</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="large" class="score-button" onClick={() => handleScoreCreation(7)}>7</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="large" class="score-button" onClick={() => handleScoreCreation(6)}>6</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton size="large" class="score-button" onClick={() => handleScoreCreation(5)}>5</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="large" class="score-button" onClick={() => handleScoreCreation(4)}>4</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="large" class="score-button" onClick={() => handleScoreCreation(3)}>3</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="large" class="score-button" onClick={() => handleScoreCreation(2)}>2</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton size="large" class="score-button" onClick={() => handleScoreCreation(1)}>1</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="large" class="score-button" onClick={() => handleScoreCreation(0)}>0</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton size="large" color="danger" expand="full" onClick={() => handleConfirmScore(false)}>Cancel</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton size="large" color="success" expand="full" onClick={() => handleConfirmScore(true)}>OK</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </IonContent>
        </IonPage>
    );
};

export default Game;
