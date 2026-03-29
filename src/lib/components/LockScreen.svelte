<script>
	import { enhance } from '$app/forms';

	let { onunlock } = $props();
	let password = $state('');
	let shaking = $state(false);

	function handleSubmit() {
		if (password.length > 0) {
			onunlock?.();
		} else {
			shaking = true;
			setTimeout(() => (shaking = false), 500);
		}
		return async () => {};
	}
</script>

<div class="lock-screen">
	<div class="lock-dialog" class:shake={shaking}>
		<div class="lock-title">Ekran Kilitli</div>
		<div class="lock-icon">
			<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
				<rect x="16" y="28" width="32" height="28" rx="3" fill="#8b7355" stroke="#5d4e37" stroke-width="2"/>
				<path d="M22 28 V20 Q22 8 32 8 Q42 8 42 20 V28" fill="none" stroke="#5d4e37" stroke-width="3"/>
				<circle cx="32" cy="42" r="4" fill="#1a1a2e"/>
				<line x1="32" y1="46" x2="32" y2="52" stroke="#1a1a2e" stroke-width="3"/>
			</svg>
		</div>
		<form method="POST" use:enhance={handleSubmit}>
			<label class="lock-label">
				Kilidi açmak için parolanızı girin:
				<input
					type="password"
					class="lock-input"
					bind:value={password}
					placeholder="Parola"
					autofocus
				/>
			</label>
			<div class="lock-buttons">
				<button type="submit" class="cde-btn">Kilidi Aç</button>
			</div>
		</form>
	</div>
</div>

<style>
	.lock-screen {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: var(--cde-desktop);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999999;
	}

	.lock-dialog {
		background: var(--cde-bg);
		border: 2px outset var(--cde-bg-light);
		padding: 24px;
		min-width: 320px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.5);
	}

	.lock-dialog.shake {
		animation: shake 0.5s;
	}

	@keyframes shake {
		0%, 100% { transform: translateX(0); }
		20%, 60% { transform: translateX(-8px); }
		40%, 80% { transform: translateX(8px); }
	}

	.lock-title {
		font-size: 16px;
		font-weight: bold;
		font-family: 'Helvetica', 'Arial', sans-serif;
		color: var(--cde-text);
		background: var(--cde-active-title);
		color: var(--cde-active-title-text);
		padding: 4px 20px;
		width: 100%;
		text-align: center;
		border: 2px outset var(--cde-bg-light);
	}

	.lock-icon {
		width: 64px;
		height: 64px;
	}

	.lock-icon :global(svg) {
		width: 100%;
		height: 100%;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		width: 100%;
	}

	.lock-label {
		font-size: 12px;
		font-family: 'Helvetica', 'Arial', sans-serif;
		color: var(--cde-text);
		display: flex;
		flex-direction: column;
		gap: 6px;
		width: 100%;
	}

	.lock-input {
		padding: 6px 8px;
		font-size: 13px;
		font-family: 'Courier New', monospace;
		background: var(--cde-bg-deep);
		border: 2px inset var(--cde-bg-dark);
		color: var(--cde-text-light);
		width: 100%;
		box-sizing: border-box;
	}

	.lock-input:focus {
		outline: 1px solid var(--cde-highlight);
	}

	.lock-buttons {
		display: flex;
		gap: 8px;
	}

	.cde-btn {
		padding: 6px 20px;
		font-size: 12px;
		font-family: 'Helvetica', 'Arial', sans-serif;
		background: var(--cde-bg);
		border: 2px outset var(--cde-bg-light);
		color: var(--cde-text);
		cursor: pointer;
	}

	.cde-btn:active {
		border-style: inset;
	}

	.cde-btn:hover {
		background: var(--cde-bg-light);
	}
</style>
