// download.js - Version complète avec disposition demandée
// (Titre à gauche, boutons SVG/WEBP au centre, badge HTML à droite)

const labels = [
	{ id: 'HUC', slug: 'huc', color: '#22c55e', url: 'https://tcp-up.org/pages/label-huc.html', tName: 'Human Content', tDetails: 'Fond : humain | Forme : humaine', tFooter: "Aucune IA n’a été utilisée dans ce processus de création" },
	{ id: 'HCA', slug: 'hca', color: '#38bdf8', url: 'https://tcp-up.org/pages/label-hca.html', tName: 'Human-Centric Assistance', tDetails: 'Fond : humain | Forme : humaine avec correction technique', tFooter: "IA utilisée exclusivement pour la correction orthographique, grammaticale ou syntaxique" },
	{ id: 'HCE', slug: 'hce', color: '#818cf8', url: 'https://tcp-up.org/pages/label-hce.html', tName: 'Human-Centric Editing', tDetails: 'Fond : humain | Forme : assistée par IA', tFooter: "L’intention, les idées et la structure sont humaines, l’IA a aidé à la formulation ou à la mise en forme" },
	{ id: 'ACE', slug: 'ace', color: '#f59e0b', url: 'https://tcp-up.org/pages/label-ace.html', tName: 'AI-Centric Editing', tDetails: 'Fond : hybride | Forme : hybride', tFooter: "Résultat d’une co-construction entre l’auteur et l’intelligence artificielle" },
	{ id: 'AIC', slug: 'aic', color: '#f43f5e', url: 'https://tcp-up.org/pages/label-aic.html', tName: 'AI Content', tDetails: 'Fond : généré majoritairement ou intégralement par IA | Forme : générée par IA', tFooter: "Contenu produit par IA avec intervention humaine limitée" }
];

const baseStyle = "display: inline-block; font-size: 14px; font-weight: bold; padding: 6px 14px; border-radius: 8px; font-family: 'Courier New', Courier, monospace; text-decoration: none; border-style: solid;";

function hexToRgb(hex) {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `${r}, ${g}, ${b}`;
}

