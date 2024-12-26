<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';
  import { user } from '$lib/stores/user';
  import { writable } from 'svelte/store';

  let rooms = writable<any[]>([]);
  let errorMessage = writable('');

  async function getAllRooms() {
    const currentUser = $user;
    if (!currentUser) {
      errorMessage.set('You must be logged in to view rooms.');
      return;
    }

    // Kullanıcının içinde bulunmadığı odaları al
    const { data: allRooms, error: roomsError } = await supabase
      .from('rooms')
      .select('*')
      .neq('admin_id', currentUser.id);

    if (roomsError) {
      errorMessage.set(`Error fetching rooms: ${roomsError.message}`);
      console.error('Error fetching rooms:', roomsError);
      return;
    }

    // Kullanıcının bağlı bulunduğu odaların kimliklerini al
    const { data: userData, error: userError } = await supabase
      .from('user_data')
      .select('joined_rooms')
      .eq('user_id', currentUser.id)
      .single();

    if (userError) {
      errorMessage.set(`Error fetching user data: ${userError.message}`);
      console.error('Error fetching user data:', userError);
      return;
    }

    // Kullanıcının içinde bulunmadığı odaları filtrele
    const filteredRooms = allRooms.filter(
      (room) => !userData.joined_rooms.includes(room.id)
    );

    rooms.set(filteredRooms);
  }

	async function connectToRoom(roomId: string) {
    const currentUser = $user;
    if (!currentUser) {
      errorMessage.set('You must be logged in to join a room.');
      return;
    }

    // Kullanıcının bağlı bulunduğu odaların kimliklerini al
    const { data: userData, error: userError } = await supabase
      .from('user_data')
      .select('joined_rooms')
      .eq('user_id', currentUser.id)
      .single();

    if (userError) {
      errorMessage.set(`Error fetching user data: ${userError.message}`);
      console.error('Error fetching user data:', userError);
      return;
    }

    // Odaya katıl
    const updatedJoinedRooms = [...userData.joined_rooms, roomId];
    const { error: updateError } = await supabase
      .from('user_data')
      .update({ joined_rooms: updatedJoinedRooms })
      .eq('user_id', currentUser.id);

    if (updateError) {
      errorMessage.set(`Error joining room: ${updateError.message}`);
      console.error('Error joining room:', updateError);
    } else {
      errorMessage.set('');
      getAllRooms(); // Odaları yeniden yükle
    }
  }

  onMount(() => {
    getAllRooms();
  });
</script>

<div class="max-w-md flex flex-col mx-auto mt-10 p-6 rounded-lg shadow-md">
  <h2 class="mb-4 opacity-50">Keşfet</h2>
  <ul class="list-none p-0">
    {#each $rooms as room}
      <li class="py-2">
        <p>{room.name}</p>
        <button
          on:click={() => connectToRoom(room.id)}
          class="mt-2 py-1 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Katıl
        </button>
      </li>
    {/each}
  </ul>
  {#if $errorMessage}
    <p class="text-red-500 mt-4">{$errorMessage}</p>
  {/if}
</div>
