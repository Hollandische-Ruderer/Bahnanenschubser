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
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import './Home.css';
import ExploreContainer from '../components/ExploreContainer';

enum Tabs {
    Fahrt = "Fahrt",
    Haltestelle = "Haltestelle"
}

const Home: React.FC = () => {

    const { name } = useParams<{ name: string; }>();
    const [ activeTab , setActiveTab ] = useState<Tabs>();

    // TODO: Vlt. ViewModel?!?
    const [ startLocation, setStartLocation ] = useState<string>();
    const [ endLocation, setEndLocation ] = useState<string>();
    const [ trainNumber, setTrainNumber ] = useState<string>();
    const [ station, setStation ] = useState<string>();

    useEffect(() => {
        setActiveTab(Tabs.Fahrt);
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ExploreContainer>
                    <IonGrid>
                        <IonRow>
                            <IonSegment value={activeTab} onIonChange={(change) => {setActiveTab(change.detail.value as Tabs)}}>
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
                        { activeTab === Tabs.Fahrt &&
                        <IonRow>
                            <IonList>
                                <IonItem>
                                    <IonLabel position='floating'>Von</IonLabel>
                                    <IonInput autofocus={true}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position='floating'>Bis</IonLabel>
                                    <IonInput/>
                                </IonItem>
                                <IonItemDivider>oder</IonItemDivider>
                                <IonItem>
                                    <IonLabel position='floating'>Zugnummer</IonLabel>
                                    <IonInput/>
                                </IonItem>
                            </IonList>
                        </IonRow>
                        }
                        { activeTab === Tabs.Haltestelle &&
                        <IonRow>
                            <IonList>
                                <IonItem>
                                    <IonLabel position='floating'>Haltestelle</IonLabel>
                                    <IonInput/>
                                </IonItem>
                            </IonList>
                        </IonRow>
                        }
                        <IonButton>Suchen</IonButton>
                    </IonGrid>
                </ExploreContainer>
            </IonContent>
        </IonPage>
    );
};

export default Home;
