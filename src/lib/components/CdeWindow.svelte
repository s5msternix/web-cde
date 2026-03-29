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
	let resizeDir = $state('');
	let dragOffset = $state({ x: 0, y: 0 });
	let resizeStart = $state({ x: 0, y: 0, w: 0, h: 0, wx: 0, wy: 0 });

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

	function handleResizeMouseDown(e, dir) {
		if (win.maximized) return;
		e.preventDefault();
		e.stopPropagation();
		onfocus?.();
		resizing = true;
		resizeDir = dir;
		resizeStart = { x: e.clientX, y: e.clientY, w: win.width, h: win.height, wx: win.x, wy: win.y };

		function onMouseMove(e) {
			if (!resizing) return;
			const dx = e.clientX - resizeStart.x;
			const dy = e.clientY - resizeStart.y;

			let newW = resizeStart.w;
			let newH = resizeStart.h;
			let newX = resizeStart.wx;
			let newY = resizeStart.wy;

			if (dir.includes('e')) newW = resizeStart.w + dx;
			if (dir.includes('w')) { newW = resizeStart.w - dx; newX = resizeStart.wx + dx; }
			if (dir.includes('s')) newH = resizeStart.h + dy;
			if (dir.includes('n')) { newH = resizeStart.h - dy; newY = resizeStart.wy + dy; }

			newW = Math.max(220, newW);
			newH = Math.max(160, newH);

			if (dir.includes('w') && newW <= 220) newX = resizeStart.wx + resizeStart.w - 220;
			if (dir.includes('n') && newH <= 160) newY = resizeStart.wy + resizeStart.h - 160;

			onresize?.(newW, newH);
			if (dir.includes('w') || dir.includes('n')) {
				onmove?.(newX, newY);
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

	let showWindowMenu = $state(false);

	function handleMenuClick(e) {
		e.stopPropagation();
		showWindowMenu = !showWindowMenu;
	}

	function handleMenuAction(action) {
		showWindowMenu = false;
		if (action === 'close') onclose?.();
		else if (action === 'minimize') onminimize?.();
		else if (action === 'maximize') ontoggleMaximize?.();
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
	<!-- Outer bevel frame -->
	<div class="window-outer-frame">
		<!-- Title bar -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="title-bar"
			onmousedown={handleTitleMouseDown}
			ondblclick={handleDoubleClickTitle}
		>
			<!-- Window menu button (left) -->
			<button class="title-btn window-menu-btn" onclick={handleMenuClick} title="Pencere Menüsü">
				<div class="window-menu-icon">
					<div class="menu-line"></div>
					<div class="menu-line"></div>
				</div>
			</button>

			{#if showWindowMenu}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="window-menu-dropdown" onclick={(e) => e.stopPropagation()}>
					<button class="wm-item" onclick={() => handleMenuAction('minimize')}>Küçült</button>
					<button class="wm-item" onclick={() => handleMenuAction('maximize')}>
						{win.maximized ? 'Geri Yükle' : 'Büyüt'}
					</button>
					<div class="wm-separator"></div>
					<button class="wm-item" onclick={() => handleMenuAction('close')}>Kapat</button>
				</div>
			{/if}

			<div class="title-text">{win.title}</div>

			<!-- Right buttons: minimize & maximize -->
			<div class="title-buttons">
				<button class="title-btn" onclick={() => onminimize?.()} title="Küçült">
					<div class="btn-icon minimize-icon">
						<div class="dot"></div>
					</div>
				</button>
				<button class="title-btn" onclick={() => ontoggleMaximize?.()} title={win.maximized ? 'Geri Yükle' : 'Büyüt'}>
					<div class="btn-icon maximize-icon" class:restored={win.maximized}>
						<div class="square"></div>
						{#if win.maximized}
							<div class="square-back"></div>
						{/if}
					</div>
				</button>
			</div>
		</div>

		<!-- Window content area (sunken) -->
		<div class="window-body">
			<div class="window-content">
				{@render children()}
			</div>
		</div>
	</div>

	<!-- Resize handles (8 directions) -->
	{#if !win.maximized}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="resize-n" onmousedown={(e) => handleResizeMouseDown(e, 'n')}></div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="resize-s" onmousedown={(e) => handleResizeMouseDown(e, 's')}></div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="resize-w" onmousedown={(e) => handleResizeMouseDown(e, 'w')}></div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="resize-e" onmousedown={(e) => handleResizeMouseDown(e, 'e')}></div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="resize-nw" onmousedown={(e) => handleResizeMouseDown(e, 'nw')}></div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="resize-ne" onmousedown={(e) => handleResizeMouseDown(e, 'ne')}></div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="resize-sw" onmousedown={(e) => handleResizeMouseDown(e, 'sw')}></div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="resize-se" onmousedown={(e) => handleResizeMouseDown(e, 'se')}></div>
	{/if}
</div>

<style>
	.cde-window {
		position: absolute;
		display: flex;
		flex-direction: column;
		user-select: none;
	}

	/* ===== OUTER FRAME - thick CDE bevel ===== */
	.window-outer-frame {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: var(--cde-bg);
		/* CDE double-bevel: outer highlight + inner shadow */
		border: 2px solid;
		border-color: var(--cde-bg-light) var(--cde-bg-dark) var(--cde-bg-dark) var(--cde-bg-light);
		box-shadow:
			/* outer bevel highlight */
			inset 2px 2px 0 0 var(--cde-bg-light),
			inset -2px -2px 0 0 var(--cde-bg-dark),
			/* drop shadow */
			4px 4px 8px rgba(0, 0, 0, 0.45);
		padding: 4px;
		min-height: 0;
	}

	.cde-window.maximized .window-outer-frame {
		box-shadow: none;
		border: none;
		padding: 0;
	}

	/* ===== TITLE BAR ===== */
	.title-bar {
		display: flex;
		align-items: center;
		gap: 0;
		padding: 2px 2px;
		background: var(--cde-inactive-title);
		cursor: grab;
		min-height: 28px;
		flex-shrink: 0;
		position: relative;
		/* Title bar has its own bevel */
		border: 1px solid;
		border-color: var(--cde-bg-light) var(--cde-bg-dark) var(--cde-bg-dark) var(--cde-bg-light);
		margin-bottom: 3px;
	}

	.cde-window.active .title-bar {
		background: var(--cde-active-title);
	}

	/* ===== TITLE TEXT ===== */
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
		padding: 0 8px;
		letter-spacing: 0.5px;
	}

	.cde-window.active .title-text {
		color: var(--cde-active-title-text);
	}

	/* ===== TITLE BUTTONS ===== */
	.title-buttons {
		display: flex;
		gap: 1px;
	}

	.title-btn {
		width: 22px;
		height: 22px;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--cde-bg);
		border: 2px solid;
		border-color: var(--cde-bg-light) var(--cde-bg-dark) var(--cde-bg-dark) var(--cde-bg-light);
		cursor: pointer;
		color: var(--cde-text);
		flex-shrink: 0;
	}

	.title-btn:active {
		border-color: var(--cde-bg-dark) var(--cde-bg-light) var(--cde-bg-light) var(--cde-bg-dark);
	}

	/* Window menu button - left side */
	.window-menu-btn {
		margin-right: 3px;
	}

	.window-menu-icon {
		display: flex;
		flex-direction: column;
		gap: 3px;
		align-items: center;
		justify-content: center;
		width: 14px;
		height: 14px;
	}

	.menu-line {
		width: 10px;
		height: 2px;
		background: var(--cde-text);
	}

	/* Minimize button icon - small dot at bottom */
	.minimize-icon {
		display: flex;
		align-items: flex-end;
		justify-content: center;
		width: 14px;
		height: 14px;
		padding-bottom: 1px;
	}

	.minimize-icon .dot {
		width: 6px;
		height: 4px;
		background: var(--cde-text);
		border: 1px solid;
		border-color: var(--cde-bg-light) var(--cde-bg-dark) var(--cde-bg-dark) var(--cde-bg-light);
	}

	/* Maximize button icon - square */
	.maximize-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 14px;
		height: 14px;
		position: relative;
	}

	.maximize-icon .square {
		width: 10px;
		height: 10px;
		border: 2px solid var(--cde-text);
		background: transparent;
	}

	.maximize-icon.restored .square {
		width: 8px;
		height: 8px;
		border-width: 1.5px;
		position: absolute;
		bottom: 0;
		left: 0;
	}

	.maximize-icon.restored .square-back {
		width: 8px;
		height: 8px;
		border: 1.5px solid var(--cde-text);
		position: absolute;
		top: 0;
		right: 0;
		background: var(--cde-bg);
	}

	/* Window menu dropdown */
	.window-menu-dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		background: var(--cde-bg);
		border: 2px solid;
		border-color: var(--cde-bg-light) var(--cde-bg-dark) var(--cde-bg-dark) var(--cde-bg-light);
		box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
		min-width: 140px;
		z-index: 10;
		padding: 2px;
	}

	.wm-item {
		display: block;
		width: 100%;
		padding: 4px 16px;
		font-size: 12px;
		font-family: 'Helvetica', 'Arial', sans-serif;
		text-align: left;
		background: none;
		border: none;
		color: var(--cde-text);
		cursor: pointer;
	}

	.wm-item:hover {
		background: var(--cde-select);
		color: var(--cde-select-text);
	}

	.wm-separator {
		height: 1px;
		margin: 2px 4px;
		background: var(--cde-bg-dark);
		border-bottom: 1px solid var(--cde-bg-light);
	}

	/* ===== WINDOW BODY ===== */
	.window-body {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-height: 0;
	}

	.window-content {
		flex: 1;
		overflow: auto;
		background: var(--cde-bg);
		/* Sunken inset bevel for content area */
		border: 2px solid;
		border-color: var(--cde-bg-dark) var(--cde-bg-light) var(--cde-bg-light) var(--cde-bg-dark);
		min-height: 0;
	}

	/* ===== RESIZE HANDLES (8 directions) ===== */
	.resize-n, .resize-s, .resize-w, .resize-e,
	.resize-nw, .resize-ne, .resize-sw, .resize-se {
		position: absolute;
	}

	.resize-n {
		top: 0; left: 8px; right: 8px; height: 6px;
		cursor: n-resize;
	}
	.resize-s {
		bottom: 0; left: 8px; right: 8px; height: 6px;
		cursor: s-resize;
	}
	.resize-w {
		left: 0; top: 8px; bottom: 8px; width: 6px;
		cursor: w-resize;
	}
	.resize-e {
		right: 0; top: 8px; bottom: 8px; width: 6px;
		cursor: e-resize;
	}
	.resize-nw {
		top: 0; left: 0; width: 12px; height: 12px;
		cursor: nw-resize;
	}
	.resize-ne {
		top: 0; right: 0; width: 12px; height: 12px;
		cursor: ne-resize;
	}
	.resize-sw {
		bottom: 0; left: 0; width: 12px; height: 12px;
		cursor: sw-resize;
	}
	.resize-se {
		bottom: 0; right: 0; width: 12px; height: 12px;
		cursor: se-resize;
	}
</style>
