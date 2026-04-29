//(function() {
	//const pageUrl = encodeURIComponent(window.location.href);
	//const pageTitle = encodeURIComponent(document.title);
	//document.getElementById('share-bluesky').href = `https://bsky.app/intent/compose?text=${pageTitle}%20${pageUrl}`;
	//document.getElementById('share-linkedin').href = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
//})();


(function() {
	const pageUrl = encodeURIComponent(window.location.href);
	const pageTitle = encodeURIComponent(document.title);
	document.getElementById('share-bluesky').href = `https://bsky.app/intent/compose?text=${pageTitle}%20${pageUrl}`;
	// Utilisation de l'API LinkedIn ShareArticle (plus fiable pour le pré-remplissage)
	document.getElementById('share-linkedin').href = `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}`;
})();
