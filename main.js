var players = [{"giocatore" : "player1", "scelta" : "cerchio", "colore" : "bg-green"},
{"giocatore" : "player2", "scelta" : "croce", "colore" : "bg-red"}
];




$(document).ready(function(){

   //Ciclo che genera 64 celle
   for (var i = 0; i < 9; i++) {
      $('.grid-container').append( "<div id=" + i + " class=grid-item></div>");
   }



   var nextPlayer = players[0];

   $('.grid-item').click(function(){


      //Controlla il quadrato non sia già stato cliccato. Solo in tal caso il giocatore
      //corrente potrà scegliere quel quadrato per la sua giocata.
      //Dopo di che avverrà lo switch che passerà il turno all'altro giocatore
      if (  ( !($(this).hasClass('bg-green')) && !($(this).hasClass('bg-red')) )  ) {
         $(this).addClass(nextPlayer.colore);

         //Intercetta il giocatore corrente e passa il turno alla'altro giocatore
         var currentPlayer = switchPlayer(nextPlayer)
         nextPlayer = currentPlayer;

      }

      


   });







 //alert("ciao");


});


function switchPlayer(currentPlayer) {
   var nextPlayer = {};
   if (currentPlayer.giocatore == "player1") {
      nextPlayer = players[1];
   } else {
      nextPlayer = players[0];
   }
   return nextPlayer;
}

//
//
//
// var id = parseInt(this.id);
//
//       if ( bombs.includes(id) ) {
//
//          if ( !($(this).hasClass('bg-red')) ) {
//             $(this).addClass('bg-red');
//             updateScores('bg-red');
//             //updateBombs();
//          }
//
//       } else {
//          if ( !($(this).hasClass('bg-green')) ) {
//             $(this).addClass('bg-green');
//             updateScores('bg-green');
//             //updatePoints();
//          }
//       }
