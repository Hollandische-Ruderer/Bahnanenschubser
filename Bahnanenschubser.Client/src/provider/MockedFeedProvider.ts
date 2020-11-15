import IFeedProvider from "./IFeedProvider";
import Feed from "../models/Feed";
import faker from "faker";
import moment from "moment";

const meldungsTexte = ['Lärm', 'Verschmutzung', 'Klimaanlage defekt', 'Heizung defekt', 'Beleuchtung defekt', 'Toilette defekt'];

function mockFeed(trainId: string) {
    return {
        id: faker.random.uuid(),
        title: meldungsTexte[Math.floor(Math.random() * meldungsTexte.length)],
        description: faker.lorem.words(faker.random.number(15) + 10),
        confirmation: Array.from({length: faker.random.number(7) + 1}).map(() => moment().add(-1 * faker.random.number(300), 'minutes').toDate())
    } as Feed;
}

export default class MockedFeedProvider implements IFeedProvider {
    async feeds(trainId: string): Promise<Feed[]> {
        await (new Promise(resolve => {setTimeout(resolve, 300 + faker.random.number(1000))}));
        const values = [];
        const count = faker.random.number(5) + 1;
        for(let i = 0; i < count; i++)
            values.push(mockFeed(trainId));

        return values;
    }
}
