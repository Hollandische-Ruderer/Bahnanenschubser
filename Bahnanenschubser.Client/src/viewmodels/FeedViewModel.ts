import {action, observable} from 'mobx';
import IFeedViewModel from "./IFeedViewModel";
import Feed from "../models/Feed";
import IFeedProvider from "../provider/IFeedProvider";

export default class FeedViewModel implements IFeedViewModel {
    private readonly _feedProvider: IFeedProvider;
    @observable private _feeds: Feed[];

    constructor(feedProvider: IFeedProvider) {
        this._feedProvider = feedProvider;
        this._feeds = [];
    }

    public get feeds(): Feed[] {
        return this._feeds;
    };

    async query(trainId: string): Promise<void> {
        this._feeds = await this._feedProvider.feeds(trainId);
    }

    @action
    clear(): void {
        this._feeds = [];
    }

}
