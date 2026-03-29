<script>
	import { enhance } from '$app/forms';

	let { wm, win } = $props();
	let content = $state('');
	let filePath = $state(win.props?.filePath ?? 'isimsiz.txt');
	let displayName = $state(win.props?.filePath?.split('/').pop() ?? 'isimsiz.txt');
	let modified = $state(false);
	let saved = $state(false);
	let statusMsg = $state('Hazır');

	async function loadFile() {
		if (win.props?.filePath) {
			try {
				const res = await fetch(`/api/files?path=${encodeURIComponent(win.props.filePath)}&content=1`);
				const data = await res.json();
				if (data.content !== undefined) {
					content = data.content;
					displayName = data.name ?? win.props.filePath;
					statusMsg = 'Dosya yüklendi';
				}
			} catch {
				statusMsg = 'Dosya yüklenemedi';
			}
		}
	}

	$effect(() => {
		loadFile();
	});

	function handleInput() {
		modified = true;
		saved = false;
	}

	function handleSave() {
		modified = false;
		saved = true;
		statusMsg = 'Kaydedildi';
		setTimeout(() => {
			if (saved) statusMsg = 'Hazır';
		}, 2000);
		return async () => {};
	}

	function handleNew() {
		content = '';
		filePath = 'isimsiz.txt';
		displayName = 'isimsiz.txt';
		modified = false;
		statusMsg = 'Yeni dosya';
	}
</script>

<div class="texteditor">
	<!-- Menu bar -->
	<div class="te-menubar">
		<button class="te-menu-btn" onclick={handleNew}>Yeni</button>
		<form method="POST" action="/api/files" use:enhance={handleSave} style="display:inline">
			<input type="hidden" name="path" value={filePath} />
			<input type="hidden" name="content" value={content} />
			<button type="submit" class="te-menu-btn">Kaydet</button>
		</form>
		<span class="te-filename">
			{displayName}{modified ? ' *' : ''}
		</span>
	</div>

	<!-- Editor area -->
	<div class="te-editor-wrap">
		<div class="te-line-numbers">
			{#each content.split('\n') as _, i}
				<div class="te-line-num">{i + 1}</div>
			{/each}
		</div>
		<textarea
			class="te-textarea"
			bind:value={content}
			oninput={handleInput}
			spellcheck="false"
			placeholder="Metin giriniz..."
		></textarea>
	</div>

	<!-- Status bar -->
	<div class="te-status">
		<span>{statusMsg}</span>
		<span>Satır: {content.split('\n').length} | Karakter: {content.length}</span>
	</div>
</div>

<style>
	.texteditor {
		display: flex;
		flex-direction: column;
		height: 100%;
		font-family: 'Helvetica', 'Arial', sans-serif;
		font-size: 12px;
		color: var(--cde-text);
	}

	.te-menubar {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 3px 6px;
		background: var(--cde-bg);
		border-bottom: 2px groove var(--cde-bg-dark);
	}

	.te-menu-btn {
		padding: 3px 10px;
		font-size: 11px;
		font-family: 'Helvetica', 'Arial', sans-serif;
		background: var(--cde-bg);
		border: 2px outset var(--cde-bg-light);
		color: var(--cde-text);
		cursor: pointer;
	}

	.te-menu-btn:active {
		border-style: inset;
	}

	.te-filename {
		flex: 1;
		text-align: right;
		font-size: 11px;
		font-family: 'Courier New', monospace;
		color: var(--cde-text);
		opacity: 0.7;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.te-editor-wrap {
		flex: 1;
		display: flex;
		min-height: 0;
		background: #0d1926;
	}

	.te-line-numbers {
		padding: 6px 4px;
		background: #162030;
		color: #667788;
		font-family: 'Courier New', monospace;
		font-size: 12px;
		line-height: 1.4;
		text-align: right;
		min-width: 32px;
		user-select: none;
		overflow: hidden;
	}

	.te-line-num {
		padding-right: 6px;
	}

	.te-textarea {
		flex: 1;
		padding: 6px 8px;
		font-family: 'Courier New', monospace;
		font-size: 12px;
		line-height: 1.4;
		background: #0d1926;
		color: #c8d8c8;
		border: none;
		resize: none;
		outline: none;
		tab-size: 4;
		white-space: pre;
		overflow: auto;
	}

	.te-status {
		display: flex;
		justify-content: space-between;
		padding: 3px 8px;
		font-size: 10px;
		background: var(--cde-bg);
		border-top: 2px groove var(--cde-bg-dark);
		color: var(--cde-text);
	}
</style>
