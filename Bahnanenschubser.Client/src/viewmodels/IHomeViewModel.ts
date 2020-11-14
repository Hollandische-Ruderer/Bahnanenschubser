export default interface IHomeViewModel {
    readonly origin: string;
    readonly destination: string;
    readonly trainNumber: string;
    readonly station: string;
    setOrigin(origin: string): void;
    setDestination(destination: string): void;
    setTrainNumber(number: string): void;
    setStation(station: string): void;
    search(originLocation: string, destinationLocation: string): void;
}
