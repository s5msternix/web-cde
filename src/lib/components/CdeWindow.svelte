<script>
	import { icons } from '$lib/icons/index.js';

	let {
		win,
		isActive = false,
		onclose,
		onfocus,
		onminimize,
		ontoggleMaximize,
		onmove,
		onresize,
		children
	} = $props();

	let dragging = $state(false);
	let resizing = $state(false);
	let dragOffset = $state({ x: 0, y: 0 });
	let resizeStart = $state({ x: 0, y: 0, w: 0, h: 0 });

	function handleTitleMouseDown(e) {
		if (win.maximized) return;
		e.preventDefault();
		onfocus?.();
		dragging = true;
		dragOffset = { x: e.clientX - win.x, y: e.clientY - win.y };

		function onMouseMove(e) {
			if (dragging) {
				onmove?.(e.clientX - dragOffset.x, Math.max(0, e.clientY - dragOffset.y));
			}
		}
		function onMouseUp() {
			dragging = false;
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseup', onMouseUp);
		}
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	}

	function handleResizeMouseDown(e) {
		if (win.maximized) return;
		e.preventDefault();
		e.stopPropagation();
		onfocus?.();
		resizing = true;
		resizeStart = { x: e.clientX, y: e.clientY, w: win.width, h: win.height };

		function onMouseMove(e) {
			if (resizing) {
				const dw = e.clientX - resizeStart.x;
				const dh = e.clientY - resizeStart.y;
				onresize?.(resizeStart.w + dw, resizeStart.h + dh);
			}
		}
		function onMouseUp() {
			resizing = false;
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseup', onMouseUp);
		}
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	}

	function handleDoubleClickTitle() {
		ontoggleMaximize?.();
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="cde-window"
	class:active={isActive}
	class:maximized={win.maximized}
	style="left:{win.x}px;top:{win.y}px;width:{win.width}px;height:{win.height}px;z-index:{win.zIndex}"
	onmousedown={() => onfocus?.()}
>
	<!-- Title bar -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="title-bar"
		onmousedown={handleTitleMouseDown}
		ondblclick={handleDoubleClickTitle}
	>
		<button class="title-btn menu-btn" onclick={() => onclose?.()} title="Menü">
			<span class="menu-dash"></span>
		</button>

		<div class="title-text">{win.title}</div>

		<div class="title-buttons">
			<button class="title-btn" onclick={() => onminimize?.()} title="Küçült">
				{@html icons.minimize}
			</button>
			<button class="title-btn" onclick={() => ontoggleMaximize?.()} title="Büyüt">
				{@html win.maximized ? icons.restore : icons.maximize}
			</button>
		</div>
	</div>

	<!-- Window content -->
	<div class="window-content">
		{@render children()}
	</div>

	<!-- Resize handle -->
	{#if !win.maximized}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="resize-handle" onmousedown={handleResizeMouseDown}></div>
	{/if}
</div>

<style>
	.cde-window {
		position: absolute;
		display: flex;
		flex-direction: column;
		background: var(--cde-bg);
		border: 2px outset var(--cde-bg-light);
		box-shadow: inset 1px 1px 0 var(--cde-bg-light), inset -1px -1px 0 var(--cde-bg-dark),
			3px 3px 8px rgba(0, 0, 0, 0.4);
		user-select: none;
	}

	.cde-window.maximized {
		box-shadow: none;
		border: none;
	}

	.title-bar {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 2px 3px;
		background: var(--cde-inactive-title);
		border-bottom: 2px groove var(--cde-bg-dark);
		cursor: grab;
		min-height: 26px;
		flex-shrink: 0;
	}

	.cde-window.active .title-bar {
		background: var(--cde-active-title);
	}

	.title-text {
		flex: 1;
		text-align: center;
		font-size: 12px;
		font-weight: bold;
		font-family: 'Helvetica', 'Arial', sans-serif;
		color: var(--cde-inactive-title-text);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		padding: 0 4px;
		text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
	}

	.cde-window.active .title-text {
		color: var(--cde-active-title-text);
	}

	.title-buttons {
		display: flex;
		gap: 2px;
	}

	.title-btn {
		width: 20px;
		height: 20px;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--cde-bg);
		border: 2px outset var(--cde-bg-light);
		cursor: pointer;
		color: var(--cde-text);
		flex-shrink: 0;
	}

	.title-btn:active {
		border-style: inset;
	}

	.title-btn :global(svg) {
		width: 12px;
		height: 12px;
	}

	.menu-btn {
		margin-right: 2px;
	}

	.menu-dash {
		display: block;
		width: 10px;
		height: 2px;
		background: var(--cde-text);
	}

	.window-content {
		flex: 1;
		overflow: auto;
		background: var(--cde-bg);
		border: 2px inset var(--cde-bg-light);
		margin: 3px;
		min-height: 0;
	}

	.resize-handle {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 18px;
		height: 18px;
		cursor: se-resize;
		background: linear-gradient(
			135deg,
			transparent 30%,
			var(--cde-bg-dark) 30%,
			var(--cde-bg-dark) 40%,
			transparent 40%,
			transparent 55%,
			var(--cde-bg-dark) 55%,
			var(--cde-bg-dark) 65%,
			transparent 65%,
			transparent 80%,
			var(--cde-bg-dark) 80%,
			var(--cde-bg-dark) 90%,
			transparent 90%
		);
	}
</style>
