export default interface Fahrt {
    id: string;
    originLocation: string;
    originTime: Date;
    destinationLocation: string;
    destinationTime: Date;
    trainNumber: string;
    delay: number;
}
