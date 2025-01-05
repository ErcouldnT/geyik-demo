import { writable } from "svelte/store";
import { supabase } from "$lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

export const user = writable<User | null>(null);

async function initializeUser() {
	// İlk yüklemede oturum durumunu kontrol et
	const {
		data: { session }
	} = await supabase.auth.getSession();
	if (session) {
		user.set(session.user);
	} else {
		user.set(null);
	}

	// Oturum durumunu dinle
	supabase.auth.onAuthStateChange((event, session) => {
		if (session) {
			user.set(session.user);
		} else {
			user.set(null);
		}
	});
}

initializeUser();
