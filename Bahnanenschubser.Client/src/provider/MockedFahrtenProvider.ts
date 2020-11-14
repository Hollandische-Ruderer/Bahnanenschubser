import IFahrtenProvider from "./IFahrtenProvider";
import Fahrt from "../models/Fahrt";
import faker from 'faker';

function mockFahrt(originLocation: string, destinationLocation: string): Fahrt {
    const names: string[] = ['RE', 'ICE', 'RB', 'IC'];
    return {
        id: faker.random.uuid(),
        trainNumber: names[faker.random.number(3)] + faker.random.number(999).toString(),
        delay: faker.random.number(24),
        originTime: faker.time.recent('unix').toString(),
        destinationTime: faker.time.recent('unix').toString(),
        originLocation,
        destinationLocation
    } as Fahrt
}

export default class MockedFahrtenProvider implements IFahrtenProvider {
    async search(originLocation: string, destinationLocation: string): Promise<Fahrt[]> {
        await (new Promise(resolve => {setTimeout(resolve, 1234)}));
        const count = faker.random.number(12) + 2;
        const values = [];
        for(let i = 0; i < count; i++)
            values.push(mockFahrt(originLocation, destinationLocation));

        return values;
    }
}
