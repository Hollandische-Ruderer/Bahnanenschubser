import {
    IonContent,
    IonPage,
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,
} from '@ionic/react';
import React from 'react';
import {Grid, Tabs, Tab, Box, Typography} from '@material-ui/core';
import {observer} from "mobx-react";
import IFeedViewModel from "../../viewmodels/IFeedViewModel";
import FeedContent from "./FeedContent";

type Props = {
    viewModel: IFeedViewModel;
}

type State = {
    continue: boolean;
    activeTab: TabViews;
}

enum TabViews {
    MELDUNGEN,
    FRAGEN
}

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

@observer
export default class FeedPage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            continue: false,
            activeTab: TabViews.MELDUNGEN
        }
    }

    render(): React.ReactElement {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Zug XY</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                        <Grid container={true} spacing={3}>
                            <Grid item xs={12}>
                                <Tabs
                                    value={this.state.activeTab}
                                    onChange={(event: React.ChangeEvent<{}>, newValue: number) => this.setState({activeTab: newValue})}
                                    variant="fullWidth"
                                >
                                    <Tab label="Meldungen" onClick={() => this.setState({activeTab: TabViews.MELDUNGEN})} />
                                    <Tab label="Fragen" onClick={() => this.setState({activeTab: TabViews.FRAGEN})}/>
                                </Tabs>
                            </Grid>
                            <Grid item xs={12} style={{padding: '10px'}}>
                                <TabPanel value={this.state.activeTab} index={TabViews.MELDUNGEN}>
                                    Meldungen
                                </TabPanel>
                                <TabPanel value={this.state.activeTab} index={TabViews.FRAGEN}>
                                    Fragen
                                </TabPanel>
                            </Grid>
                        </Grid>
                </IonContent>
            </IonPage>
        )
    }
};
