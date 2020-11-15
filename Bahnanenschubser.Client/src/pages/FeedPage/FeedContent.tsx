import React from 'react';
import {observer} from "mobx-react";
import {Card,  CardContent, Typography} from "@material-ui/core";
import './FeedContent.css';
import Feed from "../../models/Feed";
import moment from "moment";

type Props = {
    feed: Feed
}

@observer
export default class FeedContent extends React.Component<Props> {
    render(): React.ReactElement {
        return (
            <Card elevation={3} style={{marginBottom: '10px'}}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {this.props.feed.title}
                    </Typography>
                    <Typography color="textSecondary">
                        {this.props.feed.confirmation.length}x gemeldet, zuletzt {moment(this.props.feed.confirmation[this.props.feed.confirmation.length - 1]).format('DD.MM. HH:mm')}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {this.props.feed.description}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
};
