import { json } from '@sveltejs/kit';

/**
 * Virtual file system for the CDE file manager
 */
const virtualFS = {
	'/home/user': {
		type: 'directory',
		children: [
			{ name: 'belgeler', type: 'directory', path: '/home/user/belgeler' },
			{ name: 'indirmeler', type: 'directory', path: '/home/user/indirmeler' },
			{ name: 'masaüstü', type: 'directory', path: '/home/user/masaüstü' },
			{ name: 'müzik', type: 'directory', path: '/home/user/müzik' },
			{ name: 'resimler', type: 'directory', path: '/home/user/resimler' },
			{ name: 'projeler', type: 'directory', path: '/home/user/projeler' },
			{ name: '.profile', type: 'file', size: '245 B', modified: '15 Mar 2026', path: '/home/user/.profile' },
			{ name: '.bashrc', type: 'file', size: '1.2 KB', modified: '10 Mar 2026', path: '/home/user/.bashrc' },
			{ name: 'README.txt', type: 'file', size: '892 B', modified: '20 Mar 2026', path: '/home/user/README.txt' }
		]
	},
	'/home/user/belgeler': {
		type: 'directory',
		children: [
			{ name: 'notlar.txt', type: 'file', size: '1.5 KB', modified: '25 Mar 2026', path: '/home/user/belgeler/notlar.txt' },
			{ name: 'rapor.txt', type: 'file', size: '3.2 KB', modified: '22 Mar 2026', path: '/home/user/belgeler/rapor.txt' },
			{ name: 'taslak.txt', type: 'file', size: '456 B', modified: '18 Mar 2026', path: '/home/user/belgeler/taslak.txt' }
		]
	},
	'/home/user/indirmeler': {
		type: 'directory',
		children: [
			{ name: 'kurulum.sh', type: 'file', size: '2.1 KB', modified: '20 Mar 2026', path: '/home/user/indirmeler/kurulum.sh' },
			{ name: 'belge.pdf', type: 'file', size: '156 KB', modified: '19 Mar 2026', path: '/home/user/indirmeler/belge.pdf' }
		]
	},
	'/home/user/masaüstü': {
		type: 'directory',
		children: []
	},
	'/home/user/müzik': {
		type: 'directory',
		children: []
	},
	'/home/user/resimler': {
		type: 'directory',
		children: [
			{ name: 'ekran_görüntüsü.png', type: 'file', size: '245 KB', modified: '24 Mar 2026', path: '/home/user/resimler/ekran_görüntüsü.png' }
		]
	},
	'/home/user/projeler': {
		type: 'directory',
		children: [
			{ name: 'web-cde', type: 'directory', path: '/home/user/projeler/web-cde' },
			{ name: 'betikler', type: 'directory', path: '/home/user/projeler/betikler' }
		]
	},
	'/home/user/projeler/web-cde': {
		type: 'directory',
		children: [
			{ name: 'package.json', type: 'file', size: '398 B', modified: '28 Mar 2026', path: '/home/user/projeler/web-cde/package.json' },
			{ name: 'README.md', type: 'file', size: '2.4 KB', modified: '28 Mar 2026', path: '/home/user/projeler/web-cde/README.md' },
			{ name: 'src', type: 'directory', path: '/home/user/projeler/web-cde/src' }
		]
	},
	'/home/user/projeler/web-cde/src': {
		type: 'directory',
		children: [
			{ name: 'app.html', type: 'file', size: '286 B', modified: '28 Mar 2026', path: '/home/user/projeler/web-cde/src/app.html' }
		]
	},
	'/home/user/projeler/betikler': {
		type: 'directory',
		children: [
			{ name: 'yedekle.sh', type: 'file', size: '890 B', modified: '15 Mar 2026', path: '/home/user/projeler/betikler/yedekle.sh' },
			{ name: 'temizle.sh', type: 'file', size: '234 B', modified: '12 Mar 2026', path: '/home/user/projeler/betikler/temizle.sh' }
		]
	},
	'/': {
		type: 'directory',
		children: [
			{ name: 'home', type: 'directory', path: '/home' },
			{ name: 'etc', type: 'directory', path: '/etc' },
			{ name: 'usr', type: 'directory', path: '/usr' },
			{ name: 'var', type: 'directory', path: '/var' },
			{ name: 'tmp', type: 'directory', path: '/tmp' }
		]
	},
	'/home': {
		type: 'directory',
		children: [
			{ name: 'user', type: 'directory', path: '/home/user' }
		]
	},
	'/etc': {
		type: 'directory',
		children: [
			{ name: 'hostname', type: 'file', size: '24 B', modified: '1 Oca 2026', path: '/etc/hostname' },
			{ name: 'hosts', type: 'file', size: '186 B', modified: '1 Oca 2026', path: '/etc/hosts' },
			{ name: 'passwd', type: 'file', size: '1.2 KB', modified: '1 Oca 2026', path: '/etc/passwd' }
		]
	},
	'/trash': {
		type: 'directory',
		children: []
	}
};

