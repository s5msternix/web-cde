<script>
	let { children } = $props();
</script>

<svelte:head>
	<title>Web CDE - Common Desktop Environment</title>
	<meta name="description" content="CDE Desktop Environment for the Web" />
</svelte:head>

{@render children()}

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(html, body) {
		width: 100%;
		height: 100%;
		overflow: hidden;
		font-family: 'Helvetica', 'Arial', sans-serif;
	}

	:global(body) {
		--cde-bg: #ae8a62;
		--cde-bg-light: #c4a87b;
		--cde-bg-dark: #8b6e4e;
		--cde-bg-deep: #6b5438;
		--cde-text: #1a1a1a;
		--cde-text-light: #e8e0cc;
		--cde-active-title: #4a6e8a;
		--cde-active-title-text: #ffffff;
		--cde-inactive-title: #8b7355;
		--cde-inactive-title-text: #e8e0cc;
		--cde-panel: #ae8a62;
		--cde-panel-dark: #7a5e3e;
		--cde-panel-light: #c8ab7e;
		--cde-highlight: #4a7a8c;
		--cde-desktop: #3a6672;
		--cde-select: #4a6e8a;
		--cde-select-text: #ffffff;
	}

	:global(button) {
		font-family: inherit;
	}

	:global(::-webkit-scrollbar) {
		width: 14px;
		height: 14px;
	}

	:global(::-webkit-scrollbar-track) {
		background: var(--cde-bg-dark);
	}

	:global(::-webkit-scrollbar-thumb) {
		background: var(--cde-bg);
		border: 2px outset var(--cde-bg-light);
	}

	:global(::-webkit-scrollbar-thumb:hover) {
		background: var(--cde-bg-light);
	}

	:global(::-webkit-scrollbar-corner) {
		background: var(--cde-bg-dark);
	}
</style>
