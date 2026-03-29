/**
 * Window Manager State - Svelte 5 Runes
 * CDE-style window management with workspaces
 */

let windowIdCounter = $state(1);
let windows = $state([]);
let activeWindowId = $state(null);
let currentWorkspace = $state(0);
let contextMenu = $state(null);

const WORKSPACES = ['Bir', 'İki', 'Üç', 'Dört'];

/**
 * @param {object} opts
 * @param {string} opts.title
 * @param {string} opts.app
 * @param {number} [opts.x]
 * @param {number} [opts.y]
 * @param {number} [opts.width]
 * @param {number} [opts.height]
 * @param {object} [opts.props]
 */
function openWindow(opts) {
	const id = windowIdCounter++;
	const offset = (windows.length % 8) * 30;
	const win = {
		id,
		title: opts.title,
		app: opts.app,
		x: opts.x ?? 80 + offset,
		y: opts.y ?? 60 + offset,
		width: opts.width ?? 560,
		height: opts.height ?? 420,
		minimized: false,
		maximized: false,
		workspace: currentWorkspace,
		zIndex: id,
		props: opts.props ?? {},
		// store pre-maximize geometry
		_restore: null
	};
	windows.push(win);
	activeWindowId = id;
	return id;
}

function closeWindow(id) {
	windows = windows.filter((w) => w.id !== id);
	if (activeWindowId === id) {
		const visible = windows.filter((w) => w.workspace === currentWorkspace && !w.minimized);
		activeWindowId = visible.length ? visible[visible.length - 1].id : null;
	}
}

function focusWindow(id) {
	const maxZ = Math.max(0, ...windows.map((w) => w.zIndex));
	const win = windows.find((w) => w.id === id);
	if (win) {
		win.zIndex = maxZ + 1;
		activeWindowId = id;
	}
}

function minimizeWindow(id) {
	const win = windows.find((w) => w.id === id);
	if (win) {
		win.minimized = true;
		if (activeWindowId === id) {
			const visible = windows.filter(
				(w) => w.workspace === currentWorkspace && !w.minimized && w.id !== id
			);
			activeWindowId = visible.length ? visible[visible.length - 1].id : null;
		}
	}
}

function restoreWindow(id) {
	const win = windows.find((w) => w.id === id);
	if (win) {
		win.minimized = false;
		focusWindow(id);
	}
}

function toggleMaximize(id) {
	const win = windows.find((w) => w.id === id);
	if (!win) return;
	if (win.maximized) {
		if (win._restore) {
			win.x = win._restore.x;
			win.y = win._restore.y;
			win.width = win._restore.width;
			win.height = win._restore.height;
		}
		win.maximized = false;
	} else {
		win._restore = { x: win.x, y: win.y, width: win.width, height: win.height };
		win.x = 0;
		win.y = 0;
		win.width = window.innerWidth;
		win.height = window.innerHeight - 90;
		win.maximized = true;
	}
	focusWindow(id);
}

function moveWindow(id, x, y) {
	const win = windows.find((w) => w.id === id);
	if (win) {
		win.x = x;
		win.y = y;
	}
}

function resizeWindow(id, w, h) {
	const win = windows.find((w2) => w2.id === id);
	if (win) {
		win.width = Math.max(200, w);
		win.height = Math.max(150, h);
	}
}

function switchWorkspace(idx) {
	currentWorkspace = idx;
	const visible = windows.filter((w) => w.workspace === idx && !w.minimized);
	activeWindowId = visible.length ? visible[visible.length - 1].id : null;
}

function showContextMenu(x, y, items) {
	contextMenu = { x, y, items };
}

function hideContextMenu() {
	contextMenu = null;
}

export function getWm() {
	return {
		get windows() {
			return windows;
		},
		get activeWindowId() {
			return activeWindowId;
		},
		get currentWorkspace() {
			return currentWorkspace;
		},
		get contextMenu() {
			return contextMenu;
		},
		get WORKSPACES() {
			return WORKSPACES;
		},
		get visibleWindows() {
			return windows.filter((w) => w.workspace === currentWorkspace && !w.minimized);
		},
		get workspaceWindows() {
			return windows.filter((w) => w.workspace === currentWorkspace);
		},
		openWindow,
		closeWindow,
		focusWindow,
		minimizeWindow,
		restoreWindow,
		toggleMaximize,
		moveWindow,
		resizeWindow,
		switchWorkspace,
		showContextMenu,
		hideContextMenu
	};
}