const categories = [
	{ id: 'co', name: 'Couleur (_co)', bgLight: false,
		getStyleSimple: (l) => `background-color: ${l.color}; color: #0f172a; border-width: 1px 1px 1px 9px; border-color: ${l.color};`,
		fullColors: (l) => ({ bg: l.color, border: l.color, borderLeft: l.color, header: '#0f172a', details: '#0f172a', footer: '#0f172a', divider: 'rgba(0,0,0,0.2)' })
	},
	{ id: 'bc', name: 'Noir & Couleur (_bc)', bgLight: false,
		getStyleSimple: (l) => `background-color: ${l.color}; color: #000000; border-width: 1px 1px 1px 9px; border-color: #000000;`,
		fullColors: (l) => ({ bg: l.color, border: '#000000', borderLeft: '#000000', header: '#000000', details: '#000000', footer: '#000000', divider: 'rgba(0,0,0,0.2)' })
	},
	{ id: 'wb', name: 'Blanc & Noir (_wb)', bgLight: false,
		getStyleSimple: (l) => `background-color: #ffffff; color: #000000; border-width: 1px 1px 1px 9px; border-color: #000000;`,
		fullColors: (l) => ({ bg: '#ffffff', border: '#000000', borderLeft: '#000000', header: '#000000', details: '#000000', footer: '#000000', divider: 'rgba(0,0,0,0.1)' })
	},
	{ id: 'bw', name: 'Noir & Blanc (_bw)', bgLight: false,
		getStyleSimple: (l) => `background-color: #000000; color: #ffffff; border-width: 1px 1px 1px 9px; border-color: #000000;`,
		fullColors: (l) => ({ bg: '#000000', border: '#000000', borderLeft: '#000000', header: '#ffffff', details: '#ffffff', footer: '#ffffff', divider: 'rgba(255,255,255,0.2)' })
	},
	{ id: 'tr_co', name: 'Transparent Couleur (_tr_co)', bgLight: false,
		getStyleSimple: (l) => `background: rgba(255,255,255,0.02); color: ${l.color}; border-width: 1px 1px 1px 9px; border-color: rgba(${hexToRgb(l.color)}, 0.3); border-left-color: ${l.color};`,
		fullColors: (l) => ({ bg: 'rgba(255,255,255,0.02)', border: `rgba(${hexToRgb(l.color)}, 0.3)`, borderLeft: l.color, header: l.color, details: '#ffffff', footer: '#64748b', divider: 'rgba(255,255,255,0.05)' })
	},
	{ id: 'tr_wh', name: 'Transparent Blanc (_tr_wh)', bgLight: true,
		getStyleSimple: (l) => `background: transparent; color: #ffffff; border-width: 1px 1px 1px 9px; border-color: rgba(255,255,255,0.2); border-left-color: #ffffff;`,
		fullColors: (l) => ({ bg: 'transparent', border: 'rgba(255,255,255,0.3)', borderLeft: '#ffffff', header: '#ffffff', details: '#ffffff', footer: 'rgba(255,255,255,0.8)', divider: 'rgba(255,255,255,0.2)' })
	},
	{ id: 'tr_bl', name: 'Transparent Noir (_tr_bl)', bgLight: true,
		getStyleSimple: (l) => `background: transparent; color: #000000; border-width: 1px 1px 1px 9px; border-color: rgba(0,0,0,0.1); border-left-color: #000000;`,
		fullColors: (l) => ({ bg: 'transparent', border: 'rgba(0,0,0,0.3)', borderLeft: '#000000', header: '#000000', details: '#000000', footer: 'rgba(0,0,0,0.8)', divider: 'rgba(0,0,0,0.1)' })
	}
];

function getFullBadgeHtml(label, cat) {
	const c = cat.fullColors(label);
	return `<a href="${label.url}" target="_blank" rel="noopener noreferrer" style="display:flex;flex-direction:column;gap:8px;padding:16px 20px;border-radius:8px;background:${c.bg};max-width:fit-content;text-align:left;font-family:'Courier New',Courier,monospace;text-decoration:none;border:1px solid ${c.border};border-left:9px solid ${c.borderLeft};margin-bottom:1rem;"><div style="color:${c.header};font-size:0.95rem;letter-spacing:0.5px;">Déclaration : <strong style="font-weight:bold;">[TCP/UP: ${label.id}]</strong> (${label.tName})</div><div style="color:${c.details};font-size:0.85rem;font-weight:bold;opacity:0.9;">${label.tDetails}</div><div style="color:${c.footer};font-size:0.8rem;font-style:italic;border-top:1px solid ${c.divider};padding-top:8px;">${label.tFooter}</div></a>`;
}

