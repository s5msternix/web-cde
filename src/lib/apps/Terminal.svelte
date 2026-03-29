<script>
	let { wm, win } = $props();
	let lines = $state([
		{ text: 'Web CDE Terminal v1.0', type: 'info' },
		{ text: 'Hoş geldiniz! Komut yazmak için aşağıdaki alana yazın.', type: 'info' },
		{ text: '' }
	]);
	let input = $state('');
	let cwd = $state('/home/user');
	/** @type {HTMLDivElement|null} */
	let outputEl = $state(null);

	$effect(() => {
		if (outputEl) {
			outputEl.scrollTop = outputEl.scrollHeight;
		}
	});

	const commands = {
		help: () => [
			'Kullanılabilir komutlar:',
			'  help    - Bu yardım mesajını göster',
			'  date    - Tarih ve saat',
			'  whoami  - Kullanıcı adı',
			'  uname   - Sistem bilgisi',
			'  pwd     - Geçerli dizin',
			'  ls      - Dosya listele',
			'  echo    - Metin yazdır',
			'  clear   - Ekranı temizle',
			'  cal     - Takvim',
			'  fortune - Rastgele söz'
		],
		date: () => [new Date().toLocaleString('tr-TR')],
		whoami: () => ['user'],
		uname: () => ['WebCDE 1.0 SunOS 5.11 (Tarayıcı Sürümü)'],
		pwd: () => [cwd],
		hostname: () => ['webcde-workstation'],
		ls: () => [
			'belgeler/   indirmeler/   masaüstü/',
			'müzik/      resimler/     projeler/',
			'.profile    .bashrc       README.txt'
		],
		clear: () => {
			lines = [];
			return [];
		},
		echo: (args) => [args.join(' ')],
		cal: () => {
			const now = new Date();
			const month = now.toLocaleString('tr-TR', { month: 'long', year: 'numeric' });
			const header = `     ${month}`;
			const days = 'Pzt Sal Çar Per Cum Cmt Paz';
			const first = new Date(now.getFullYear(), now.getMonth(), 1);
			let dayOfWeek = (first.getDay() + 6) % 7;
			const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
			let calLines = [header, days];
			let row = '  '.repeat(dayOfWeek);
			for (let d = 1; d <= lastDay; d++) {
				const ds = d === now.getDate() ? `[${String(d).padStart(2)}]` : ` ${String(d).padStart(2)} `;
				row += ds;
				if ((dayOfWeek + 1) % 7 === 0) {
					calLines.push(row);
					row = '';
				}
				dayOfWeek++;
			}
			if (row) calLines.push(row);
			return calLines;
		},
		fortune: () => {
			const fortunes = [
				'Güneş her zaman bulutların arkasında parlar.',
				'En iyi kod, yazılmayan koddur.',
				'Unix her şeydir. Geri kalanı da Unix.',
				'Sabır, bilgeliğin başlangıcıdır.',
				'Her büyük yazılım, küçük bir betikle başladı.',
				'Bugünün hataları, yarının deneyimleridir.'
			];
			return [fortunes[Math.floor(Math.random() * fortunes.length)]];
		}
	};

	function handleKeyDown(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			const cmd = input.trim();
			lines.push({ text: `user@webcde:${cwd}$ ${cmd}`, type: 'prompt' });

			if (cmd) {
				const parts = cmd.split(/\s+/);
				const name = parts[0];
				const args = parts.slice(1);
				const handler = commands[name];
				if (handler) {
					const output = handler(args);
					for (const line of output) {
						lines.push({ text: line, type: 'output' });
					}
				} else {
					lines.push({
						text: `${name}: komut bulunamadı. 'help' yazarak kullanılabilir komutları görün.`,
						type: 'error'
					});
				}
			}
			input = '';
			lines = lines;
		}
	}
</script>

<div class="terminal">
	<div class="term-output" bind:this={outputEl}>
		{#each lines as line}
			<div class="term-line" class:prompt={line.type === 'prompt'} class:error={line.type === 'error'} class:info={line.type === 'info'}>
				{line.text}
			</div>
		{/each}
	</div>
	<div class="term-input-line">
		<span class="term-prompt">user@webcde:{cwd}$&nbsp;</span>
		<input
			class="term-input"
			bind:value={input}
			onkeydown={handleKeyDown}
			autofocus
			spellcheck="false"
		/>
	</div>
</div>

<style>
	.terminal {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #0d1926;
		font-family: 'Courier New', monospace;
		font-size: 12px;
		color: #33cc33;
	}

	.term-output {
		flex: 1;
		overflow: auto;
		padding: 6px 8px;
		min-height: 0;
	}

	.term-line {
		white-space: pre-wrap;
		word-break: break-all;
		line-height: 1.4;
	}

	.term-line.prompt {
		color: #33aacc;
	}

	.term-line.error {
		color: #cc6644;
	}

	.term-line.info {
		color: #88aa88;
	}

	.term-input-line {
		display: flex;
		align-items: center;
		padding: 4px 8px;
		border-top: 1px solid #1a3344;
		background: #0a1520;
	}

	.term-prompt {
		color: #33aacc;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.term-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		color: #33cc33;
		font-family: 'Courier New', monospace;
		font-size: 12px;
		caret-color: #33cc33;
	}
</style>
