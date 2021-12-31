let diceRollResults = 0;
let Pos = [30,30,30,30,43,43,43,43,4,4,4,4,17,17,17,17];
let DicesStatus = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
let DiceValues = ["0.png","1.png","2.png","3.png","4.png","5.png","6.png"];
let Dices = [document.getElementById("bdice1"), document.getElementById("bdice2"), document.getElementById("bdice3"),document.getElementById("bdice4"), document.getElementById("rdice1"), document.getElementById("rdice2"), document.getElementById("rdice3"),document.getElementById("rdice4"), document.getElementById("gdice1"),document.getElementById("gdice2"),document.getElementById("gdice3"),document.getElementById("gdice4"), document.getElementById("ydice1"),document.getElementById("ydice2"),document.getElementById("ydice3"),document.getElementById("ydice4")];

function DiceRoll()
{
   diceRollResults = Math.floor((Math.random() * 6)+1);
   document.getElementById("RollBox").setAttribute("src", DiceValues[diceRollResults]);
   document.getElementsByClassName("DiceRoller")[0].onclick = false;
   startGame();
}
function startGame()
{
   let i = getIndex(document.getElementById("rollText").innerText);
   let next = true;
   for (let index = i; index < i+4; index++)
   {
      if(DicesStatus[index]==false && diceRollResults == 6)
      {
         Dices[index].onclick = freeDice;
         next = false;
      }
      else if(DicesStatus[index]==true)
      {
         Dices[index].onclick = transitDice;
         next = false;
      }
      else
      {
         Dices[index].onclick = false;
      }
   }
   if(next == true)
   {
      document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
      document.getElementById("rollText").innerText=changeText(document.getElementById("rollText").innerText);
   }

}
function freeDice()
{
   let dice = event.target;
   let id = getId(event.target.id);
   let startPos = document.getElementById(id);
   // console.log(startPos);
   // console.log(dice);
   startPos.append(dice);
   document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
   for (let index = 0; index < Dices.length; index++) {
      if(dice == Dices[index])
      {
         DicesStatus[index]=true;
      }
      Dices[index].onclick = false;
   }
}
function transitDice()
{
   let thisDiceIndex = 0;
   for (let index = 0; index < Dices.length; index++) {
      if(event.target == Dices[index])
      {
         thisDiceIndex = index;
      }
      Dices[index].onclick = false;
   }
   let transitionValue = diceRollResults;
   Pos[thisDiceIndex]+=transitionValue;
   if(Pos[thisDiceIndex]>52)
   Pos[thisDiceIndex] = (Pos[thisDiceIndex]%53)+1;
   let ShouldGoHome =GoToHome(thisDiceIndex,Pos[thisDiceIndex],Pos[thisDiceIndex]-transitionValue);
   console.log(ShouldGoHome);
   // if(ShouldGoHome != 0)
   // {
   //    document.getElementById(GoHome(ShouldGoHome,Pos[thisDiceIndex])).append(event.target);
   // }
   // else{
   //    document.getElementById("b" + Pos[thisDiceIndex]).append(event.target);
   // }
   document.getElementById("b" + Pos[thisDiceIndex]).append(event.target);
   document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
   if(transitionValue < 6)
      document.getElementById("rollText").innerText=changeText(document.getElementById("rollText").innerText);
}
function GoHome(DiceToGo, newPosition, e)
{
   let inHomePos = newPosition - DiceToGo;
   let GoId = "";
   if(DiceToGo == 28) GoId ="b";
   else if(DiceToGo == 41) GoId ="r";
   else if(DiceToGo == 2) GoId ="g";
   else GoId = "y";
   if(inHomePos > 6)
      return;
   else
   return (GoId + inHomePos);
}
//return the id of dice clicked
function getId(e)
{
   let PosId = "";
   if(e == "bdice1" || e == "bdice2" || e == "bdice3" || e == "bdice4")
      PosId = "b30";
   else if(e == "rdice1" || e == "rbdice2" || e == "rdice3" || e == "rdice4")
      PosId = "b43";
   else if(e == "gdice1" || e == "gdice2" || e == "gdice3" || e == "gdice4")
      PosId = "b4";
   else if(e == "ydice1" || e == "ybdice2" || e == "ydice3" || e == "ydice4")
      PosId = "b17";
   return PosId;
}
//return the index for the dices of the player whoes turn comes i.e return 0 for blue 4 for red etc.
function getIndex(player)
{
   if(player == "Player 1 Turn") return 0;
   else if(player == "Player 2 Turn") return 4;
   else if(player == "Player 3 Turn")  return 8;
   else return 12;
}
//set new player text
function changeText(player)
{
   if(player == "Player 1 Turn") return "Player 2 Turn";
   else if(player == "Player 2 Turn") return "Player 3 Turn";
   else if(player == "Player 3 Turn")  return "Player 4 Turn";
   else return "Player 1 Turn";
}
//tell if dice should go home or not
function GoToHome(diceIndex, newPosIndex, currPosIndex)
{
   if(diceIndex < 4 && newPosIndex >= 28 && currPosIndex < 28) return 28;
   else if(diceIndex < 8 && newPosIndex >= 41 && currPosIndex < 41) return 41;
   else if(diceIndex < 12 && newPosIndex >= 2 && (currPosIndex < 2 || currPosIndex <= 52)) return 2;
   else if(diceIndex < 16 && newPosIndex >= 15 && currPosIndex < 15) return 15;
   return 0;
}
