<script>
	import { icons } from '$lib/icons/index.js';

	let { wm, desktopIcons = [] } = $props();

	let selectedIcon = $state(null);

	function handleDesktopClick(e) {
		if (e.target.closest('.desktop-icon')) return;
		selectedIcon = null;
		wm.hideContextMenu();
	}

	function handleContextMenu(e) {
		e.preventDefault();
		wm.showContextMenu(e.clientX, e.clientY, [
			{
				label: 'Yeni Pencere',
				items: [
					{
						label: 'Dosya Yöneticisi',
						action: () => wm.openWindow({ title: 'Dosya Yöneticisi', app: 'filemanager' })
					},
					{
						label: 'Terminal',
						action: () => wm.openWindow({ title: 'Terminal', app: 'terminal' })
					},
					{
						label: 'Metin Düzenleyici',
						action: () => wm.openWindow({ title: 'Metin Düzenleyici', app: 'texteditor' })
					}
				]
			},
			{ separator: true },
			{
				label: 'Çalışma Alanını Yenile',
				action: () => {}
			},
			{
				label: 'Simgeleri Düzenle',
				action: () => {}
			},
			{ separator: true },
			{
				label: 'Stil Yöneticisi',
				action: () => wm.openWindow({ title: 'Stil Yöneticisi', app: 'stylemanager' })
			},
			{
				label: 'Hakkında',
				action: () =>
					wm.openWindow({
						title: 'Hakkında - Web CDE',
						app: 'help',
						width: 400,
						height: 300
					})
			}
		]);
	}

	function handleIconDblClick(icon) {
		wm.openWindow({
			title: icon.title,
			app: icon.app,
			props: icon.props ?? {}
		});
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="desktop" onclick={handleDesktopClick} oncontextmenu={handleContextMenu}>
	<div class="desktop-icons">
		{#each desktopIcons as icon}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="desktop-icon"
				class:selected={selectedIcon === icon.id}
				onclick={(e) => {
					e.stopPropagation();
					selectedIcon = icon.id;
				}}
				ondblclick={() => handleIconDblClick(icon)}
			>
				<div class="icon-image">
					{@html icons[icon.icon] ?? icons.file}
				</div>
				<div class="icon-label">{icon.label}</div>
			</div>
		{/each}
	</div>

	<!-- Context Menu -->
	{#if wm.contextMenu}
		<ContextMenu menu={wm.contextMenu} onclose={() => wm.hideContextMenu()} />
	{/if}
</div>

{#snippet ContextMenu(menu, onclose)}
<!-- handled below -->
{/snippet}

<style>
	.desktop {
		flex: 1;
		position: relative;
		background: var(--cde-desktop);
		overflow: hidden;
	}

	.desktop-icons {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 8px;
		padding: 16px;
		align-content: flex-start;
		height: 100%;
	}

	.desktop-icon {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 72px;
		padding: 4px;
		cursor: pointer;
		border: 1px solid transparent;
	}

	.desktop-icon.selected {
		background: rgba(255, 255, 255, 0.1);
		border: 1px dotted var(--cde-text-light);
	}

	.desktop-icon:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	.icon-image {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon-image :global(svg) {
		width: 100%;
		height: 100%;
		filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5));
	}

	.icon-label {
		font-size: 11px;
		font-family: 'Helvetica', 'Arial', sans-serif;
		color: var(--cde-text-light);
		text-align: center;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
		margin-top: 4px;
		word-break: break-word;
		line-height: 1.2;
	}
</style>
