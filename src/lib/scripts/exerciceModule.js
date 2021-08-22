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
	"series": [
	{"ques": "recto", "ans": "verso"},
	{"ques": "Première lettre", "ans": "A"}
	],
	"options": null,
	"quiz": { "cards": this.series },
	"face": [],
	"pile": [],
	"cartes": 0,
	"i": 0
};

/* On initialise l'objet exercice à partir des données de l'interface : 
 * On vérifie que toutes les données utiles sont présentes : succès => true
 */

exercice.init = function (series) {
	this.series = series;
};
/* Fin de la méthode init() */

/* Insérer ici les méthodes en lien avec la logique propre à l'exercice */

/*  On masque la pile de cartes au début… ainsi que les contrôles de mémorisation */
exercice.masquerlapile = function () {
	$("#boite").hide();
	$(".reaction").hide();
	$("#retourner").hide();
};

/* Série terminée */
exercice.finir = function (){
		$("#boite").html("<i class=\"icon-smile\"><br />Série mémorisée !");
		$("#boite").toggleClass("bleu");
		$("#retourner").hide();
		$("#info-cartes").hide();
};
	
/* Commencer ou continuer */
exercice.commencer = function (){
		// On affiche la pile... :
		$("#boite").show();
		$("#retourner").show();
		$("#actions").hide();
		$("#info-cartes").show();

		this.cartes = this.series.length;
		if(this.cartes == 0){
			this.finir();
		}else{
			this.series.sort(function() {return 0.5 - Math.random()});	
			$("#boite").html(this.series[this.i]['ques']);
			$("#boite").toggleClass("vert");
			$("#boite").toggleClass("blanc");
		}
};
	
/* On retourne la carte */
exercice.retourner = function () {
		$("#retourner").hide();
		if(this.i < this.cartes){
			$("#boite").html(this.series[this.i]['ans']);
			$("#boite").toggleClass("blanc");
			$("#boite").toggleClass("vert");
			
			// On montre les contrôles de mémorisation
			$(".reaction").show();
		}else{
			this.finir();
		}
		
};
	
/* Je ne sais pas encore */
exercice.jenelesaispasencore = function () {
		// On masque les contrôles :
		$(".reaction").hide();
		$("#retourner").show();
			
		if(this.i == (this.cartes - 1)){
			this.commencer();
		}else{
			this.i = this.i + 1;
			this.commencer();
		}
		
};

/* Je le sais déjà */
exercice.jelesaisdeja = function () {	
/* On a mémorisé une carte */
		// On masque les contrôles :
		$(".reaction").hide();
		$("#retourner").show();
		
		this.series.splice(this.i, 1);
		this.cartes = this.series.length;
		$("#nombre").html(this.cartes);
		if(this.cartes == 0){
			this.finir();
		}else{
			this.commencer();
		}
};

// Fin des méthodes de la classe exercice

exports.exercice = exercice;
