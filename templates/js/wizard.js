/**
 * TCP/UP - Assistant interactif de choix de label (Wizard)
 */
(function(){
	// Définition des labels avec leurs propriétés
	const labels = {
		HUC: {
			name: 'Human Content',
			description: 'Aucune IA utilisée. Contenu déclaré d’origine humaine.',
			color: '#22c55e',
			svgPath: '../img/badges/svg/badge_huc_co.svg',
			detailUrl: 'label-huc.html',
			downloadUrl: 'download.html#badges'
		},
		HCA: {
			name: 'Human-Centric Assistance',
			description: 'Correction technique uniquement (orthographe, grammaire).',
			color: '#38bdf8',
			svgPath: '../img/badges/svg/badge_hca_co.svg',
			detailUrl: 'label-hca.html',
			downloadUrl: 'download.html#badges'
		},
		HCE: {
			name: 'Human-Centric Editing',
			description: 'Fond humain, formulation assistée par IA.',
			color: '#818cf8',
			svgPath: '../img/badges/svg/badge_hce_co.svg',
			detailUrl: 'label-hce.html',
			downloadUrl: 'download.html#badges'
		},
		ACE: {
			name: 'AI-Centric Editing',
			description: 'Co-construction entre humain et IA.',
			color: '#f59e0b',
			svgPath: '../img/badges/svg/badge_ace_co.svg',
			detailUrl: 'label-ace.html',
			downloadUrl: 'download.html#badges'
		},
		AIC: {
			name: 'AI Content',
			description: 'Contenu majoritairement ou intégralement généré par IA.',
			color: '#f43f5e',
			svgPath: '../img/badges/svg/badge_aic_co.svg',
			detailUrl: 'label-aic.html',
			downloadUrl: 'download.html#badges'
		}
	};

	// État du wizard
	let currentStep = 0;
	let answers = {};

	// Questions
	const questions = [
		{
			text: "L'IA a-t-elle été utilisée à un moment du processus de création ?",
			choices: [
				{ text: "Non, aucune IA", next: 'HUC' },
				{ text: "Oui", next: 1 }
			]
		},
		{
			text: "Comment l'IA est-elle intervenue ?",
			choices: [
				{ text: "Correction orthographe/grammaire uniquement", next: 'HCA' },
				{ text: "Reformulation, traduction, mise en forme", next: 2 },
				{ text: "Génération de contenu ou d'idées", next: 3 }
			]
		},
		{
			text: "Qui a défini la structure et les idées principales ?",
			choices: [
				{ text: "Moi, à 100%. L'IA n'a fait que polir.", next: 'HCE' },
				{ text: "L'IA a contribué à la structure ou aux idées.", next: 3 }
			]
		},
		{
			text: "Quelle est la part de votre intervention sur le résultat final ?",
			choices: [
				{ text: "J'ai retravaillé/validé activement", next: 'ACE' },
				{ text: "J'ai lancé le prompt et validé sans modification majeure", next: 'AIC' }
			]
		}
	];

	const totalSteps = questions.length;

	// Éléments DOM
	const stepEl = document.getElementById('wizard-step');
	const progressEl = document.getElementById('wizard-progress');
	const choicesEl = document.getElementById('wizard-choices');

	// Template résultat
	const resultTemplate = document.getElementById('result-template');

	// Mise à jour de l'affichage
	function renderStep(stepIndex) {
		stepEl.innerHTML = '';
		choicesEl.innerHTML = '';

		const progressPercent = (stepIndex / totalSteps) * 100;
		progressEl.innerHTML = `
			<div class="progress-bar-container">
				<div class="progress-bar-fill" style="width: ${progressPercent}%;"></div>
			</div>
			<div class="progress-text">Question ${stepIndex+1}/${totalSteps}</div>
		`;

		const question = questions[stepIndex];
		stepEl.innerHTML = `<h2 class="wizard-question">${question.text}</h2>`;

		question.choices.forEach(choice => {
			const btn = document.createElement('button');
			btn.className = 'wizard-choice-btn';
			btn.textContent = choice.text;
			btn.addEventListener('click', () => handleChoice(choice.next));
			choicesEl.appendChild(btn);
		});
	}

	function handleChoice(next) {
		if (typeof next === 'string') {
			showResult(next);
		} else {
			currentStep = next;
			renderStep(currentStep);
		}
	}

	function showResult(labelKey) {
		const label = labels[labelKey];
		if (!label) return;

		stepEl.innerHTML = '';
		progressEl.innerHTML = '';
		choicesEl.innerHTML = '';

		const clone = resultTemplate.content.cloneNode(true);
		choicesEl.appendChild(clone);

		// Remplacer le contenu du span result-badge par une image SVG
		const resultBadge = document.getElementById('result-badge');
		resultBadge.innerHTML = ''; // vider le texte existant
		const img = document.createElement('img');
		img.src = label.svgPath;
		img.alt = `Badge ${labelKey}`;
		img.style.height = '37px';
		img.style.width = 'auto';
		img.style.display = 'inline-block';
		resultBadge.appendChild(img);
		// On conserve le style du conteneur pour le centrage éventuel
		resultBadge.style.display = 'block';
		resultBadge.style.marginBottom = '1rem';
		resultBadge.style.textAlign = 'center';

		document.getElementById('result-title').textContent = `${labelKey} – ${label.name}`;
		document.getElementById('result-description').textContent = label.description;

		const downloadLink = document.getElementById('result-download-link');
		downloadLink.href = label.downloadUrl;
		
		const detailLink = document.getElementById('result-detail-link');
		detailLink.href = label.detailUrl;

		document.getElementById('restart-wizard').addEventListener('click', () => {
			currentStep = 0;
			renderStep(currentStep);
		});
	}

	// Initialisation
	renderStep(0);
})();
