<script>
	let { wm, win } = $props();
	let topics = $state([]);
	let selectedTopic = $state(null);
	let loading = $state(true);

	async function loadHelp() {
		try {
			const res = await fetch('/api/desktop?type=help');
			const data = await res.json();
			topics = data.topics ?? [];
			if (topics.length > 0) {
				selectedTopic = topics[0];
			}
		} catch {
			topics = [];
		}
		loading = false;
	}

	$effect(() => {
		loadHelp();
	});
</script>

<div class="help-viewer">
	<!-- Sidebar with topics -->
	<div class="hv-sidebar">
		<div class="hv-sidebar-title">Konular</div>
		{#each topics as topic}
			<button
				class="hv-topic-btn"
				class:active={selectedTopic?.id === topic.id}
				onclick={() => (selectedTopic = topic)}
			>
				{topic.title}
			</button>
		{/each}
	</div>

	<!-- Content area -->
	<div class="hv-content">
		{#if loading}
			<div class="hv-loading">Yükleniyor...</div>
		{:else if selectedTopic}
			<div class="hv-article">
				<h2>{selectedTopic.title}</h2>
				{#each selectedTopic.sections as section}
					<h3>{section.heading}</h3>
					<p>{section.text}</p>
				{/each}
			</div>
		{:else}
			<div class="hv-empty">Yardım konusu seçin</div>
		{/if}
	</div>
</div>

<style>
	.help-viewer {
		display: flex;
		height: 100%;
		font-family: 'Helvetica', 'Arial', sans-serif;
		font-size: 12px;
		color: var(--cde-text);
	}

	.hv-sidebar {
		width: 160px;
		background: var(--cde-bg);
		border-right: 2px groove var(--cde-bg-dark);
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		flex-shrink: 0;
	}

	.hv-sidebar-title {
		padding: 6px 8px;
		font-weight: bold;
		font-size: 12px;
		background: var(--cde-active-title);
		color: var(--cde-active-title-text);
		text-align: center;
	}

	.hv-topic-btn {
		padding: 5px 8px;
		font-size: 11px;
		font-family: 'Helvetica', 'Arial', sans-serif;
		text-align: left;
		background: none;
		border: none;
		border-bottom: 1px solid var(--cde-bg-dark);
		color: var(--cde-text);
		cursor: pointer;
	}

	.hv-topic-btn:hover {
		background: var(--cde-bg-light);
	}

	.hv-topic-btn.active {
		background: var(--cde-select);
		color: var(--cde-select-text);
	}

	.hv-content {
		flex: 1;
		overflow: auto;
		padding: 12px 16px;
		background: var(--cde-bg-deep);
		color: var(--cde-text-light);
	}

	.hv-article h2 {
		margin: 0 0 12px;
		font-size: 16px;
		border-bottom: 1px solid var(--cde-bg-dark);
		padding-bottom: 6px;
	}

	.hv-article h3 {
		margin: 12px 0 6px;
		font-size: 13px;
		color: var(--cde-highlight);
	}

	.hv-article p {
		margin: 0 0 8px;
		line-height: 1.5;
		font-size: 12px;
	}

	.hv-loading,
	.hv-empty {
		padding: 20px;
		text-align: center;
		opacity: 0.7;
	}
</style>
