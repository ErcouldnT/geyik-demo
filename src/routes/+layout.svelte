<script lang="ts">
	import "../app.postcss";

	// Highlight JS
	import hljs from "highlight.js/lib/core";
	import "highlight.js/styles/github-dark.css";
	import { storeHighlightJs } from "@skeletonlabs/skeleton";
	import xml from "highlight.js/lib/languages/xml"; // for HTML
	import css from "highlight.js/lib/languages/css";
	import javascript from "highlight.js/lib/languages/javascript";
	import typescript from "highlight.js/lib/languages/typescript";

	hljs.registerLanguage("xml", xml); // for HTML
	hljs.registerLanguage("css", css);
	hljs.registerLanguage("javascript", javascript);
	hljs.registerLanguage("typescript", typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
	import { storePopup } from "@skeletonlabs/skeleton";
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import NavBar from "$lib/components/Layout/NavBar.svelte";
	import Footer from "$lib/components/Layout/Footer.svelte";
	import Announcement from "$lib/components/Layout/Announcement.svelte";
</script>

<svelte:head>
	<title>Geyik app</title>
</svelte:head>

<main class="m-5 max-w-screen-lg mx-auto space-y-5 p-2">
	<Announcement message="Geliştirme sürümü" type="warning" />
	<NavBar />
	<div>
		<slot />
	</div>
	<Footer />
</main>
