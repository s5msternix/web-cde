<script>
	import { enhance } from '$app/forms';
	import { palettes } from '$lib/theme.js';

	let { wm, win, onthemechange } = $props();
	let currentPalette = $state('default');
	$effect(() => {
		if (win.props?.currentPalette) currentPalette = win.props.currentPalette;
	});
	let previewPalette = $state(null);

	const paletteKeys = Object.keys(palettes);

	function applyTheme() {
		onthemechange?.(currentPalette);
		return async () => {};
	}

	function handlePreview(key) {
		previewPalette = key;
	}

	function handlePreviewEnd() {
		previewPalette = null;
	}

	let displayPalette = $derived(previewPalette ?? currentPalette);
</script>

<div class="style-manager">
	<div class="sm-header">
		<h3>Stil Yöneticisi</h3>
		<p>Masaüstü renk paletini seçin</p>
	</div>

	<div class="sm-palettes">
		{#each paletteKeys as key}
			{@const pal = palettes[key]}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="sm-palette-item"
				class:selected={currentPalette === key}
				onclick={() => (currentPalette = key)}
				onmouseenter={() => handlePreview(key)}
				onmouseleave={handlePreviewEnd}
			>
				<div class="sm-palette-preview">
					<div class="sm-color" style="background:{pal.bg}"></div>
					<div class="sm-color" style="background:{pal.activeTitle}"></div>
					<div class="sm-color" style="background:{pal.desktop}"></div>
					<div class="sm-color" style="background:{pal.bgLight}"></div>
					<div class="sm-color" style="background:{pal.highlight}"></div>
				</div>
				<div class="sm-palette-name">{pal.name}</div>
			</div>
		{/each}
	</div>

	<!-- Preview of the selected palette -->
	<div class="sm-preview-section">
		<div class="sm-preview-label">Önizleme:</div>
		<div class="sm-preview-window" style="
			background:{palettes[displayPalette].bg};
			border-color:{palettes[displayPalette].bgLight};
		">
			<div class="sm-preview-title" style="background:{palettes[displayPalette].activeTitle};color:{palettes[displayPalette].activeTitleText}">
				Pencere Başlığı
			</div>
			<div class="sm-preview-body" style="background:{palettes[displayPalette].desktop}">
				<div class="sm-preview-text" style="color:{palettes[displayPalette].textLight}">
					Masaüstü
				</div>
			</div>
		</div>
	</div>

	<div class="sm-actions">
		<form method="POST" action="/api/system" use:enhance={applyTheme}>
			<input type="hidden" name="action" value="theme" />
			<input type="hidden" name="palette" value={currentPalette} />
			<button type="submit" class="sm-btn primary">Uygula</button>
		</form>
		<button class="sm-btn" onclick={() => wm.closeWindow(win.id)}>İptal</button>
	</div>
</div>

<style>
	.style-manager {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 12px;
		gap: 12px;
		font-family: 'Helvetica', 'Arial', sans-serif;
		font-size: 12px;
		color: var(--cde-text);
	}

	.sm-header h3 {
		margin: 0;
		font-size: 14px;
	}

	.sm-header p {
		margin: 4px 0 0;
		font-size: 11px;
		opacity: 0.7;
	}

	.sm-palettes {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 8px;
	}

	.sm-palette-item {
		padding: 8px;
		border: 2px outset var(--cde-bg-light);
		background: var(--cde-bg);
		cursor: pointer;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.sm-palette-item.selected {
		border: 2px inset var(--cde-highlight);
		background: var(--cde-bg-light);
	}

	.sm-palette-item:hover {
		background: var(--cde-bg-light);
	}

	.sm-palette-preview {
		display: flex;
		gap: 2px;
		height: 20px;
	}

	.sm-color {
		flex: 1;
		border: 1px solid rgba(0, 0, 0, 0.3);
	}

	.sm-palette-name {
		font-size: 11px;
		text-align: center;
		font-weight: bold;
	}

	.sm-preview-section {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.sm-preview-label {
		font-size: 11px;
		font-weight: bold;
	}

	.sm-preview-window {
		flex: 1;
		border: 2px outset;
		display: flex;
		flex-direction: column;
		min-height: 60px;
	}

	.sm-preview-title {
		padding: 3px 8px;
		font-size: 11px;
		font-weight: bold;
		text-align: center;
	}

	.sm-preview-body {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.sm-preview-text {
		font-size: 12px;
	}

	.sm-actions {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
	}

	.sm-btn {
		padding: 6px 16px;
		font-size: 12px;
		font-family: 'Helvetica', 'Arial', sans-serif;
		background: var(--cde-bg);
		border: 2px outset var(--cde-bg-light);
		color: var(--cde-text);
		cursor: pointer;
	}

	.sm-btn:active {
		border-style: inset;
	}

	.sm-btn.primary {
		background: var(--cde-bg-light);
		font-weight: bold;
	}
</style>
