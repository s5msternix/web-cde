import { json } from '@sveltejs/kit';

const helpTopics = [
	{
		id: 'welcome',
		title: 'Web CDE Hakkında',
		sections: [
			{
				heading: 'Hoş Geldiniz',
				text: 'Web CDE, klasik Solaris CDE (Common Desktop Environment) masaüstü ortamının web tarayıcısında çalışan modern bir yorumudur. CDE, 1990\'larda Unix iş istasyonlarında yaygın olarak kullanılan bir masaüstü ortamıydı.'
			},
			{
				heading: 'Tarihçe',
				text: 'CDE (Common Desktop Environment), HP, IBM, Novell ve Sun Microsystems tarafından ortaklaşa geliştirilmiştir. 1993 yılında duyurulmuş ve uzun yıllar boyunca ticari Unix sistemlerinin standart masaüstü ortamı olmuştur.'
			}
		]
	},
	{
		id: 'windows',
		title: 'Pencere Yönetimi',
		sections: [
			{
				heading: 'Pencere İşlemleri',
				text: 'Pencereleri başlık çubuğundan tutup sürükleyerek taşıyabilirsiniz. Sağ alt köşedeki tutamacı kullanarak yeniden boyutlandırabilirsiniz.'
			},
			{
				heading: 'Pencere Düğmeleri',
				text: 'Her pencerenin başlık çubuğunda küçültme ve büyütme düğmeleri bulunur. Sol üstteki menü düğmesi pencereyi kapatır. Başlık çubuğuna çift tıklayarak pencereyi büyütüp küçültebilirsiniz.'
			}
		]
	},
	{
		id: 'panel',
		title: 'Ön Panel',
		sections: [
			{
				heading: 'Ön Panel Nedir?',
				text: 'Ekranın altındaki panel, CDE\'nin karakteristik özelliklerinden biridir. Uygulama başlatıcılar, çalışma alanı değiştirici, saat ve sistem düğmeleri içerir.'
			},
			{
				heading: 'Çalışma Alanları',
				text: 'CDE dört adet sanal çalışma alanı sunar. Her çalışma alanında farklı pencereler açık olabilir. Çalışma alanları arasında geçiş yapmak için ön paneldeki düğmeleri kullanın.'
			}
		]
	},
	{
		id: 'apps',
		title: 'Uygulamalar',
		sections: [
			{
				heading: 'Dosya Yöneticisi',
				text: 'Dosya Yöneticisi, sanal dosya sisteminizi gezmenize olanak tanır. Klasörlere çift tıklayarak açabilir, dosyaları metin düzenleyicide görüntüleyebilirsiniz.'
			},
			{
				heading: 'Metin Düzenleyici',
				text: 'Basit bir metin düzenleyici. Yeni dosyalar oluşturabilir veya mevcut dosyaları düzenleyebilirsiniz.'
			},
			{
				heading: 'Terminal',
				text: 'Terminal emülatörü, temel komutları çalıştırmanıza olanak tanır. "help" yazarak kullanılabilir komutların listesini görebilirsiniz.'
			},
			{
				heading: 'Stil Yöneticisi',
				text: 'Masaüstü renk paletini değiştirmek için Stil Yöneticisi\'ni kullanın. Klasik CDE renk şemalarından birini seçebilirsiniz.'
			}
		]
	},
	{
		id: 'keyboard',
		title: 'Kısayollar',
		sections: [
			{
				heading: 'Pencere Kısayolları',
				text: 'Başlık çubuğuna çift tıklama: Pencereyi büyüt/küçült. Sağ alt köşeyi sürükleme: Pencereyi yeniden boyutlandır.'
			},
			{
				heading: 'Masaüstü',
				text: 'Masaüstüne sağ tıklama: Bağlam menüsünü açar. Masaüstü simgelerine çift tıklama: İlgili uygulamayı açar.'
			}
		]
	}
];

const mailMessages = [
	{
		id: 1,
		from: 'root@webcde',
		subject: 'Sisteme Hoş Geldiniz',
		date: '28 Mar 2026',
		read: false,
		body: `Sayın Kullanıcı,

Web CDE sistemine hoş geldiniz!

Bu sistem, klasik Solaris CDE masaüstü ortamının web tabanlı bir sürümüdür.
Ön paneli kullanarak uygulamalara erişebilir, çalışma alanları arasında geçiş yapabilirsiniz.

Herhangi bir sorunuz varsa, Yardım uygulamasını açarak daha fazla bilgi edinebilirsiniz.

İyi çalışmalar,
Sistem Yöneticisi`
	},
	{
		id: 2,
		from: 'admin@sunos.local',
		subject: 'Sistem Bakım Bildirimi',
		date: '27 Mar 2026',
		read: true,
		body: `Merhaba,

Planlı sistem bakımı 30 Mart 2026 tarihinde saat 02:00-04:00 arasında gerçekleştirilecektir.

Bu süre zarfında sistem erişimi kısıtlı olabilir.

Anlayışınız için teşekkürler.

Sistem Yönetimi`
	},
	{
		id: 3,
		from: 'noreply@cde-project.org',
		subject: 'CDE Güncelleme Notları v1.0',
		date: '25 Mar 2026',
		read: true,
		body: `Web CDE v1.0 Sürüm Notları:

- Pencere yönetimi iyileştirildi
- Dört çalışma alanı desteği eklendi
- Stil Yöneticisi ile tema değiştirme
- Dosya Yöneticisi yenilendi
- Terminal emülatörü eklendi
- Hesap Makinesi eklendi
- Posta uygulaması eklendi

Keyifli kullanımlar!`
	}
];

/** @type {import('./$types').RequestHandler} */
export function GET({ url }) {
	const type = url.searchParams.get('type');

	if (type === 'help') {
		return json({ topics: helpTopics });
	}

	if (type === 'mail') {
		return json({ messages: mailMessages });
	}

	// Default: desktop icons and info
	return json({
		icons: [
			{ id: 'home', label: 'Ev Klasörü', icon: 'home', app: 'filemanager', title: 'Ev Klasörü' },
			{ id: 'trash', label: 'Çöp Kutusu', icon: 'trash', app: 'filemanager', title: 'Çöp Kutusu', props: { path: '/trash' } },
			{ id: 'help', label: 'Yardım', icon: 'help', app: 'help', title: 'Yardım' },
			{ id: 'terminal', label: 'Terminal', icon: 'terminal', app: 'terminal', title: 'Terminal' }
		],
		system: {
			hostname: 'webcde-workstation',
			os: 'WebCDE 1.0 (SunOS 5.11)',
			user: 'user'
		}
	});
}
