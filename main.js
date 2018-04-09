$(document).ready(function(){

   var players = [{"giocatore" : "player1", "scelta" : "cerchio", "shape" : "fa-circle-o"},
                  {"giocatore" : "player2", "scelta" : "croce", "shape" : "fa-times"} ];

   var currentPlayer = players[0];

   var $itemClicked = $('.grid-item');
   console.log($itemClicked);

      $itemClicked.click(function(){

         //Controlla il quadrato non sia già stato cliccato. Solo in tal caso il giocatore
         //corrente potrà scegliere quel quadrato per la sua giocata.
         //Dopo di che avverrà lo switch che passerà il turno all'altro giocatore
         if ( ( !($(this).children().hasClass('fa-circle-o')) && !($(this).children().hasClass('fa-times')) ) ) {

            //Aggiungo l'elemento contenente l'icona, e verrà aggiunta l'icona corretta relativamente
            //al giocatore che ha eseguito il click
            $(this).append("<i class='fa fa-5x'></i>");
            $(this).children("i").addClass(currentPlayer.shape);

            //Intercetta il giocatore corrente e passa il turno all'altro giocatore

            //salvo il giocatore corrente in una variabile che verrà utilizzara
            //per stampare a video il vincitore.
            var lastPlayer = currentPlayer;

            var nextPlayer = switchPlayer(currentPlayer);
            currentPlayer = nextPlayer;

         }

         //Recupero tutte le classi dell'elemento cliccato, per poter eseguire i controlli
         //su tutti gli elementi che hanno le stesse classi
         var classArray = getItemClasses($(this));

         //Recupero il tipo di giocata corrente ( X oppure O)
         var tipoGiocata = getTypeOfChoice($(this));

         if ( isThereAWinner(classArray, tipoGiocata) ) {
            $('.grid-item').addClass('locked');
            var $winAlert = $('#result');
            $winAlert.children('span').html(lastPlayer.scelta);
            $winAlert.fadeIn(250);
            $('#restart').click(function(){
               location.reload();
            });
         }

         //Funzione che riceve il giocatore corrente e passa il turno all'altro giocatore
         function switchPlayer(currentPlayer) {
            var nextPlayer = {};
            if (currentPlayer.giocatore == "player1") {
               nextPlayer = players[1];
            } else {
               nextPlayer = players[0];
            }
            return nextPlayer;
         }

         //Funzione che riceve l'elemento della griglia cliccato e restituisce un classArray
         //contenente le classi di interesse per il confronto
         function getItemClasses(obj) {

            var rowClass = "";
            var colClass = "";
            var firstDiaClass = "";
            var secondDiaClass = "";

            if ( obj.hasClass('h-top') ) {
               rowClass = "h-top";
            } else if ( obj.hasClass('h-center') ) {
               rowClass = "h-center";
            } else {
               rowClass = "h-bottom";
            }

            if ( obj.hasClass('v-left') ) {
               colClass = "v-left";
            } else if ( obj.hasClass('v-center') ) {
               colClass = "v-center";
            } else {
               colClass = "v-right";
            }

            if ( (obj.hasClass('d-back')) && (obj.hasClass('d-forward')) ) {
               firstDiaClass = "d-back";
               secondDiaClass = "d-forward";
            } else if ( obj.hasClass('d-back') ) {
               firstDiaClass = "d-back";
               secondDiaClass = null;
            } else if ( obj.hasClass('d-forward') )  {
               firstDiaClass = null;
               secondDiaClass = "d-forward";
            } else {
               firstDiaClass = null;
               secondDiaClass = null;
            }

            return [rowClass, colClass, firstDiaClass, secondDiaClass];

         }

         //Funzione che riceve l'elemento della griglia cliccato e restituisce
         //il tipo di giocata fatta dall'utente (X oppure O)
         function getTypeOfChoice(obj) {

            var choice = "";

            if ( obj.children().hasClass('fa-circle-o') ) {
               choice = "fa-circle-o";
            } else {
               choice = "fa-times";
            }

            return choice;
         }


         //Funzione che controlla tutti gli elementi con classi uguali alle classi presenti nell'array
         //passato come primo parametro. Controlla se gli elementi con tali classi hanno anche la classe
         //passata come secondo parametro e tengono il conto delle occorrenze trovate.
         //Se verranno trovare 3 occorrenze la funzione restituirà true, altrimenti false
         function isThereAWinner(classA, countThisClass) {
            var counterR = 0;
            var counterC = 0;
            var counterD1 = 0;
            var counterD2 = 0;
            var counter = 0;
            var isThereAWinner = false;

            //Prende la classe in questione e cicla su tutti gli oggetti che hanno quella classe
            //controllando se la classe passata come secondo parametro è presente o meno,
            //e nel caso incrementerà il contatore
            $('.'+classA[0]).each(function() {
               console.log($(this));
               if ( $(this).children().hasClass(countThisClass) ) {
                  console.log("true");
                  counterR++;
               } else {
                  console.log("false");
               }

            });
            console.log("contaRighe: " + counterR);

            $('.'+classA[1]).each(function() {
               console.log($(this));
               if ( $(this).children().hasClass(countThisClass) ) {
                  console.log("true");
                  counterC++;
               }
               else {
                  console.log("false");
               }
            });
            console.log("contaColonne: " + counterC);

            $('.'+classA[2]).each(function() {
               console.log($(this));
               if ( $(this).children().hasClass(countThisClass) ) {
                  console.log("true");
                  counterD1++;
               }
               else {
                  console.log("false");
               }
            });
            console.log("contaDiagonale1: " + counterD1);

            $('.'+classA[3]).each(function() {
               console.log($(this));
               if ( $(this).children().hasClass(countThisClass) ) {
                  console.log("true");
                  counterD2++;
               }
               else {
                  console.log("false");
               }
            });
            console.log("contaDiagonale2: " + counterD2);

            if ( (counterR == 3) || (counterC == 3) || (counterD1 == 3) || (counterD2 == 3) ) {
               isThereAWinner = true;
            }

            return isThereAWinner;
         }


      });

});
