import Fahrt from "../models/Fahrt";

export default interface IFahrtenProvider {
    search(originLocation: string, destinationLocation: string): Promise<Fahrt[]>
}
