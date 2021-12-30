let diceRollResults = 0;
let redPos = [43,43,43,43];
let bluePos = [30,30,30,30];
let greenPos = [4,4,4,4];
let yellowPos = [17,17,17,17];
let Turn = [false,false,false,false,false];
let blueDicesStatus = [false,false,false,false];
let redDicesStatus = [false,false,false,false];
let yellowDicesStatus = [false,false,false,false];
let greenDicesStatus = [false,false,false,false];
let DiceValues = ["0.png","1.png","2.png","3.png","4.png","5.png","6.png"];
let blueDices = [document.getElementById("bdice1"),document.getElementById("bdice2"),document.getElementById("bdice3"),document.getElementById("bdice4")];
let redDices = [document.getElementById("rdice1"),document.getElementById("rdice2"),document.getElementById("rdice3"),document.getElementById("rdice4")];
let yellowDices = [document.getElementById("ydice1"),document.getElementById("ydice2"),document.getElementById("ydice3"),document.getElementById("ydice4")];
let greenDices = [document.getElementById("gdice1"),document.getElementById("gdice2"),document.getElementById("gdice3"),document.getElementById("gdice4")];

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
   let next = false;
   if(Turn[1]==true)
   {
      next = false;
      for (let index = 0; index < blueDices.length; index++)
      {
         if(blueDicesStatus[index]==false && diceRollResults == 6)
         {
            blueDices[index].onclick = freeDiceBlue;
            next = true;
         }
         else if(blueDicesStatus[index]==true)
         {
            blueDices[index].onclick = transitDiceBlue;
            next = true;
         }
         else
         {
            blueDices[index].onclick = false;
         }
      }
      if(next == false)
      {
         document.getElementById("rollText").innerText = "Player 2 Turn";
         document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
         Turn[1] = false;
      }
   }
   if(Turn[2]==true)
   {
      next = false;
      for (let index = 0; index < redDices.length; index++)
      {
         if(redDicesStatus[index]==false && diceRollResults == 6)
         {
            redDices[index].onclick = freeDiceRed;
            next = true;
         }
         else if(redDicesStatus[index]==true)
         {
            redDices[index].onclick = transitDiceRed;
            next = true;
         }
         else
         {
            redDices[index].onclick = false;
         }
      }
      if(next == false)
      {
         document.getElementById("rollText").innerText = "Player 3 Turn";
         document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
         Turn[2] = false;
      }
   }
   if(Turn[3]==true)
   {
      next = false;
      for (let index = 0; index < greenDices.length; index++)
      {
         if(greenDicesStatus[index]==false && diceRollResults == 6)
         {
            greenDices[index].onclick = freeDiceGreen;
            next = true;
         }
         else if(greenDicesStatus[index]==true)
         {
            greenDices[index].onclick = transitDiceGreen;
            next = true;
         }
         else
         {
            greenDices[index].onclick = false;
         }
      }
      if(next == false)
      {
         document.getElementById("rollText").innerText = "Player 4 Turn";
         document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
         Turn[3] = false;
      }
   }
   if(Turn[4]==true)
   {
      next = false;
      for (let index = 0; index < yellowDices.length; index++)
      {
         if(yellowDicesStatus[index]==false && diceRollResults == 6)
         {
            yellowDices[index].onclick = freeDiceYellow;
            next = true;
         }
         else if(yellowDicesStatus[index]==true)
         {
            yellowDices[index].onclick = transitDiceYellow;
            next = true;
         }
         else
         {
            blueDices[index].onclick = false;
         }
      }
      if(next == false)
      {
         document.getElementById("rollText").innerText = "Player 1 Turn";
         document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
         Turn[4] = false;
      }
   }
}
function freeDiceBlue()
{
   let startPos = document.getElementById("b30");
   let dice = event.target;
   startPos.append(dice);
   document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
   for (let index = 0; index < blueDices.length; index++) {
      if(dice == blueDices[index])
      {
         blueDicesStatus[index]=true;
         console.log(dice);
      }
      else
      {
         blueDices[index].onclick = false;
      }
   }
}
function freeDiceRed()
{
   let startPos = document.getElementById("b43");
   let dice = event.target;
   startPos.append(dice);
   document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
   for (let index = 0; index < redDices.length; index++) {
      if(dice == redDices[index])
      {
         redDicesStatus[index]=true;
         console.log(dice);
      }
      else
      {
         redDices[index].onclick = false;
      }
   }
}
function freeDiceYellow()
{
   let startPos = document.getElementById("b17");
   let dice = event.target;
   startPos.append(dice);
   document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
   for (let index = 0; index < yellowDices.length; index++) {
      if(dice == yellowDices[index])
      {
         yellowDicesStatus[index]=true;
         console.log(dice);
      }
      else
      {
         yellowDices[index].onclick = false;
      }
   }
}
function freeDiceGreen()
{
   let startPos = document.getElementById("b4");
   let dice = event.target;
   startPos.append(dice);
   document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
   for (let index = 0; index < greenDices.length; index++) {
      if(dice == greenDices[index])
      {
         greenDicesStatus[index]=true;
         console.log(dice);
      }
      else
      {
         greenDices[index].onclick = false;
      }
   }
}
function transitDiceBlue(e)
{
   console.log(e.target.id); 
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
   if(bluePos[thisDiceIndex] == 28)
   {
      GoHomeBlue();
      return;
   }
   let newPos = document.getElementById("b" + bluePos[thisDiceIndex]);
   newPos.append(event.target);
   document.getElementById("rollText").innerText = "Player 2 Turn";
   document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
   Turn[1] = false;
   blueDices[thisDiceIndex].onclick = false;
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
   document.getElementById("rollText").innerText = "Player 3 Turn";
   document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
   Turn[2] = false;
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
   document.getElementById("rollText").innerText = "Player 1 Turn";
   document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
   Turn[4] = false;
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
   document.getElementById("rollText").innerText = "Player 4 Turn";
   document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
   Turn[3] = false;
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
