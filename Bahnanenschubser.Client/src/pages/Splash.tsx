import {
    IonContent, IonImg, IonLabel,
    IonPage,
    IonGrid, IonRow, IonCol,
} from '@ionic/react';
import React from 'react';
import './Splash.css';
import image from './../assets/bahn-icon.png';
import ExploreContainer from '../components/ExploreContainer';
import {Redirect} from "react-router";
import {Button} from '@material-ui/core';

type Props = { }

type State = {
    continue: boolean;
}

export default class Splash extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            continue: false
        }
    }

    render(): React.ReactElement {
        if(this.state.continue)
            return <Redirect to={'/Home'} />

        return (
            <IonPage>
                <IonContent fullscreen>
                    <ExploreContainer>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonLabel>
                                        REISETALK
                                    </IonLabel>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonImg src={image} />
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonLabel>Willkommen bei Reisetalk!</IonLabel>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonLabel>Tausche hier Informationen mit anderen Reisenden aus.</IonLabel>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <Button fullWidth={true} onClick={() => { this.setState({continue: true}) }} variant="contained" color="primary">
                                        Loslegen
                                    </Button>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </ExploreContainer>
                </IonContent>
            </IonPage>
        )
    }
};
