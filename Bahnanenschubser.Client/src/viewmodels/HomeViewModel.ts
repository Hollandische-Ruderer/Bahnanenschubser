import IHomeViewModel from "./IHomeViewModel";
import {action, observable} from 'mobx';

export default class HomeViewModel implements IHomeViewModel {
    @observable private _destination: string;
    @observable private _origin: string;
    @observable private _trainNumber: string;
    @observable private _station: string;

    constructor() {
        this._destination = '';
        this._origin = '';
        this._trainNumber = '';
        this._station = '';
    }

    @action
    public setDestination(destination: string): void {
        console.log(destination);
        this._destination = destination;
    }

    @action
    public setOrigin(origin: string): void {
        this._origin = origin;
    }

    public setTrainNumber(number: string): void {
        this._trainNumber = number;
    }

    public setStation(station: string): void {
        this._station = station;
    }

    public get destination(): string {
        return this._destination;
    }

    public get origin(): string {
        return this._origin;
    }

    public get trainNumber(): string {
        return this._trainNumber;
    }

    public get station(): string {
        return this._station;
    }

    public search(): void {
        console.log('search button not implemented! Should trigger search query');
        this._clearInputs();
    }

    private _clearInputs(): void {
        this._station = '';
        this._trainNumber = '';
        this._origin = '';
        this._destination = '';
    }

}
