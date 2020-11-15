import Feed from "../models/Feed";

export default interface IFeedProvider {
    feeds(trainId: string): Promise<Feed[]>;
}
