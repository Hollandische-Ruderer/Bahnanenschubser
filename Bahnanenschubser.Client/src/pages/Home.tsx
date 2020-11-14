import {
    IonButton,
    IonButtons, IonCol,
    IonContent,
    IonGrid,
    IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonList,
    IonMenuButton,
    IonPage,
    IonRow, IonSegment, IonSegmentButton,
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
import {Redirect} from "react-router";

enum Tabs {
    Fahrt = "Fahrt",
    Haltestelle = "Haltestelle"
}

type Props = {
    viewmodel: IHomeViewModel
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
        if(this.state.continue)
            return <Redirect to={'/Fahrten'} />
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
                                    this.props.viewmodel.search();
                                    this.setState({continue: true});
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
