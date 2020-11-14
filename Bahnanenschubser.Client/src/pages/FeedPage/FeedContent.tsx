import React, {ReactElement} from 'react';
import {observer} from "mobx-react";
import {Grid} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import InfoIcon from '@material-ui/icons/Info';
import './FeedContent.css';

type Props = {
}

@observer
export default class FeedContent extends React.Component<Props> {
    render(): React.ReactElement {
        return (
            <Grid container spacing={0} className='FeedContent'>
                <Grid item xs={6}>
                    <AccessTimeIcon fontSize='small'/> Verspätung + 3min
                </Grid>
                <Grid item xs={6}>
                    mehr Infos <InfoIcon fontSize='small' />
                </Grid>
            </Grid>
        )
    }
};
