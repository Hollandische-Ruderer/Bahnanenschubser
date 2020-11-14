import {
    IonContent,
    IonPage,
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,
} from '@ionic/react';
import React from 'react';
import './Fahrten.css';
import {Redirect} from "react-router";
import IFahrtenViewModel from "../../viewmodels/IFahrtenViewModel";
import SingleFahrt from "./SingleFahrt";
import {Divider, Grid} from '@material-ui/core';
import {observer} from "mobx-react";

type Props = {
    viewModel: IFahrtenViewModel;
}

type State = {
    continue: boolean;
}

@observer
export default class Fahren extends React.Component<Props, State> {

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
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Fahrtenauswahl</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <div style={{padding: '10px'}}>
                        <Grid container={true} spacing={3}>
                            <Grid item xs={12}>
                                von <b>Mainz</b>
                            </Grid>
                            <Grid item xs={12}>
                                von <b>Stuttgart</b>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider variant='middle'/>
                            </Grid>
                            <Grid item xs={12}>
                                Fahrt/Zug/Bus auswählen
                            </Grid>
                            {this.props.viewModel.fahrten.map((fahrt) =>
                                <Grid item xs={12} key={fahrt.id}>
                                    <SingleFahrt fahrt={fahrt} />
                                </Grid>
                            )}
                        </Grid>
                    </div>
                </IonContent>
            </IonPage>
        )
    }
};
