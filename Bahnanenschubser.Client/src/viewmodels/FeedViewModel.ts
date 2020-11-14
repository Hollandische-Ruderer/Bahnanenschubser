import {observable} from 'mobx';
import IFeedViewModel from "./IFeedViewModel";
import Feed from "../models/Feed";

export default class FeedViewModel implements IFeedViewModel {
    @observable private _feeds: Feed[];

    constructor() {
        this._feeds = [];
    }

    public get feeds(): Feed[] {
        return this._feeds;
    };

}
