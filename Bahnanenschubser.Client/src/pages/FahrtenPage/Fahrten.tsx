import {
    IonContent,
    IonPage,
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,
} from '@ionic/react';
import React from 'react';
import './Fahrten.css';
import IFahrtenViewModel from "../../viewmodels/IFahrtenViewModel";
import SingleFahrt from "./SingleFahrt";
import {Divider, Grid} from '@material-ui/core';
import {observer} from "mobx-react";
import {reaction} from "mobx";

type Props = {
    viewModel: IFahrtenViewModel;
    originLocation: string;
    destinationLocation: string;
    forward: (to: string) => void;
}

type State = {
    continue: boolean;
    loading: boolean;
}

@observer
export default class Fahrten extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            continue: false,
            loading: false
        }
    }

    componentDidMount() {
        this.setState({loading: true});
        try {
            this.props.viewModel.search(this.props.originLocation, this.props.destinationLocation);
        } catch (ex) {
            // TODO: Modal for errors.
            console.error('Exception while loading', ex);
        } finally {
            this.setState({loading: false});
        }

        reaction(() => this.props.viewModel.fahrten, (ftn) => console.log('ftn', ftn));
    }

    render(): React.ReactElement {
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
                                von <b>{this.props.originLocation}</b>
                            </Grid>
                            <Grid item xs={12}>
                                von <b>{this.props.destinationLocation}</b>
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
