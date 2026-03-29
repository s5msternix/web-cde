/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const res = await fetch('/api/desktop');
	const data = await res.json();
	return {
		desktopIcons: data.icons ?? [],
		system: data.system ?? {}
	};
}
