import IFahrtenProvider from "./IFahrtenProvider";
import Fahrt from "../models/Fahrt";
import faker from 'faker';

function mockFahrt(originLocation: string, destinationLocation: string): Fahrt {
    console.log("shihklsd mock", originLocation, destinationLocation);
    return {
        id: faker.random.uuid(),
        trainNumber: (1000000000000 - faker.random.number(100000000000)).toString(10),
        delay: faker.random.number(24),
        originTime: faker.time.recent().toString(),
        destinationTime: faker.time.recent().toString(),
        originLocation,
        destinationLocation
    } as Fahrt
}

// @ts-ignore
window.fn = mockFahrt;

export default class MockedFahrtenProvider implements IFahrtenProvider {
    async search(originLocation: string, destinationLocation: string): Promise<Fahrt[]> {
        await (new Promise(resolve => {setTimeout(resolve, 1234)}));
        const count = faker.random.number(12);
        const values = [];
        for(let i = 0; i < count; i++)
            values.push(mockFahrt(originLocation, destinationLocation));

        return values;
    }
}
