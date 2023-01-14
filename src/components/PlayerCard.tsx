import {
    IonCard,
    IonCardContent,
} from '@ionic/react';
import React from 'react';

interface Player {
    index: number,
    name: string,
    color: string
}

class PlayerCard extends React.Component {
    props;

    constructor(props){
        super(props);
        this.props = props;
    }

    render() {
        return (
            <IonCard key={this.props.index}>
                <IonCardContent>
                    {this.props.name}
                </IonCardContent>
            </IonCard>
        );
    }
};

export default PlayerCard;

