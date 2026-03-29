/**
 * CDE-style SVG icons
 * Pixel-art inspired, muted colors matching the CDE aesthetic
 */

export const icons = {
	filemanager: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
		<rect x="3" y="8" width="26" height="20" rx="1" fill="#c4a86b" stroke="#5d4e37" stroke-width="1.5"/>
		<path d="M3 8 L3 6 Q3 4 5 4 L13 4 L16 8 Z" fill="#d4b87b" stroke="#5d4e37" stroke-width="1.5"/>
		<rect x="5" y="11" width="22" height="15" rx="0.5" fill="#e8d9a0"/>
	</svg>`,

	texteditor: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
		<rect x="5" y="2" width="22" height="28" rx="1" fill="#e8e0cc" stroke="#5d4e37" stroke-width="1.5"/>
		<line x1="9" y1="8" x2="23" y2="8" stroke="#4a6178" stroke-width="1.5"/>
		<line x1="9" y1="12" x2="21" y2="12" stroke="#4a6178" stroke-width="1.5"/>
		<line x1="9" y1="16" x2="22" y2="16" stroke="#4a6178" stroke-width="1.5"/>
		<line x1="9" y1="20" x2="18" y2="20" stroke="#4a6178" stroke-width="1.5"/>
		<line x1="9" y1="24" x2="20" y2="24" stroke="#4a6178" stroke-width="1.5"/>
	</svg>`,

	terminal: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
		<rect x="2" y="4" width="28" height="24" rx="2" fill="#1a1a2e" stroke="#5d4e37" stroke-width="1.5"/>
		<rect x="4" y="6" width="24" height="20" rx="1" fill="#0d1926"/>
		<text x="7" y="16" font-family="monospace" font-size="8" fill="#33cc33">$_</text>
		<polyline points="7,20 11,17 7,14" fill="none" stroke="#33cc33" stroke-width="1.5"/>
		<line x1="13" y1="20" x2="20" y2="20" stroke="#33cc33" stroke-width="1.5"/>
	</svg>`,

	style: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
		<rect x="4" y="4" width="24" height="24" rx="2" fill="#8b7355" stroke="#5d4e37" stroke-width="1.5"/>
		<rect x="7" y="7" width="8" height="8" rx="1" fill="#cc6644"/>
		<rect x="17" y="7" width="8" height="8" rx="1" fill="#4a7a8c"/>
		<rect x="7" y="17" width="8" height="8" rx="1" fill="#7a9a5a"/>
		<rect x="17" y="17" width="8" height="8" rx="1" fill="#c4a86b"/>
	</svg>`,

	help: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
		<circle cx="16" cy="16" r="13" fill="#4a7a8c" stroke="#2d4a56" stroke-width="1.5"/>
		<text x="16" y="22" font-family="serif" font-size="18" font-weight="bold" fill="#e8e0cc" text-anchor="middle">?</text>
	</svg>`,

	lock: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
		<rect x="8" y="14" width="16" height="14" rx="2" fill="#8b7355" stroke="#5d4e37" stroke-width="1.5"/>
		<path d="M11 14 V10 Q11 4 16 4 Q21 4 21 10 V14" fill="none" stroke="#5d4e37" stroke-width="2"/>
		<circle cx="16" cy="21" r="2" fill="#1a1a2e"/>
	</svg>`,

	exit: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
		<rect x="4" y="4" width="24" height="24" rx="2" fill="#993333" stroke="#662222" stroke-width="1.5"/>
		<line x1="10" y1="10" x2="22" y2="22" stroke="#e8e0cc" stroke-width="2.5"/>
		<line x1="22" y1="10" x2="10" y2="22" stroke="#e8e0cc" stroke-width="2.5"/>
	</svg>`,

	home: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
		<polygon points="16,3 3,16 7,16 7,28 13,28 13,20 19,20 19,28 25,28 25,16 29,16" fill="#c4a86b" stroke="#5d4e37" stroke-width="1.5"/>
		<rect x="13" y="20" width="6" height="8" fill="#8b7355" stroke="#5d4e37" stroke-width="1"/>
	</svg>`,

	file: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
		<path d="M7 2 L7 30 L25 30 L25 10 L17 2 Z" fill="#e8e0cc" stroke="#5d4e37" stroke-width="1.5"/>
		<path d="M17 2 L17 10 L25 10" fill="#d4c8a0" stroke="#5d4e37" stroke-width="1.5"/>
	</svg>`,

	folder: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
		<rect x="3" y="8" width="26" height="20" rx="1" fill="#c4a86b" stroke="#5d4e37" stroke-width="1.5"/>
		<path d="M3 8 L3 6 Q3 4 5 4 L13 4 L16 8 Z" fill="#d4b87b" stroke="#5d4e37" stroke-width="1.5"/>
	</svg>`,

	trash: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
		<rect x="8" y="8" width="16" height="20" rx="1" fill="#999" stroke="#5d4e37" stroke-width="1.5"/>
		<rect x="6" y="5" width="20" height="3" rx="1" fill="#aaa" stroke="#5d4e37" stroke-width="1.5"/>
		<rect x="12" y="3" width="8" height="3" rx="1" fill="#bbb" stroke="#5d4e37" stroke-width="1"/>
		<line x1="12" y1="12" x2="12" y2="24" stroke="#5d4e37" stroke-width="1.5"/>
		<line x1="16" y1="12" x2="16" y2="24" stroke="#5d4e37" stroke-width="1.5"/>
		<line x1="20" y1="12" x2="20" y2="24" stroke="#5d4e37" stroke-width="1.5"/>
	</svg>`,

	clock: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
		<circle cx="16" cy="16" r="13" fill="#e8e0cc" stroke="#5d4e37" stroke-width="1.5"/>
		<circle cx="16" cy="16" r="11" fill="#f0eaD8" stroke="#8b7355" stroke-width="1"/>
		<line x1="16" y1="16" x2="16" y2="8" stroke="#1a1a2e" stroke-width="2" stroke-linecap="round"/>
		<line x1="16" y1="16" x2="22" y2="16" stroke="#1a1a2e" stroke-width="1.5" stroke-linecap="round"/>
		<circle cx="16" cy="16" r="1.5" fill="#1a1a2e"/>
	</svg>`,

	mail: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
		<rect x="3" y="7" width="26" height="18" rx="2" fill="#e8e0cc" stroke="#5d4e37" stroke-width="1.5"/>
		<polyline points="3,7 16,18 29,7" fill="none" stroke="#5d4e37" stroke-width="1.5"/>
	</svg>`,

	calculator: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
		<rect x="6" y="2" width="20" height="28" rx="2" fill="#8b8b8b" stroke="#5d4e37" stroke-width="1.5"/>
		<rect x="8" y="4" width="16" height="8" rx="1" fill="#b5c8a0"/>
		<rect x="8" y="14" width="4" height="4" rx="0.5" fill="#d4c8a0"/>
		<rect x="14" y="14" width="4" height="4" rx="0.5" fill="#d4c8a0"/>
		<rect x="20" y="14" width="4" height="4" rx="0.5" fill="#cc8844"/>
		<rect x="8" y="20" width="4" height="4" rx="0.5" fill="#d4c8a0"/>
		<rect x="14" y="20" width="4" height="4" rx="0.5" fill="#d4c8a0"/>
		<rect x="20" y="20" width="4" height="4" rx="0.5" fill="#cc8844"/>
		<rect x="8" y="26" width="10" height="3" rx="0.5" fill="#d4c8a0"/>
		<rect x="20" y="26" width="4" height="3" rx="0.5" fill="#4a7a8c"/>
	</svg>`,

	minimize: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
		<rect x="3" y="11" width="10" height="2" fill="currentColor"/>
	</svg>`,

	maximize: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
		<rect x="2" y="2" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"/>
		<rect x="2" y="2" width="12" height="3" fill="currentColor"/>
	</svg>`,

	close: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
		<line x1="3" y1="3" x2="13" y2="13" stroke="currentColor" stroke-width="2"/>
		<line x1="13" y1="3" x2="3" y2="13" stroke="currentColor" stroke-width="2"/>
	</svg>`,

	restore: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
		<rect x="4" y="4" width="9" height="9" fill="none" stroke="currentColor" stroke-width="1.5"/>
		<rect x="4" y="4" width="9" height="2.5" fill="currentColor"/>
		<polyline points="3,7 3,3 10,3" fill="none" stroke="currentColor" stroke-width="1.5"/>
	</svg>`
};
