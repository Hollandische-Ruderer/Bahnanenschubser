import Fahrt from "../models/Fahrt";

export default interface IFahrtenViewModel {
    readonly fahrten: Fahrt[];

    search(originLocation: string, destinationLocation: string): Promise<void>;
    clear(): void;
}
