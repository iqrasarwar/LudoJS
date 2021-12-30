let redPos = [43,43,43,43];
let bluePos = [30,30,30,30];
let greenPos = [4,4,4,4];
let yellowPos = [17,17,17,17];
let DiceValues = ["0.png","1.png","2.png","3.png","4.png","5.png","6.png"];
let Turn = [false,false,false,false,false];
let blueDices = document.getElementsByClassName("blueDice");
let blueDicesStatus = [false,false,false,false];
let redDices = document.getElementsByClassName("redDice");
let redDicesStatus = [false,false,false,false];
let yellowDices = document.getElementsByClassName("yellowDice");
let yellowDicesStatus = [false,false,false,false];
let greenDices = document.getElementsByClassName("greenDice");
let greenDicesStatus = [false,false,false,false];
let diceRollResults = 0;

function DiceRoll()
{
   diceRollResults = Math.floor((Math.random() * 6)+1);
   document.getElementById("RollBox").setAttribute("src", DiceValues[diceRollResults]);
   document.getElementsByClassName("DiceRoller")[0].onclick = false;
   if(document.getElementById("rollText").innerText == "Player 1 Turn")
      Turn[1]=true;
   else if(document.getElementById("rollText").innerText == "Player 2 Turn")
      Turn[2]=true;
   else if(document.getElementById("rollText").innerText == "Player 3 Turn")
      Turn[3]=true;
   else if(document.getElementById("rollText").innerText == "Player 4 Turn")
      Turn[4]=true;
   startTransition();
}

function startTransition()
{
   if(Turn[1]==true)
   {
      for (let index = 0; index < blueDices.length; index++)
      {
         if(blueDicesStatus[index]==false && diceRollResults == 6)
         {
            blueDices[index].onclick = freeDiceBlue;
         }
         else if(blueDicesStatus[index]==true)
         {
            blueDices[index].onclick = transitDiceBlue;
         }
         else
         {
            document.getElementById("rollText").innerText = "Player 2 Turn";
            document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
            Turn[1] = false;
         }
      }
   }
   if(Turn[2]==true)
   {
      for (let index = 0; index < redDices.length; index++)
      {
         if(redDicesStatus[index]==false && diceRollResults == 6)
         {
            redDices[index].onclick = freeDiceRed;
         }
         else if(redDicesStatus[index]==true)
         {
            redDices[index].onclick = transitDiceRed;
         }
         else
         {
            document.getElementById("rollText").innerText = "Player 3 Turn";
            document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
            Turn[2] = false;
         }
      }
   }
   if(Turn[3]==true)
   {
      for (let index = 0; index < greenDices.length; index++)
      {
         if(greenDicesStatus[index]==false && diceRollResults == 6)
         {
            greenDices[index].onclick = freeDiceGreen;
         }
         else if(greenDicesStatus[index]==true)
         {
            greenDices[index].onclick = transitDiceGreen;
         }
         else
         {
            document.getElementById("rollText").innerText = "Player 4 Turn";
            document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
            Turn[3] = false;
         }
      }
   }
   if(Turn[4]==true)
   {
      for (let index = 0; index < yellowDices.length; index++)
      {
         if(yellowDicesStatus[index]==false && diceRollResults == 6)
         {
            yellowDices[index].onclick = freeDiceYellow;
         }
         else if(yellowDicesStatus[index]==true)
         {
            yellowDices[index].onclick = transitDiceYellow;
         }
         else
         {
            document.getElementById("rollText").innerText = "Player 1 Turn";
            document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
            Turn[4] = false;
         }
      }
   }
}
function freeDiceBlue()
{
   let startPos = document.getElementById("b"+blueCurrPos);
   let dice = event.target;
   startPos.append(dice);
   document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
   for (let index = 0; index < blueDices.length; index++) {
      if(dice == blueDices[index])
      {
         blueDicesStatus[index]=true;
         console.log(dice);
      }
   }
}
function freeDiceRed()
{
   let startPos = document.getElementById("b"+RedCurrPos);
   let dice = event.target;
   startPos.append(dice);
   document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
   for (let index = 0; index < redDices.length; index++) {
      if(dice == redDices[index])
      {
         redDicesStatus[index]=true;
         console.log(dice);
      }
   }
}
function freeDiceYellow()
{
   let startPos = document.getElementById("b"+YellowCurrPos);
   let dice = event.target;
   startPos.append(dice);
   document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
   for (let index = 0; index < yellowDices.length; index++) {
      if(dice == yellowDices[index])
      {
         yellowDicesStatus[index]=true;
         console.log(dice);
      }
   }
}
function freeDiceGreen()
{
   let startPos = document.getElementById("b"+GreenCurrPos);
   let dice = event.target;
   startPos.append(dice);
   document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
   for (let index = 0; index < greenDices.length; index++) {
      if(dice == greenDices[index])
      {
         greenDicesStatus[index]=true;
         console.log(dice);
      }
   }
}

