<script>
	let { menu, onclose } = $props();

	function handleItemClick(item) {
		if (item.action) {
			item.action();
		}
		onclose?.();
	}

	function handleBackdropClick() {
		onclose?.();
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="context-backdrop" onclick={handleBackdropClick}>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="context-menu"
		style="left:{menu.x}px;top:{menu.y}px"
		onclick={(e) => e.stopPropagation()}
	>
		{#each menu.items as item}
			{#if item.separator}
				<div class="menu-separator"></div>
			{:else if item.items}
				<div class="menu-item submenu">
					<span>{item.label}</span>
					<span class="arrow">&#9654;</span>
					<div class="submenu-panel">
						{#each item.items as subitem}
							<button class="menu-item" onclick={() => handleItemClick(subitem)}>
								{subitem.label}
							</button>
						{/each}
					</div>
				</div>
			{:else}
				<button class="menu-item" onclick={() => handleItemClick(item)}>
					{item.label}
				</button>
			{/if}
		{/each}
	</div>
</div>

<style>
	.context-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99999;
	}

	.context-menu {
		position: fixed;
		background: var(--cde-bg);
		border: 2px outset var(--cde-bg-light);
		box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
		min-width: 180px;
		padding: 2px;
		z-index: 100000;
	}

	.menu-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 5px 12px;
		font-size: 12px;
		font-family: 'Helvetica', 'Arial', sans-serif;
		color: var(--cde-text);
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
		position: relative;
	}

	.menu-item:hover {
		background: var(--cde-select);
		color: var(--cde-select-text);
	}

	.menu-separator {
		height: 1px;
		margin: 3px 4px;
		background: var(--cde-bg-dark);
		border-bottom: 1px solid var(--cde-bg-light);
	}

	.submenu {
		cursor: default;
	}

	.arrow {
		font-size: 8px;
		margin-left: 12px;
	}

	.submenu-panel {
		display: none;
		position: absolute;
		left: 100%;
		top: 0;
		background: var(--cde-bg);
		border: 2px outset var(--cde-bg-light);
		box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
		min-width: 160px;
		padding: 2px;
	}

	.submenu:hover .submenu-panel {
		display: block;
	}
</style>
