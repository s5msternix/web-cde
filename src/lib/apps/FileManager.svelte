<script>
	import { icons } from '$lib/icons/index.js';

	let { wm, win } = $props();
	let currentPath = $state('/home/user');
	let files = $state([]);
	let loading = $state(true);
	let error = $state(null);

	async function loadFiles(path) {
		loading = true;
		error = null;
		try {
			const res = await fetch(`/api/files?path=${encodeURIComponent(path)}`);
			const data = await res.json();
			files = data.files ?? [];
			currentPath = data.path ?? path;
		} catch (e) {
			error = 'Dosyalar yüklenemedi';
			files = [];
		}
		loading = false;
	}

	$effect(() => {
		loadFiles(currentPath);
	});

	function navigateTo(file) {
		if (file.type === 'directory') {
			loadFiles(file.path);
		} else {
			wm.openWindow({
				title: file.name + ' - Metin Düzenleyici',
				app: 'texteditor',
				props: { filePath: file.path }
			});
		}
	}

	function goUp() {
		const parts = currentPath.split('/').filter(Boolean);
		parts.pop();
		loadFiles('/' + parts.join('/') || '/');
	}
</script>

<div class="filemanager">
	<!-- Toolbar -->
	<div class="fm-toolbar">
		<button class="fm-btn" onclick={goUp} title="Üst Klasör">
			&#9650; Yukarı
		</button>
		<button class="fm-btn" onclick={() => loadFiles(currentPath)} title="Yenile">
			&#8635; Yenile
		</button>
		<button class="fm-btn" onclick={() => loadFiles('/home/user')} title="Ev">
			&#8962; Ev
		</button>
		<div class="fm-path">
			<span class="path-label">Konum:</span>
			<span class="path-value">{currentPath}</span>
		</div>
	</div>

	<!-- File list -->
	<div class="fm-content">
		{#if loading}
			<div class="fm-loading">Yükleniyor...</div>
		{:else if error}
			<div class="fm-error">{error}</div>
		{:else}
			<div class="fm-list">
				{#each files as file}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="fm-item" ondblclick={() => navigateTo(file)}>
						<div class="fm-item-icon">
							{@html file.type === 'directory' ? icons.folder : icons.file}
						</div>
						<div class="fm-item-info">
							<div class="fm-item-name">{file.name}</div>
							<div class="fm-item-meta">
								{file.type === 'directory' ? 'Klasör' : file.size}
								{#if file.modified}
									<span class="fm-item-date">{file.modified}</span>
								{/if}
							</div>
						</div>
					</div>
				{/each}
				{#if files.length === 0}
					<div class="fm-empty">Klasör boş</div>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Status bar -->
	<div class="fm-status">
		{files.length} öğe — {currentPath}
	</div>
</div>

<style>
	.filemanager {
		display: flex;
		flex-direction: column;
		height: 100%;
		font-family: 'Helvetica', 'Arial', sans-serif;
		font-size: 12px;
		color: var(--cde-text);
	}

	.fm-toolbar {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 4px 6px;
		background: var(--cde-bg);
		border-bottom: 2px groove var(--cde-bg-dark);
		flex-wrap: wrap;
	}

	.fm-btn {
		padding: 3px 8px;
		font-size: 11px;
		font-family: 'Helvetica', 'Arial', sans-serif;
		background: var(--cde-bg);
		border: 2px outset var(--cde-bg-light);
		color: var(--cde-text);
		cursor: pointer;
		white-space: nowrap;
	}

	.fm-btn:active {
		border-style: inset;
	}

	.fm-path {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 2px 6px;
		background: var(--cde-bg-deep);
		border: 2px inset var(--cde-bg-dark);
		color: var(--cde-text-light);
		font-family: 'Courier New', monospace;
		font-size: 11px;
		min-width: 100px;
		overflow: hidden;
	}

	.path-label {
		font-family: 'Helvetica', 'Arial', sans-serif;
		color: var(--cde-text-light);
		opacity: 0.7;
	}

	.path-value {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.fm-content {
		flex: 1;
		overflow: auto;
		background: var(--cde-bg-deep);
	}

	.fm-list {
		display: flex;
		flex-direction: column;
	}

	.fm-item {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 4px 8px;
		cursor: pointer;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.fm-item:hover {
		background: var(--cde-select);
		color: var(--cde-select-text);
	}

	.fm-item-icon {
		width: 24px;
		height: 24px;
		flex-shrink: 0;
	}

	.fm-item-icon :global(svg) {
		width: 100%;
		height: 100%;
	}

	.fm-item-info {
		flex: 1;
		min-width: 0;
	}

	.fm-item-name {
		font-size: 12px;
		color: var(--cde-text-light);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.fm-item:hover .fm-item-name {
		color: var(--cde-select-text);
	}

	.fm-item-meta {
		font-size: 10px;
		color: var(--cde-text-light);
		opacity: 0.6;
	}

	.fm-item-date {
		margin-left: 8px;
	}

	.fm-loading,
	.fm-error,
	.fm-empty {
		padding: 20px;
		text-align: center;
		color: var(--cde-text-light);
		font-size: 12px;
	}

	.fm-error {
		color: #cc6644;
	}

	.fm-status {
		padding: 3px 8px;
		font-size: 10px;
		background: var(--cde-bg);
		border-top: 2px groove var(--cde-bg-dark);
		color: var(--cde-text);
	}
</style>
