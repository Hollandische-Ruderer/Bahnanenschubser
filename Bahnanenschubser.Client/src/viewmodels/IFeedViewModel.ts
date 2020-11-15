import Feed from "../models/Feed";

export default interface IFeedViewModel {
    readonly feeds: Feed[]
    // TODO: readonly questions: Question[]
    query(trainId: string): Promise<void>;
    clear(): void;
}
