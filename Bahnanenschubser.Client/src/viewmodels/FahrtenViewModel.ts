import {action, observable} from 'mobx';
import IFahrtenViewModel from "./IFahrtenViewModel";
import Fahrt from "../models/Fahrt";

export default class FahrtenViewModel implements IFahrtenViewModel {
    @observable private readonly _fahrten: Fahrt[];

    constructor() {
        this._fahrten = [];
    }

    public get fahrten(): Fahrt[] {
        return this._fahrten;
    };

}
