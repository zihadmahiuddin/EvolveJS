import { Client } from '../Client/Client';
import { Payload } from '../Interfaces/Interfaces';
import { EVENTS } from '../Constants/Events';

export default class {
	constructor(client: Client, payload: Payload) {
		client.emit(EVENTS.CHANNEL_PINS_UPDATE, payload.d);
	}
}