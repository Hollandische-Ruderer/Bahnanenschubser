import React from 'react';
import './Fahrten.css';
import Fahrt from "../../models/Fahrt";
import {Grid, Paper} from "@material-ui/core";
import moment from "moment";

type Props = {
    fahrt: Fahrt;
}


export default class SingleFahrt extends React.Component<Props> {
    render(): React.ReactElement {
        return (
            <Paper elevation={3} style={{padding: '10px'}}>
                <Grid container={true} spacing={2}>
                    <Grid item xs={3}>
                        {moment(this.props.fahrt.originTime).format('HH:mm')}
                    </Grid>
                    <Grid item xs={5}>
                        {this.props.fahrt.originLocation}
                    </Grid>
                    <Grid item xs={4} style={{textAlign: 'right'}}>
                        {this.props.fahrt.trainNumber} >>
                    </Grid>
                    <Grid item xs={3}>
                        {moment(this.props.fahrt.destinationTime).format('HH:mm')}
                    </Grid>
                    <Grid item xs={5}>
                        {this.props.fahrt.destinationLocation}
                    </Grid>
                </Grid>
            </Paper>
        )
    }
};
