<script>
	let display = $state('0');
	let memory = $state(null);
	let operator = $state(null);
	let waitingForOperand = $state(true);

	function inputDigit(d) {
		if (waitingForOperand) {
			display = String(d);
			waitingForOperand = false;
		} else {
			display = display === '0' ? String(d) : display + d;
		}
	}

	function inputDot() {
		if (waitingForOperand) {
			display = '0.';
			waitingForOperand = false;
		} else if (!display.includes('.')) {
			display += '.';
		}
	}

	function handleOperator(op) {
		const val = parseFloat(display);
		if (memory !== null && operator && !waitingForOperand) {
			const result = calculate(memory, val, operator);
			display = String(result);
			memory = result;
		} else {
			memory = val;
		}
		operator = op;
		waitingForOperand = true;
	}

	function calculate(a, b, op) {
		switch (op) {
			case '+': return a + b;
			case '-': return a - b;
			case '*': return a * b;
			case '/': return b !== 0 ? a / b : 'Hata';
			default: return b;
		}
	}

	function handleEquals() {
		const val = parseFloat(display);
		if (memory !== null && operator) {
			const result = calculate(memory, val, operator);
			display = String(result);
			memory = null;
			operator = null;
		}
		waitingForOperand = true;
	}

	function handleClear() {
		display = '0';
		memory = null;
		operator = null;
		waitingForOperand = true;
	}

	function handleSign() {
		const val = parseFloat(display);
		display = String(-val);
	}

	function handlePercent() {
		const val = parseFloat(display);
		display = String(val / 100);
	}

	const buttons = [
		['C', '±', '%', '/'],
		['7', '8', '9', '*'],
		['4', '5', '6', '-'],
		['1', '2', '3', '+'],
		['0', '.', '=']
	];

	function handleButton(label) {
		if (label === 'C') handleClear();
		else if (label === '±') handleSign();
		else if (label === '%') handlePercent();
		else if (label === '=') handleEquals();
		else if (label === '.') inputDot();
		else if (['+', '-', '*', '/'].includes(label)) handleOperator(label);
		else inputDigit(label);
	}
</script>

<div class="calculator">
	<div class="calc-display">{display}</div>
	<div class="calc-buttons">
		{#each buttons as row}
			<div class="calc-row">
				{#each row as btn}
					<button
						class="calc-btn"
						class:operator={['+', '-', '*', '/'].includes(btn)}
						class:equals={btn === '='}
						class:zero={btn === '0'}
						class:func={['C', '±', '%'].includes(btn)}
						onclick={() => handleButton(btn)}
					>
						{btn}
					</button>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.calculator {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: var(--cde-bg-dark);
		padding: 8px;
		gap: 6px;
	}

	.calc-display {
		padding: 10px 12px;
		font-family: 'Courier New', monospace;
		font-size: 22px;
		text-align: right;
		background: #b5c8a0;
		color: #1a1a2e;
		border: 2px inset var(--cde-bg-dark);
		min-height: 40px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		overflow: hidden;
	}

	.calc-buttons {
		display: flex;
		flex-direction: column;
		gap: 4px;
		flex: 1;
	}

	.calc-row {
		display: flex;
		gap: 4px;
		flex: 1;
	}

	.calc-btn {
		flex: 1;
		font-family: 'Helvetica', 'Arial', sans-serif;
		font-size: 14px;
		font-weight: bold;
		background: var(--cde-bg);
		border: 2px outset var(--cde-bg-light);
		color: var(--cde-text);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.calc-btn:active {
		border-style: inset;
	}

	.calc-btn.operator {
		background: #cc8844;
		color: #fff;
		border-color: #dd9955;
	}

	.calc-btn.equals {
		background: var(--cde-highlight);
		color: #fff;
		border-color: var(--cde-active-title);
	}

	.calc-btn.zero {
		flex: 2;
	}

	.calc-btn.func {
		background: var(--cde-bg-light);
	}
</style>
