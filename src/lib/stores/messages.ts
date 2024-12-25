// src/lib/stores/messages.ts
import { writable } from "svelte/store";

export const messages = writable<{ from: string; message: string }[]>([]);
