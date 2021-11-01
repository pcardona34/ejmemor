/* ==================================== *
 *         Template Exercice            *
 * ==================================== *
 * (c)2021 - Patrick Cardona       *
 * Licence GPL version 3 ou ultérieure  *
 * VOIR la licence complète à la racine *
 * ==================================== */

/* CommonJS compatible format */

const Popup = require('./messageModule.js').Popup;
const popup = new Popup();

/* ======================================= *
 *  Skelapp - Exercice : Core functions    *
 * ======================================= *
 * Utilisation d'une instance de l'exercice 
 * dans le template 'ExerciceTemplate.hbs' 
 */

/* Données de l'exercice
 * A compléter avec les données fournies
 * Dans le fichier JSON propre à cet exercice */
var exercice = {
	"series": [],
	"cartes": 0,
	"i": 0
};

/* On initialise l'objet exercice à partir des données de l'interface : 
 * On vérifie que toutes les données utiles sont présentes : succès => true
 */

exercice.init = function (series) {
	this.series = series;
	this.i = 0;
	this.cartes = 0;
};
/* Fin de la méthode init() */

/* Insérer ici les méthodes en lien avec la logique propre à l'exercice */

/*  On masque au début les contrôles de mémorisation
ainsi que le bouton Retourner */
exercice.masquerBoutons = function () {
	$(".reaction").hide();
	$("#retourner").hide();
};

/* Série terminée */
exercice.finir = function (){
		/* Message de fin */
		$("#boite").html("<i class=\"icon-smile\"><br />Série mémorisée !");
		/* Sur fond bleu */
		$("#boite").toggleClass("bleu");
		/* On masque les contrôles */
		$("#retourner").hide();
		$("#info-cartes").hide();
};
	
/* Commencer ou continuer */
exercice.commencer = function (){
		/* On affiche le bouton Retourner */
		$("#retourner").show();
		/* On masque les boutons d'action */
		$("#actions").hide();
		/* On affiche le nombre de cartes restant à mémoriser */
		$("#info-cartes").show();

		/* Le nombre de cartes restantes au début de ce cycle */
		this.cartes = this.series.length;
		/* S'il ne reste aucune carte... */ 
		if(this.cartes == 0){
			this.finir();
		}else{
			/* On mélange la pile */
			this.series.sort(function() {return 0.5 - Math.random()});
			/* On tire la carte i */	
			$("#boite").html(this.series[this.i]['ques']);
			/* On inverse les couleurs */
			$("#boite").toggleClass("vert");
			$("#boite").toggleClass("blanc");
		}
};
	
/* On retourne la carte */
exercice.retourner = function () {
		/* On masque le bouton Retourner */
		$("#retourner").hide();
		/* On affiche le verso de la carte */
		$("#boite").html(this.series[this.i]['ans']);
		/* On inverse les couleurs */
		$("#boite").toggleClass("blanc");
		$("#boite").toggleClass("vert");
		/* On montre les contrôles de mémorisation */
		$(".reaction").show();
};
	
/* Je ne sais pas encore */
exercice.jenelesaispasencore = function () {
		/* On masque les contrôles */
		$(".reaction").hide();
		$("#retourner").show();
		/* On affiche une carte... */
		this.commencer();
};

/* Je le sais déjà */
exercice.jelesaisdeja = function () {	
/* On a mémorisé une carte */
		// On masque les contrôles :
		$(".reaction").hide();
		$("#retourner").show();
		/* On retire cette carte de la pile */
		this.series.splice(this.i, 1);
		/* On actualise le nombre de cartes */
		this.cartes = this.series.length;
		$("#nombre").html(this.cartes);
		/* On teste : fin du paquet ? */
		if(this.cartes == 0){
			this.finir();
		}else{
			this.commencer();
		}
};

/* Fin des méthodes de la classe exercice
On exporte cette classe... */
exports.exercice = exercice;
