// src/lib/stores/notifications.ts
import { writable } from "svelte/store";

export const notifications = writable<{ id: number; message: string }[]>([]);

export function addNotification(message: string) {
	notifications.update((n) => [...n, { id: Date.now(), message }]);
}

// Add some example notifications
addNotification("Geyik app'e hoşgeldin!");
addNotification("Bir yeni mesajınız var.");
addNotification("Profil sayfanız güncellendi.");

