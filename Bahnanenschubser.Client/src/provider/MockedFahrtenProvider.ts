import IFahrtenProvider from "./IFahrtenProvider";
import Fahrt from "../models/Fahrt";
import faker from 'faker';
import moment from "moment";

function mockFahrt(originLocation: string, destinationLocation: string): Fahrt {
    const names: string[] = ['RE', 'ICE', 'RB', 'IC'];
    const originTime = moment().add(faker.random.number(60), 'minutes').toDate();
    return {
        id: faker.random.uuid(),
        trainNumber: names[faker.random.number(3)] + faker.random.number(999).toString(),
        delay: faker.random.number(24),
        originTime,
        destinationTime: moment(originTime).add(faker.random.number(300), 'minutes').toDate(),
        originLocation,
        destinationLocation
    } as Fahrt
}

export default class MockedFahrtenProvider implements IFahrtenProvider {
    async search(originLocation: string, destinationLocation: string): Promise<Fahrt[]> {
        await (new Promise(resolve => {setTimeout(resolve, 300 + faker.random.number(1000))}));
        const count = faker.random.number(12) + 2;
        const values = [];
        for(let i = 0; i < count; i++)
            values.push(mockFahrt(originLocation, destinationLocation));

        return values;
    }
}
