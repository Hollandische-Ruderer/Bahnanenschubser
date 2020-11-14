export default interface Fahrt {
    id: string;
    originLocation: string;
    originTime: string;
    destinationLocation: string;
    destinationTime: string;
    trainNumber: string;
    delay: number;
}
