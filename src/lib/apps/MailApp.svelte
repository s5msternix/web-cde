<script>
	let { wm, win } = $props();
	let messages = $state([]);
	let selectedMsg = $state(null);
	let loading = $state(true);

	async function loadMail() {
		try {
			const res = await fetch('/api/desktop?type=mail');
			const data = await res.json();
			messages = data.messages ?? [];
		} catch {
			messages = [];
		}
		loading = false;
	}

	$effect(() => {
		loadMail();
	});
</script>

<div class="mail-app">
	<div class="mail-list">
		<div class="mail-list-header">Gelen Kutusu ({messages.length})</div>
		{#if loading}
			<div class="mail-loading">Yükleniyor...</div>
		{:else}
			{#each messages as msg}
				<button
					class="mail-item"
					class:active={selectedMsg?.id === msg.id}
					class:unread={!msg.read}
					onclick={() => (selectedMsg = msg)}
				>
					<div class="mail-from">{msg.from}</div>
					<div class="mail-subject">{msg.subject}</div>
					<div class="mail-date">{msg.date}</div>
				</button>
			{/each}
			{#if messages.length === 0}
				<div class="mail-empty">Posta yok</div>
			{/if}
		{/if}
	</div>

	<div class="mail-content">
		{#if selectedMsg}
			<div class="mail-header-info">
				<div><strong>Gönderen:</strong> {selectedMsg.from}</div>
				<div><strong>Konu:</strong> {selectedMsg.subject}</div>
				<div><strong>Tarih:</strong> {selectedMsg.date}</div>
			</div>
			<div class="mail-body">{selectedMsg.body}</div>
		{:else}
			<div class="mail-placeholder">Okumak için bir posta seçin</div>
		{/if}
	</div>
</div>

<style>
	.mail-app {
		display: flex;
		height: 100%;
		font-family: 'Helvetica', 'Arial', sans-serif;
		font-size: 12px;
		color: var(--cde-text);
	}

	.mail-list {
		width: 220px;
		background: var(--cde-bg);
		border-right: 2px groove var(--cde-bg-dark);
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		flex-shrink: 0;
	}

	.mail-list-header {
		padding: 6px 8px;
		font-weight: bold;
		background: var(--cde-active-title);
		color: var(--cde-active-title-text);
		text-align: center;
		font-size: 12px;
	}

	.mail-item {
		padding: 6px 8px;
		text-align: left;
		background: none;
		border: none;
		border-bottom: 1px solid var(--cde-bg-dark);
		color: var(--cde-text);
		cursor: pointer;
		width: 100%;
		font-family: 'Helvetica', 'Arial', sans-serif;
	}

	.mail-item:hover {
		background: var(--cde-bg-light);
	}

	.mail-item.active {
		background: var(--cde-select);
		color: var(--cde-select-text);
	}

	.mail-item.unread .mail-subject {
		font-weight: bold;
	}

	.mail-from {
		font-size: 11px;
		opacity: 0.7;
	}

	.mail-subject {
		font-size: 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.mail-date {
		font-size: 10px;
		opacity: 0.5;
	}

	.mail-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: var(--cde-bg-deep);
		color: var(--cde-text-light);
		overflow: auto;
	}

	.mail-header-info {
		padding: 8px 12px;
		border-bottom: 1px solid var(--cde-bg-dark);
		font-size: 11px;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.mail-body {
		padding: 12px;
		line-height: 1.5;
		white-space: pre-wrap;
		flex: 1;
	}

	.mail-loading,
	.mail-empty,
	.mail-placeholder {
		padding: 20px;
		text-align: center;
		opacity: 0.7;
	}
</style>
