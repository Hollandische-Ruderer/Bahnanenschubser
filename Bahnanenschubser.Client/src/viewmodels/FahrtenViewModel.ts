import {action, computed, observable} from 'mobx';
import IFahrtenViewModel from "./IFahrtenViewModel";
import Fahrt from "../models/Fahrt";
import IFahrtenProvider from "../provider/IFahrtenProvider";

export default class FahrtenViewModel implements IFahrtenViewModel {
    @observable private _fahrten: Fahrt[];
    private readonly _fahrtenProvider: IFahrtenProvider;

    constructor(fahrtenProvider: IFahrtenProvider) {
        this._fahrten = [];
        this._fahrtenProvider = fahrtenProvider;
    }

    public get fahrten(): Fahrt[] {
        return this._fahrten;
    };

    @action
    async search(originLocation: string, destinationLocation: string): Promise<void> {
        this._fahrten = await this._fahrtenProvider.search(originLocation, destinationLocation);
    }

}