const fileContents = {
	'/home/user/README.txt': `Web CDE - Common Desktop Environment for the Web
==================================================

Bu proje, klasik Solaris CDE masaüstü ortamını
web tarayıcısında çalışacak şekilde yeniden oluşturur.

Özellikler:
  - Pencere yönetimi (sürükle, boyutlandır, küçült, büyüt)
  - 4 sanal çalışma alanı
  - CDE tarzı ön panel
  - Dosya yöneticisi
  - Metin düzenleyici
  - Terminal emülatörü
  - Stil yöneticisi
  - Hesap makinesi
  - Posta uygulaması

Teknolojiler:
  - Svelte 5 (Runes)
  - SvelteKit
  - Node.js 24
`,
	'/home/user/.profile': `# ~/.profile
# Kullanıcı profil dosyası

PATH=$PATH:$HOME/bin
export PATH

LANG=tr_TR.UTF-8
export LANG

PS1='\\u@\\h:\\w\\$ '
export PS1
`,
	'/home/user/.bashrc': `# ~/.bashrc
# Bash kabuk yapılandırması

# Etkileşimli olmayan kabuklar için çık
case $- in
    *i*) ;;
    *) return;;
esac

# Geçmiş ayarları
HISTSIZE=1000
HISTFILESIZE=2000
HISTCONTROL=ignoreboth

# Takma adlar
alias ll='ls -la'
alias la='ls -A'
alias l='ls -CF'
alias ..='cd ..'
alias grep='grep --color=auto'

# Bilgi istemi renklendirme
PS1='\\[\\033[01;32m\\]\\u@\\h\\[\\033[00m\\]:\\[\\033[01;34m\\]\\w\\[\\033[00m\\]\\$ '
`,
	'/home/user/belgeler/notlar.txt': `Yapılacaklar Listesi
====================

[x] Web CDE projesini başlat
[x] Pencere yöneticisini oluştur
[x] Ön paneli tasarla
[x] Dosya yöneticisini ekle
[x] Terminal emülatörünü ekle
[ ] Tema desteğini genişlet
[ ] Sürükle-bırak desteği ekle
[ ] Çoklu monitör desteği

Notlar:
- CDE renk paleti orijinaline sadık kalmalı
- Beveled (3B) kenarlıklar önemli
- Helvetica font tercih edilmeli
`,
	'/home/user/belgeler/rapor.txt': `Proje İlerleme Raporu
=====================

Proje: Web CDE
Tarih: 28 Mart 2026
Durum: Geliştirme aşamasında

1. Tamamlanan İşler
   - Temel pencere yönetimi
   - CDE tarzı görsel tema
   - Ön panel ve çalışma alanları
   - Dosya yöneticisi
   - Metin düzenleyici
   - Terminal emülatörü
   - Stil yöneticisi

2. Devam Eden İşler
   - Performans iyileştirmeleri
   - Erişilebilirlik desteği

3. Planlanan İşler
   - Sürükle-bırak pencere yönetimi
   - Gelişmiş dosya işlemleri
`,
	'/home/user/belgeler/taslak.txt': `Bu bir taslak belgedir.

Düzenlemek için Metin Düzenleyici'yi kullanın.
`,
	'/home/user/indirmeler/kurulum.sh': `#!/bin/bash
# Web CDE Kurulum Betiği

echo "Web CDE Kurulumu Başlatılıyor..."

# Bağımlılıkları kontrol et
command -v node >/dev/null 2>&1 || {
    echo "Node.js gerekli ama kurulu değil."
    exit 1
}

# Bağımlılıkları kur
npm install

# Geliştirme sunucusunu başlat
echo "Kurulum tamamlandı!"
echo "Başlatmak için: npm run dev"
`,
	'/etc/hostname': 'webcde-workstation\n',
	'/etc/hosts': `127.0.0.1   localhost
127.0.0.1   webcde-workstation
::1         localhost
`,
	'/home/user/projeler/betikler/yedekle.sh': `#!/bin/bash
# Yedekleme betiği

TARIH=$(date +%Y%m%d_%H%M%S)
YEDEK_DIZIN="/tmp/yedek_$TARIH"

mkdir -p "$YEDEK_DIZIN"
cp -r ~/belgeler "$YEDEK_DIZIN/"
cp -r ~/projeler "$YEDEK_DIZIN/"

echo "Yedekleme tamamlandı: $YEDEK_DIZIN"
`,
	'/home/user/projeler/betikler/temizle.sh': `#!/bin/bash
# Geçici dosyaları temizle

find /tmp -name "*.tmp" -mtime +7 -delete
echo "Temizlik tamamlandı."
`
};

/** @type {import('./$types').RequestHandler} */
export function GET({ url }) {
	const path = url.searchParams.get('path') || '/home/user';
	const wantContent = url.searchParams.get('content') === '1';

	if (wantContent && fileContents[path]) {
		const name = path.split('/').pop();
		return json({ name, path, content: fileContents[path] });
	}

	const dir = virtualFS[path];
	if (dir) {
		return json({ path, files: dir.children });
	}

	return json({ path, files: [], error: 'Dizin bulunamadı' });
}

/** @type {import('./$types').RequestHandler} */
export function POST({ request }) {
	// Simulate saving a file
	return json({ success: true, message: 'Dosya kaydedildi' });
}