function escapeHtml(text) {
	return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function initStyleSelector() {
	const selector = document.getElementById('styleSelector');
	const previewDiv = document.getElementById('stylePreview');
	const container = document.getElementById('badges-container');

	categories.forEach(cat => {
		const option = document.createElement('option');
		option.value = cat.id;
		option.textContent = cat.name;
		selector.appendChild(option);
	});

	function updateForCategory(catId) {
		const cat = categories.find(c => c.id === catId);
		if (!cat) return;

		// Aperçu : badge HTML simple HUC uniquement
		const huc = labels[0];
		const htmlPreview = `<a href="${huc.url}" target="_blank" rel="noopener noreferrer" style="${baseStyle} ${cat.getStyleSimple(huc)}">[TCP/UP: HUC]</a>`;
		previewDiv.innerHTML = `<div style="display: flex; align-items: center; min-height: 50px;">${htmlPreview}</div>`;

		let html = '<div class="resource-grid">';
		labels.forEach(label => {
			const svgPath = `../img/badges/svg/badge_${label.slug}_${cat.id}.svg`;
			const webpPath = `../img/badges/webp/badge_${label.slug}_${cat.id}.webp`;
			const htmlSimple = `<a href="${label.url}" target="_blank" rel="noopener noreferrer" style="${baseStyle} ${cat.getStyleSimple(label)}">[TCP/UP: ${label.id}]</a>`;
			const htmlFull = getFullBadgeHtml(label, cat);
			const textSimple = `[TCP/UP: ${label.id}]`;
			const textFull = `Déclaration : [TCP/UP: ${label.id}] (${label.tName})\n> ${label.tDetails}\n> ${label.tFooter}`;

			html += `
				<div class="label-resource-card">
					<div class="label-header">
						<div class="label-title-group">
							<span class="label-color-dot" style="background-color: ${label.color};"></span>
							<h3>Label ${label.id} - ${label.tName}</h3>
						</div>
						<div class="label-download-buttons">
							<a href="${svgPath}" download class="btn-icon"><i class="fa-solid fa-download"></i> SVG</a>
							<a href="${webpPath}" download class="btn-icon"><i class="fa-solid fa-download"></i> WEBP</a>
						</div>
						<div class="label-badge-preview">
							${htmlSimple}
						</div>
					</div>
					<div class="resource-rows">
						<div class="resource-row">
							<!-- Texte simple -->
							<div class="resource-item">
								<div class="resource-header">
									<span class="resource-title">Texte pur - Signature simple</span>
									<button class="copy-btn" data-copy="${escapeHtml(textSimple).replace(/"/g, '&quot;')}"><i class="fa-regular fa-copy"></i> Copier</button>
								</div>
								<div class="code-block" style="white-space: pre-wrap;">${escapeHtml(textSimple)}</div>
							</div>
							<!-- Texte complet -->
							<div class="resource-item">
								<div class="resource-header">
									<span class="resource-title">Texte pur - Signature complète</span>
									<button class="copy-btn" data-copy="${escapeHtml(textFull).replace(/"/g, '&quot;')}"><i class="fa-regular fa-copy"></i> Copier</button>
								</div>
								<div class="code-block" style="white-space: pre-wrap;">${escapeHtml(textFull)}</div>
							</div>
						</div>
						<div class="resource-row">
							<!-- HTML simple -->
							<div class="resource-item">
								<div class="resource-header">
									<span class="resource-title">Code HTML - Badge simple</span>
									<button class="copy-btn" data-copy="${escapeHtml(htmlSimple).replace(/"/g, '&quot;')}"><i class="fa-regular fa-copy"></i> Copier</button>
								</div>
								<div class="code-block">${escapeHtml(htmlSimple)}</div>
							</div>
							<!-- HTML complet -->
							<div class="resource-item">
								<div class="resource-header">
									<span class="resource-title">Code HTML - Badge complet</span>
									<button class="copy-btn" data-copy="${escapeHtml(htmlFull).replace(/"/g, '&quot;')}"><i class="fa-regular fa-copy"></i> Copier</button>
								</div>
								<div class="code-block">${escapeHtml(htmlFull)}</div>
							</div>
						</div>
					</div>
				</div>
			`;
		});
		html += '</div>';
		container.innerHTML = html;

		// Réattacher les événements de copie
		document.querySelectorAll('.copy-btn').forEach(btn => {
			btn.addEventListener('click', function() {
				const textToCopy = this.getAttribute('data-copy');
				navigator.clipboard.writeText(textToCopy).then(() => {
					const original = this.innerHTML;
					this.innerHTML = '<i class="fa-solid fa-check"></i> Copié !';
					setTimeout(() => { this.innerHTML = original; }, 2000);
				});
			});
		});
	}

	selector.addEventListener('change', (e) => updateForCategory(e.target.value));

	if (categories.length) {
		selector.value = categories[0].id;
		updateForCategory(categories[0].id);
	}
}

window.addEventListener('DOMContentLoaded', initStyleSelector);
