import {observable} from 'mobx';
import IFahrtenViewModel from "./IFahrtenViewModel";
import Fahrt from "../models/Fahrt";
import IFahrtenProvider from "../provider/IFahrtenProvider";

export default class FahrtenViewModel implements IFahrtenViewModel {
    @observable private _fahrten: Fahrt[];
    private readonly _fahrtenProvider: IFahrtenProvider;

    constructor(fahrtenProvider: IFahrtenProvider) {
        this._fahrten = [];
        this._fahrtenProvider = fahrtenProvider;
        this._fahrtenProvider.search('Mainz', 'Stuttgart').then(r => {
            this._fahrten = r
        })
    }

    public get fahrten(): Fahrt[] {
        return this._fahrten;
    };

}
