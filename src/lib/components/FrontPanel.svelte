<script>
	import { icons } from '$lib/icons/index.js';

	let { wm, onlock, onexit } = $props();

	let time = $state(new Date());

	$effect(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);
		return () => clearInterval(interval);
	});

	let timeStr = $derived(
		time.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
	);
	let dateStr = $derived(
		time.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })
	);

	function launchApp(app, title, opts = {}) {
		wm.openWindow({ title, app, ...opts });
	}

	const launchers = [
		{ app: 'filemanager', title: 'Dosya Yöneticisi', icon: 'filemanager' },
		{ app: 'texteditor', title: 'Metin Düzenleyici', icon: 'texteditor' },
		{ app: 'terminal', title: 'Terminal', icon: 'terminal' },
		{ app: 'mail', title: 'Posta', icon: 'mail' },
		{ app: 'stylemanager', title: 'Stil Yöneticisi', icon: 'style' },
		{ app: 'calculator', title: 'Hesap Makinesi', icon: 'calculator' },
		{ app: 'help', title: 'Yardım', icon: 'help' }
	];
</script>

<div class="front-panel">
	<!-- Left section: App launchers -->
	<div class="panel-section launchers">
		{#each launchers as launcher}
			<button
				class="panel-button launcher-btn"
				title={launcher.title}
				onclick={() => launchApp(launcher.app, launcher.title)}
			>
				<span class="panel-icon">{@html icons[launcher.icon]}</span>
			</button>
		{/each}
	</div>

	<!-- Center section: Workspace switcher -->
	<div class="panel-section workspace-section">
		<div class="workspace-switcher">
			{#each wm.WORKSPACES as name, idx}
				<button
					class="workspace-btn"
					class:active={wm.currentWorkspace === idx}
					onclick={() => wm.switchWorkspace(idx)}
				>
					{name}
				</button>
			{/each}
		</div>

		<!-- Minimized windows -->
		<div class="minimized-windows">
			{#each wm.workspaceWindows.filter((w) => w.minimized) as win}
				<button
					class="minimized-btn"
					onclick={() => wm.restoreWindow(win.id)}
					title={win.title}
				>
					{win.title}
				</button>
			{/each}
		</div>
	</div>

	<!-- Right section: Clock, Lock, Exit -->
	<div class="panel-section right-section">
		<div class="clock-widget">
			<div class="clock-time">{timeStr}</div>
			<div class="clock-date">{dateStr}</div>
		</div>

		<button class="panel-button" title="Kilitle" onclick={onlock}>
			<span class="panel-icon">{@html icons.lock}</span>
		</button>

		<button class="panel-button exit-btn" title="Çıkış" onclick={onexit}>
			<span class="panel-icon">{@html icons.exit}</span>
		</button>
	</div>
</div>

<style>
	.front-panel {
		display: flex;
		align-items: stretch;
		height: 82px;
		background: var(--cde-panel);
		border-top: 2px outset var(--cde-panel-light);
		padding: 4px 6px;
		gap: 6px;
		flex-shrink: 0;
	}

	.panel-section {
		display: flex;
		align-items: center;
		gap: 3px;
	}

	.launchers {
		border-right: 2px groove var(--cde-panel-dark);
		padding-right: 8px;
	}

	.workspace-section {
		flex: 1;
		flex-direction: column;
		align-items: stretch;
		gap: 3px;
	}

	.workspace-switcher {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2px;
		padding: 0 4px;
	}

	.workspace-btn {
		padding: 4px 8px;
		font-size: 11px;
		font-weight: bold;
		font-family: 'Helvetica', 'Arial', sans-serif;
		background: var(--cde-bg-dark);
		border: 2px outset var(--cde-bg);
		color: var(--cde-text-light);
		cursor: pointer;
		text-align: center;
	}

	.workspace-btn.active {
		background: var(--cde-active-title);
		border-style: inset;
		color: var(--cde-active-title-text);
	}

	.workspace-btn:hover:not(.active) {
		background: var(--cde-bg);
	}

	.minimized-windows {
		display: flex;
		flex-wrap: wrap;
		gap: 2px;
		padding: 0 4px;
		overflow: hidden;
		flex: 1;
	}

	.minimized-btn {
		padding: 2px 8px;
		font-size: 10px;
		font-family: 'Helvetica', 'Arial', sans-serif;
		background: var(--cde-bg);
		border: 2px outset var(--cde-bg-light);
		color: var(--cde-text);
		cursor: pointer;
		max-width: 120px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.minimized-btn:active {
		border-style: inset;
	}

	.right-section {
		border-left: 2px groove var(--cde-panel-dark);
		padding-left: 8px;
		gap: 6px;
	}

	.panel-button {
		width: 56px;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--cde-bg);
		border: 2px outset var(--cde-bg-light);
		cursor: pointer;
		padding: 6px;
		flex-shrink: 0;
	}

	.panel-button:active {
		border-style: inset;
	}

	.panel-button:hover {
		background: var(--cde-bg-light);
	}

	.launcher-btn {
		width: 50px;
		height: 50px;
	}

	.panel-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
	}

	.panel-icon :global(svg) {
		width: 100%;
		height: 100%;
	}

	.clock-widget {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 4px 10px;
		background: var(--cde-bg-deep);
		border: 2px inset var(--cde-bg-dark);
		min-width: 70px;
	}

	.clock-time {
		font-size: 16px;
		font-weight: bold;
		font-family: 'Courier New', monospace;
		color: var(--cde-text-light);
	}

	.clock-date {
		font-size: 9px;
		font-family: 'Helvetica', 'Arial', sans-serif;
		color: var(--cde-text-light);
		opacity: 0.8;
	}

	.exit-btn {
		width: 50px;
		height: 50px;
	}
</style>
