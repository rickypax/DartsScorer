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
    IonToolbar,
    useIonToast
} from '@ionic/react';
import { useState } from 'react';
import { home as homeIcon, sparkles as sparklesIcon } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const Game: React.FC = () => {
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [player1Score, setPlayer1Score] = useState(501);
    const [player2Score, setPlayer2Score] = useState(501);
    const [currentScore, setCurrentScore] = useState(0);
    const [currentScoreArray, setCurrentScoreArray] = useState([]);
    const [currentScoreString, setCurrentScoreString] = useState('');
    const [winToast] = useIonToast();
    const [errorToast] = useIonToast();
    const history = useHistory();
    const possibleLetters = ['T', 'D', 'S'];

    /**
     * Manages the score calculation and check if everything is ok (fist letter, second number, max 3 dart, etc)
     * @param score 
     */
    const handleScoreCreation = (score) => {
        let length = currentScoreArray.length;
        if (length >= 6) {
            // the user is trinng to set more than 3 darts
            showErrorToast("Only 3 darts!");
            return;
        }
        if (length % 2 == 0) {
            // must be a letter
            if (!possibleLetters.includes(score)) {
                showErrorToast("It must be a letter!");
                return;
            }
        } else {
            // must be a number
            if (typeof score != 'number') {
                showErrorToast("It must be a number!");
                return;
            }
        }
        currentScoreArray.push(score)
        setCurrentScoreArray(currentScoreArray);
        if (length % 2 != 0) {
            // calc the current score only we have a set of letter-number
            let calcScore = 0;
            currentScoreArray.forEach((value, index) => {
                switch (value) {
                    case 'T':
                        // TRIPLE
                        calcScore = calcScore + 3 * parseInt(currentScoreArray[index + 1]);
                        break;
                    case 'D':
                        // DOUBLE
                        calcScore = calcScore + 2 * parseInt(currentScoreArray[index + 1]);
                        break;
                    case 'S':
                        // SINGLE
                        calcScore = calcScore + + parseInt(currentScoreArray[index + 1]);
                        break;
                }
                console.log(calcScore);
            })
            // save current score
            setCurrentScore(calcScore);
        }
        // creating the string of the current score
        currentScoreArrayToString();
        //console.log(currentScoreArray);
    }

    const showWinToast = (playernumber) => {
        winToast({
            message: "Player " + playernumber + " wins!",
            duration: 0,
            icon: sparklesIcon,
            position: 'middle',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ],
        });
    };

    /**
     * Creates the score string from the score array of values
     */
    const currentScoreArrayToString = () => {
        let toString = '';
        currentScoreArray.forEach((value, index) => {
            if (index % 2 == 0 && index != 0) {
                // every 2 value is a new dart, so we concat with a '+'
                toString = toString + '+';
            }
            toString = toString + value;
        });

        setCurrentScoreString(toString);
    }

    /**
     * Launch a toast with the given message
     * @param msg string message of the error
     */
    const showErrorToast = (msg) => {
        errorToast({
            message: "Error! " + msg,
            duration: 2000,
            position: 'middle',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ],
        });
    };

    const handleConfirmScore = (confirm) => {
        if (confirm) {
            // button 'OK' is pressed
            var dartsNumber = (currentScoreArray.length / 2);
            console.log("Current player: " + currentPlayer);
            console.log("Number of darts: " + dartsNumber);

            let score = 0;
            currentScoreArray.forEach((value, index) => {
                // we are considering only the letters and make the score calc with the next index of the score array
                console.log(value);
                switch (value) {
                    case 'T':
                        // TRIPLE
                        score = score + 3 * parseInt(currentScoreArray[index + 1]);
                        break;
                    case 'D':
                        // DOUBLE
                        score = score + 2 * parseInt(currentScoreArray[index + 1]);
                        break;
                    case 'S':
                        // SINGLE
                        score = score + + parseInt(currentScoreArray[index + 1]);
                        break;
                }
                console.log(score);
            })
            // save current score
            setCurrentScore(score);

            if (dartsNumber === 3) {
                // 3 darts are used, so i can save the score and check if the game is ended
                if (currentPlayer === 1) {
                    // PLAYER 1
                    if (player1Score - score < 0) {
                        showErrorToast("You can't go on negative score!");
                        return;
                    }
                    if (player1Score - score === 0) {
                        console.log('WIN');
                        history.push('/gameend/1');
                        //showWinToast(1);
                    }
                    // saving the new score
                    setPlayer1Score(player1Score - score);
                    // passing the turn to the next player
                    setCurrentPlayer(2);
                } else if (currentPlayer === 2) {
                    // PLAYER 2
                    if (player2Score - score < 0) {
                        showErrorToast("You can't go on negative score!");
                        return;
                    }
                    if (player2Score - score === 0) {
                        console.log('WIN');
                        history.push('/gameend/2');
                        //showWinToast(2);
                    }
                    // saving the new score
                    setPlayer2Score(player2Score - score);
                    // passing the turn to the next player
                    setCurrentPlayer(1);
                }

                // resetting the current score array, string and value
                setCurrentScoreArray([]);
                setCurrentScoreString('');
                setCurrentScore(0);
            }
        } else {
            // button 'CANCEL' is pressed
            setCurrentScoreArray([]);
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
                            <IonButton size="large" color="success" expand="full" onClick={() => handleConfirmScore(true)}>OK</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton size="large" color="danger" expand="full" onClick={() => handleConfirmScore(false)}>Cancel</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Game;
