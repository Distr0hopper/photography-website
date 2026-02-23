<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Destination } from '$lib/api/notion';

	interface Props {
		destinations: Destination[];
		destinationBase: string; // e.g. "vietnam" — used to build the link
	}

	let { destinations, destinationBase }: Props = $props();

	let mapEl: HTMLElement;
	let map: import('leaflet').Map | null = null;

	const stops = $derived(destinations.filter((d) => d.lat !== null && d.lon !== null));

	onMount(async () => {
		if (stops.length === 0) return;

		const L = (await import('leaflet')).default;
		// Leaflet CSS — loaded once via dynamic import to avoid SSR issues
		await import('leaflet/dist/leaflet.css');

		map = L.map(mapEl, {
			zoomControl: false,
			attributionControl: false
		});

		// Dark CartoDB tiles — no API key needed
		L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
			attribution: '© <a href="https://www.openstreetmap.org/copyright">OSM</a> © <a href="https://carto.com/">CartoDB</a>',
			maxZoom: 19
		}).addTo(map);

		// Subtle attribution in bottom-right
		L.control.attribution({ position: 'bottomright', prefix: false }).addTo(map);

		// Draw route line connecting stops in order
		const routeCoords: [number, number][] = stops.map((d) => [d.lat!, d.lon!]);
		L.polyline(routeCoords, {
			color: '#34d399',
			weight: 2,
			opacity: 0.5,
			dashArray: '6 8'
		}).addTo(map);

		// Add numbered markers
		stops.forEach((dest) => {
			const label = dest.nr ?? '';
			const icon = L.divIcon({
				html: `
					<div style="
						width: 32px; height: 32px;
						border-radius: 50%;
						background: #34d399;
						border: 2px solid #065f46;
						display: flex; align-items: center; justify-content: center;
						font-size: 11px; font-weight: 700; color: #022c22;
						box-shadow: 0 2px 8px rgba(0,0,0,0.6);
						cursor: pointer;
					">${label}</div>`,
				className: '',
				iconSize: [32, 32],
				iconAnchor: [16, 16],
				popupAnchor: [0, -18]
			});

			const popup = L.popup({
				className: 'map-popup',
				closeButton: false,
				offset: [0, -4]
			}).setContent(`
				<a href="/destinations/${destinationBase}/${dest.slug}"
				   style="display:block; padding: 8px 12px; text-decoration:none; color: inherit;">
					<div style="font-size:11px; color:#34d399; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:2px;">
						Stop ${dest.nr ?? ''}
					</div>
					<div style="font-size:14px; font-weight:700; color:#fff;">
						${dest.name}
					</div>
					${dest.nights ? `<div style="font-size:12px; color:#a3a3a3; margin-top:2px;">${dest.nights} nights${dest.transport ? ' · ' + dest.transport : ''}</div>` : ''}
				</a>
			`);

			L.marker([dest.lat!, dest.lon!], { icon }).bindPopup(popup).addTo(map!);
		});

		// Fit map to all markers with padding
		map.fitBounds(L.latLngBounds(routeCoords), { padding: [48, 48] });
	});

	onDestroy(() => {
		map?.remove();
	});
</script>

<div class="relative h-[560px] w-full overflow-hidden rounded-2xl md:h-[640px]">
	{#if stops.length === 0}
		<div class="flex h-full items-center justify-center bg-neutral-900">
			<p class="text-sm text-neutral-500">No location data available.</p>
		</div>
	{:else}
		<div bind:this={mapEl} class="h-full w-full"></div>
	{/if}
</div>

<style>
	/* Override Leaflet popup chrome to match the dark theme */
	:global(.map-popup .leaflet-popup-content-wrapper) {
		background: #171717;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 12px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
		padding: 0;
		overflow: hidden;
	}
	:global(.map-popup .leaflet-popup-content) {
		margin: 0;
	}
	:global(.map-popup .leaflet-popup-tip-container) {
		display: none;
	}
	:global(.leaflet-attribution-flag) {
		display: none !important;
	}
	:global(.leaflet-control-attribution) {
		background: rgba(0, 0, 0, 0.4) !important;
		color: #525252 !important;
		font-size: 10px !important;
		backdrop-filter: blur(4px);
		border-radius: 6px 0 0 0 !important;
	}
	:global(.leaflet-control-attribution a) {
		color: #737373 !important;
	}
</style>