function transitDiceBlue()
{
   let thisDiceIndex = 0;
   for (let index = 0; index < blueDices.length; index++) {
      if(event.target == blueDices[index])
      {
         thisDiceIndex = index;
      }
   }
   let transitionValue = diceRollResults;
   bluePos[thisDiceIndex]+=transitionValue;
   if(bluePos[thisDiceIndex]>52)
   bluePos[thisDiceIndex] = (bluePos[thisDiceIndex]%53)+1;
   if(bluePos[thisDiceIndex] == 15)
   {
      GoHomeBlue();
      return;
   }
   let newPos = document.getElementById("b" + bluePos[thisDiceIndex]);
   newPos.append(event.target);
}

function transitDiceRed()
{
   let thisDiceIndex = 0;
   for (let index = 0; index < redDices.length; index++) {
      if(event.target == redDices[index])
      {
         thisDiceIndex = index;
      }
   }
   let transitionValue = diceRollResults;
   redPos[thisDiceIndex]+=transitionValue;
   if(redPos[thisDiceIndex]>52)
   redPos[thisDiceIndex] = (redPos[thisDiceIndex]%53)+1;
   if(redPos[thisDiceIndex] == 15)
   {
      GoHomeRed();
      return;
   }
   let newPos = document.getElementById("b" + redPos[thisDiceIndex]);
   newPos.append(event.target);
}
function transitDiceYellow()
{
   let thisDiceIndex = 0;
   for (let index = 0; index < yellowDices.length; index++) {
      if(event.target == yellowDices[index])
      {
         thisDiceIndex = index;
      }
   }
   let transitionValue = diceRollResults;
   yellowPos[thisDiceIndex]+=transitionValue;
   if(yellowPos[thisDiceIndex]>52)
   yellowPos[thisDiceIndex] = (yellowPos[thisDiceIndex]%53)+1;
   if(yellowPos[thisDiceIndex] == 15)
   {
      GoHomeYellow();
      return;
   }
   let newPos = document.getElementById("b" + yellowPos[thisDiceIndex]);
   newPos.append(event.target);
}
function transitDiceGreen()
{
   let thisDiceIndex = 0;
   for (let index = 0; index < greenDices.length; index++) {
      if(event.target == greenDices[index])
      {
         thisDiceIndex = index;
      }
   }
   let transitionValue = diceRollResults;
   greenPos[thisDiceIndex]+=transitionValue;
   if(greenPos[thisDiceIndex]>52)
   greenPos[thisDiceIndex] = (greenPos[thisDiceIndex]%53)+1;
   if(greenPos[thisDiceIndex] == 15)
   {
      GoHomeGreen();
      return;
   }
   let newPos = document.getElementById("b" + greenPos[thisDiceIndex]);
   newPos.append(event.target);
}
function GoHomeGreen()
{
   console.log("Go to Home Path Now");

}
function GoHomeBlue()
{
   console.log("Go to Home Path Now");
}
function GoHomeYellow()
{
   console.log("Go to Home Path Now");
}
function GoHomeRed()
{
   console.log("Go to Home Path Now");
}
