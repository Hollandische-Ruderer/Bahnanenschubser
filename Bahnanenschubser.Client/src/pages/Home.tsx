import {
    IonButtons, IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React from 'react';
import './Home.css';
import ExploreContainer from '../components/ExploreContainer';
import IHomeViewModel from "../viewmodels/IHomeViewModel";
import {observer} from "mobx-react";
import Button from '@material-ui/core/Button';
import { Grid, ButtonGroup, TextField, Divider, Typography } from '@material-ui/core';

enum Tabs {
    Fahrt = "Fahrt",
    Haltestelle = "Haltestelle"
}

type Props = {
    viewmodel: IHomeViewModel,
    forward: (to: string) => void
};

type State = {
    activeTab: Tabs;
    continue: boolean;
}

@observer
export default class Home extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            activeTab: Tabs.Fahrt,
            continue: false
        }
    }

    render(): React.ReactElement {

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton/>
                        </IonButtons>
                        <IonTitle>Home</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>

                    <ExploreContainer>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <ButtonGroup color="primary" aria-label="outlined primary button group" fullWidth={true}>
                                    <Button disabled={this.state.activeTab === Tabs.Fahrt} value={this.state.activeTab} onClick={() => {
                                        this.setState({
                                            activeTab: Tabs.Fahrt
                                    })
                                    }}>Fahrt</Button>
                                    <Button disabled={this.state.activeTab === Tabs.Haltestelle} value={this.state.activeTab} onClick={() => {
                                        this.setState({
                                            activeTab: Tabs.Haltestelle
                                        })
                                    }}>Haltestelle</Button>
                                </ButtonGroup>
                            </Grid>

                            <Grid item xs={12}>
                                {this.state.activeTab === Tabs.Fahrt &&
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField value={this.props.viewmodel.origin} onChange={(e) => this.props.viewmodel.setOrigin(e.target.value)} id="filled-basic" label="Von" variant="filled" fullWidth={true} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField value={this.props.viewmodel.destination} onChange={(e) => this.props.viewmodel.setDestination(e.target.value)} id="filled-basic" label="Bis" variant="filled" fullWidth={true}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider component='div' />
                                            <div>
                                                <Typography
                                                    color="textSecondary"
                                                    display="block"
                                                    variant="caption"
                                                >
                                                    oder
                                                </Typography>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <form noValidate autoComplete="off">
                                                <TextField value={this.props.viewmodel.trainNumber} onChange={(e) => this.props.viewmodel.setTrainNumber(e.target.value)} id="filled-basic" label="Zugnummer" variant="filled" fullWidth={true} />
                                            </form>
                                        </Grid>
                                    </Grid>
                                }
                            </Grid>

                            {this.state.activeTab === Tabs.Haltestelle &&
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <form noValidate autoComplete="off">
                                        <TextField value={this.props.viewmodel.station} onChange={(e) => this.props.viewmodel.setStation(e.target.value)} id="filled-basic" label="Zugnummer" variant="filled" fullWidth={true} />
                                    </form>
                                </Grid>
                            </Grid>
                            }

                            <Grid item xs={12}>
                                <Button fullWidth={true} onClick={() => {
                                    this.props.forward(`/fahrten/${this.props.viewmodel.origin}/${this.props.viewmodel.destination}`);
                                }} variant="contained" color="primary">
                                    Suchen
                                </Button>
                            </Grid>

                        </Grid>
                    </ExploreContainer>
                </IonContent>
            </IonPage>
        )
    }
};
