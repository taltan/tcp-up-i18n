/**
 * Générateur de métadonnées TCP/UP
 * Construit dynamiquement les balises <meta> à partir des choix utilisateur.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- NOMENCLATURE FIGÉE ---
    const LABEL_MAP = {
        HUC: { contentOrigin: 'human', formOrigin: 'human', aiRole: 'none' },
        HCA: { contentOrigin: 'human', formOrigin: 'human-corrected', aiRole: 'technical-correction' },
        HCE: { contentOrigin: 'human', formOrigin: 'ai-assisted', aiRole: 'assisted-formulation' },
        ACE: { contentOrigin: 'hybrid', formOrigin: 'hybrid', aiRole: 'co-construction' },
        AIC: { contentOrigin: 'synthetic', formOrigin: 'ai-generated', aiRole: 'generation' }
    };

    const CONTENT_KEYS = [
        'editorial', 'visual', 'code', 'audio', 'video',
        'data', 'transcription', 'translation', 'synthesis'
    ];

    const LABELS = Object.keys(LABEL_MAP);

    // --- ÉTAT ---
    let items = [
        { key: 'editorial', label: 'HCE' } // Valeur par défaut à l'affichage
    ];

    // --- ÉLÉMENTS DOM ---
    const itemsContainer = document.getElementById('items-container');
    const outputCode = document.getElementById('output-code');
    const warningMsg = document.getElementById('warning-msg');
    const addBtn = document.getElementById('add-item-btn');
    const copyBtn = document.getElementById('copy-btnge');

    // --- FONCTIONS ---
    function render() {
        itemsContainer.innerHTML = '';

        items.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'meta-item';

            // Sélecteur de clé de contenu
            const keySelect = document.createElement('select');
            keySelect.className = 'content-key-select';
            CONTENT_KEYS.forEach(key => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = key;
                if (key === item.key) option.selected = true;
                keySelect.appendChild(option);
            });

            // Sélecteur de label
            const labelSelect = document.createElement('select');
            labelSelect.className = 'label-select';
            LABELS.forEach(label => {
                const option = document.createElement('option');
                option.value = label;
                option.textContent = `[TCP/UP: ${label}]`;
                if (label === item.label) option.selected = true;
                labelSelect.appendChild(option);
            });

            // Bouton supprimer
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-item-btn';
            removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            removeBtn.title = 'Supprimer ce contenu';

            // Événements
            keySelect.addEventListener('change', () => {
                items[index].key = keySelect.value;
                updateOutput();
            });

            labelSelect.addEventListener('change', () => {
                items[index].label = labelSelect.value;
                updateOutput();
            });

            removeBtn.addEventListener('click', () => {
                removeItem(index);
            });

            div.appendChild(keySelect);
            div.appendChild(labelSelect);
            div.appendChild(removeBtn);
            itemsContainer.appendChild(div);
        });
    }

    function removeItem(index) {
        if (items.length <= 1) {
            // On garde au moins une ligne
            items = [{ key: 'editorial', label: 'HCE' }];
        } else {
            items.splice(index, 1);
        }
        render();
        updateOutput();
    }

    function addItem() {
        items.push({ key: 'editorial', label: 'HCE' });
        render();
        updateOutput();
    }

	function updateOutput() {
		// Construction de la balise tcp-up:labels
		const labelsString = items.map(item => `${item.key}:${item.label}`).join(', ');

		// Balises meta détaillées avec coloration
		let metaTagsLines = items.map(item => {
			const map = LABEL_MAP[item.label];
			return [
				`<span class="token punctuation">&lt;</span><span class="token tag">meta</span> `,
				`<span class="token attr-name">name</span><span class="token punctuation">=</span><span class="token punctuation">"</span><span class="token attr-value">tcp-up:${item.key}-content-origin</span><span class="token punctuation">"</span> `,
				`<span class="token attr-name">content</span><span class="token punctuation">=</span><span class="token punctuation">"</span><span class="token attr-value">${map.contentOrigin}</span><span class="token punctuation">"</span><span class="token punctuation">&gt;</span>`,
			].join('') + '\n' +
			[
				`<span class="token punctuation">&lt;</span><span class="token tag">meta</span> `,
				`<span class="token attr-name">name</span><span class="token punctuation">=</span><span class="token punctuation">"</span><span class="token attr-value">tcp-up:${item.key}-form-origin</span><span class="token punctuation">"</span> `,
				`<span class="token attr-name">content</span><span class="token punctuation">=</span><span class="token punctuation">"</span><span class="token attr-value">${map.formOrigin}</span><span class="token punctuation">"</span><span class="token punctuation">&gt;</span>`,
			].join('') + '\n' +
			[
				`<span class="token punctuation">&lt;</span><span class="token tag">meta</span> `,
				`<span class="token attr-name">name</span><span class="token punctuation">=</span><span class="token punctuation">"</span><span class="token attr-value">tcp-up:${item.key}-ai-role</span><span class="token punctuation">"</span> `,
				`<span class="token attr-name">content</span><span class="token punctuation">=</span><span class="token punctuation">"</span><span class="token attr-value">${map.aiRole}</span><span class="token punctuation">"</span><span class="token punctuation">&gt;</span>`,
			].join('');
		});

		// Meta de synthèse des labels (affichée en premier)
		const synthMeta = [
			`<span class="token punctuation">&lt;</span><span class="token tag">meta</span> `,
			`<span class="token attr-name">name</span><span class="token punctuation">=</span><span class="token punctuation">"</span><span class="token attr-value">tcp-up:labels</span><span class="token punctuation">"</span> `,
			`<span class="token attr-name">content</span><span class="token punctuation">=</span><span class="token punctuation">"</span><span class="token attr-value">${labelsString}</span><span class="token punctuation">"</span><span class="token punctuation">&gt;</span>`,
		].join('');

		// Assemblage final SANS <head> ni </head>
		const coloredHtml = synthMeta + '\n' + metaTagsLines.join('\n');

		// Injection dans le <code>
		outputCode.innerHTML = coloredHtml;

		// Vérification des doublons
		const keys = items.map(i => i.key);
		const duplicates = keys.filter((k, idx) => keys.indexOf(k) !== idx);
		if (duplicates.length > 0) {
			warningMsg.style.display = 'block';
			warningMsg.textContent = `⚠️ Attention : la clé "${duplicates[0]}" est utilisée plusieurs fois. Vérifiez vos choix.`;
		} else {
			warningMsg.style.display = 'none';
		}
	}

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(outputCode.textContent);
            // Feedback visuel temporaire
            copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copié !';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copier';
            }, 2000);
        } catch (err) {
            alert('Impossible de copier. Veuillez sélectionner le code manuellement.');
        }
    }

    // --- INITIALISATION ---
    addBtn.addEventListener('click', addItem);
    copyBtn.addEventListener('click', copyToClipboard);

    render();
    updateOutput();
});
