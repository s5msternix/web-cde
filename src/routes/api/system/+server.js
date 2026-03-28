import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export function GET() {
	return json({
		hostname: 'webcde-workstation',
		os: 'WebCDE 1.0',
		kernel: 'SunOS 5.11',
		uptime: '14 gün, 3 saat',
		user: 'user',
		shell: '/bin/bash',
		memory: '512 MB / 2048 MB',
		date: new Date().toLocaleString('tr-TR')
	});
}

/** @type {import('./$types').RequestHandler} */
export function POST({ request }) {
	// Theme change etc.
	return json({ success: true });
}
