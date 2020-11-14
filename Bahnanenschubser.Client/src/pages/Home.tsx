import {
    IonButton,
    IonButtons,
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

enum Tabs {
    Fahrt = "Fahrt",
    Haltestelle = "Haltestelle"
}

type Props = {
    viewmodel: IHomeViewModel
};

type State = {
    activeTab: Tabs;
}

@observer
export default class Home extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            activeTab: Tabs.Fahrt
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
                        <IonGrid>
                            <IonRow>
                                <IonSegment value={this.state.activeTab} onIonChange={(change) => {
                                    this.setState({
                                        activeTab: change.detail.value as Tabs
                                    })
                                }}>
                                    <IonSegmentButton value={Tabs.Fahrt}>
                                        <IonLabel>
                                            Fahrt
                                        </IonLabel>
                                    </IonSegmentButton>
                                    <IonSegmentButton value={Tabs.Haltestelle}>
                                        <IonLabel>
                                            Haltestelle
                                        </IonLabel>
                                    </IonSegmentButton>
                                </IonSegment>
                            </IonRow>
                            {this.state.activeTab === Tabs.Fahrt &&
                            <IonRow>
                                <IonList>
                                    <IonItem>
                                        <IonLabel position='floating'>Von</IonLabel>
                                        <IonInput autofocus={true} value={this.props.viewmodel.origin}
                                                  onIonChange={(v) => this.props.viewmodel.setOrigin(v.detail.value!)}/>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position='floating'>Bis</IonLabel>
                                        <IonInput value={this.props.viewmodel.destination}
                                                  onIonChange={(v) => this.props.viewmodel.setDestination(v.detail.value!)}/>
                                    </IonItem>
                                    <IonItemDivider>oder</IonItemDivider>
                                    <IonItem>
                                        <IonLabel position='floating'>Zugnummer</IonLabel>
                                        <IonInput value={this.props.viewmodel.trainNumber}
                                                  onIonChange={(v) => this.props.viewmodel.setTrainNumber(v.detail.value!)}/>
                                    </IonItem>
                                </IonList>
                                <IonLabel>Test{this.props.viewmodel.origin} </IonLabel>
                            </IonRow>
                            }
                            {this.state.activeTab === Tabs.Haltestelle &&
                            <IonRow>
                                <IonList>
                                    <IonItem>
                                        <IonLabel position='floating'>Haltestelle</IonLabel>
                                        <IonInput value={this.props.viewmodel.station}
                                                  onIonChange={(v) => this.props.viewmodel.setStation(v.detail.value!)}/>
                                    </IonItem>
                                </IonList>
                            </IonRow>
                            }
                            <IonButton onClick={() => this.props.viewmodel.search()}>Suchen</IonButton>
                        </IonGrid>
                    </ExploreContainer>
                </IonContent>
            </IonPage>
        )
    }
};
