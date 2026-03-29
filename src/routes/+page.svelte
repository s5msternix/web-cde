<script>
	import { getWm } from '$lib/stores/wm.svelte.js';
	import { palettes } from '$lib/theme.js';
	import CdeWindow from '$lib/components/CdeWindow.svelte';
	import FrontPanel from '$lib/components/FrontPanel.svelte';
	import Desktop from '$lib/components/Desktop.svelte';
	import ContextMenu from '$lib/components/ContextMenu.svelte';
	import LockScreen from '$lib/components/LockScreen.svelte';
	import FileManager from '$lib/apps/FileManager.svelte';
	import TextEditor from '$lib/apps/TextEditor.svelte';
	import Terminal from '$lib/apps/Terminal.svelte';
	import StyleManager from '$lib/apps/StyleManager.svelte';
	import HelpViewer from '$lib/apps/HelpViewer.svelte';
	import MailApp from '$lib/apps/MailApp.svelte';
	import Calculator from '$lib/apps/Calculator.svelte';

	let { data } = $props();

	const wm = getWm();

	let locked = $state(false);
	let showExitDialog = $state(false);
	let currentPalette = $state('default');

	function applyPalette(key) {
		const pal = palettes[key];
		if (!pal) return;
		currentPalette = key;
		const root = document.body;
		root.style.setProperty('--cde-bg', pal.bg);
		root.style.setProperty('--cde-bg-light', pal.bgLight);
		root.style.setProperty('--cde-bg-dark', pal.bgDark);
		root.style.setProperty('--cde-bg-deep', pal.bgDeep);
		root.style.setProperty('--cde-text', pal.text);
		root.style.setProperty('--cde-text-light', pal.textLight);
		root.style.setProperty('--cde-active-title', pal.activeTitle);
		root.style.setProperty('--cde-active-title-text', pal.activeTitleText);
		root.style.setProperty('--cde-inactive-title', pal.inactiveTitle);
		root.style.setProperty('--cde-inactive-title-text', pal.inactiveTitleText);
		root.style.setProperty('--cde-panel', pal.panel);
		root.style.setProperty('--cde-panel-dark', pal.panelDark);
		root.style.setProperty('--cde-panel-light', pal.panelLight);
		root.style.setProperty('--cde-highlight', pal.highlight);
		root.style.setProperty('--cde-desktop', pal.desktop);
		root.style.setProperty('--cde-select', pal.select);
		root.style.setProperty('--cde-select-text', pal.selectText);
	}

	function handleThemeChange(key) {
		applyPalette(key);
	}

	function handleLock() {
		locked = true;
	}

	function handleUnlock() {
		locked = false;
	}

	function handleExit() {
		showExitDialog = true;
	}

	function confirmExit() {
		showExitDialog = false;
		while (wm.windows.length > 0) {
			wm.closeWindow(wm.windows[0].id);
		}
	}
</script>

<div class="cde-desktop-root">
	{#if locked}
		<LockScreen onunlock={handleUnlock} />
	{/if}

	<!-- Desktop area -->
	<Desktop {wm} desktopIcons={data.desktopIcons} />

	<!-- Windows -->
	{#each wm.visibleWindows as win (win.id)}
		<CdeWindow
			{win}
			isActive={wm.activeWindowId === win.id}
			onclose={() => wm.closeWindow(win.id)}
			onfocus={() => wm.focusWindow(win.id)}
			onminimize={() => wm.minimizeWindow(win.id)}
			ontoggleMaximize={() => wm.toggleMaximize(win.id)}
			onmove={(x, y) => wm.moveWindow(win.id, x, y)}
			onresize={(w, h) => wm.resizeWindow(win.id, w, h)}
		>
			{#if win.app === 'filemanager'}
				<FileManager {wm} {win} />
			{:else if win.app === 'texteditor'}
				<TextEditor {wm} {win} />
			{:else if win.app === 'terminal'}
				<Terminal {wm} {win} />
			{:else if win.app === 'stylemanager'}
				<StyleManager {wm} {win} onthemechange={handleThemeChange} />
			{:else if win.app === 'help'}
				<HelpViewer {wm} {win} />
			{:else if win.app === 'mail'}
				<MailApp {wm} {win} />
			{:else if win.app === 'calculator'}
				<Calculator {wm} {win} />
			{:else}
				<div class="unknown-app">
					<p>Bilinmeyen uygulama: {win.app}</p>
				</div>
			{/if}
		</CdeWindow>
	{/each}

	<!-- Context Menu (global) -->
	{#if wm.contextMenu}
		<ContextMenu menu={wm.contextMenu} onclose={() => wm.hideContextMenu()} />
	{/if}

	<!-- Exit Dialog -->
	{#if showExitDialog}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="dialog-overlay" onclick={() => (showExitDialog = false)}>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="exit-dialog" onclick={(e) => e.stopPropagation()}>
				<div class="exit-dialog-title">Oturumu Kapat</div>
				<div class="exit-dialog-body">
					<p>Oturumunuzu kapatmak istediğinizden emin misiniz?</p>
					<p>Kaydedilmemiş çalışmalarınız kaybolacaktır.</p>
				</div>
				<div class="exit-dialog-buttons">
					<button class="cde-btn" onclick={confirmExit}>Evet, Kapat</button>
					<button class="cde-btn" onclick={() => (showExitDialog = false)}>İptal</button>
				</div>
			</div>
		</div>
	{/if}

	<!-- Front Panel -->
	<FrontPanel {wm} onlock={handleLock} onexit={handleExit} />
</div>

<style>
	.cde-desktop-root {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		position: relative;
	}

	.unknown-app {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: var(--cde-text);
		font-size: 14px;
		padding: 20px;
	}

	.dialog-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999998;
	}

	.exit-dialog {
		background: var(--cde-bg);
		border: 2px outset var(--cde-bg-light);
		box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.5);
		min-width: 300px;
	}

	.exit-dialog-title {
		padding: 5px 12px;
		font-size: 12px;
		font-weight: bold;
		background: var(--cde-active-title);
		color: var(--cde-active-title-text);
		text-align: center;
		border-bottom: 2px groove var(--cde-bg-dark);
	}

	.exit-dialog-body {
		padding: 20px 16px;
		font-size: 12px;
		color: var(--cde-text);
		text-align: center;
	}

	.exit-dialog-body p {
		margin: 4px 0;
	}

	.exit-dialog-buttons {
		display: flex;
		justify-content: center;
		gap: 12px;
		padding: 10px 16px 16px;
	}

	.cde-btn {
		padding: 6px 20px;
		font-size: 12px;
		font-family: 'Helvetica', 'Arial', sans-serif;
		background: var(--cde-bg);
		border: 2px outset var(--cde-bg-light);
		color: var(--cde-text);
		cursor: pointer;
	}

	.cde-btn:active {
		border-style: inset;
	}

	.cde-btn:hover {
		background: var(--cde-bg-light);
	}
</style>
