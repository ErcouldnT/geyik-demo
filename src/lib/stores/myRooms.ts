// src/lib/stores/myRooms.ts
import { writable } from "svelte/store";

export const myRooms = writable<string[]>([]);

export function addRoom(room: string) {
	myRooms.update((rooms) => {
		if (!rooms.includes(room)) {
			return [...rooms, room];
		}
		return rooms;
	});
}
