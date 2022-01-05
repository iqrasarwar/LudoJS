let diceRollResults = 0;
let Pos = [30,30,30,30,43,43,43,43,4,4,4,4,17,17,17,17];
let PosTraversed = [56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56];
let DicesStatus = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
let OutStatus = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
let DiceValues = ["0.png","1.png","2.png","3.png","4.png","5.png","6.png"];
let Dices = [document.getElementById("bdice1"), document.getElementById("bdice2"), document.getElementById("bdice3"),document.getElementById("bdice4"), document.getElementById("rdice1"), document.getElementById("rdice2"), document.getElementById("rdice3"),document.getElementById("rdice4"), document.getElementById("gdice1"),document.getElementById("gdice2"),document.getElementById("gdice3"),document.getElementById("gdice4"), document.getElementById("ydice1"),document.getElementById("ydice2"),document.getElementById("ydice3"),document.getElementById("ydice4")];
let InHome = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let DiceBoxes = [];
for (let index = 0; index < 16; index++)
   DiceBoxes[index] = "box" + index;

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
      else if(DicesStatus[index]==true && OutStatus[index]==false)
      {
         Dices[index].onclick = transitDice;
         if(transitionPossible(diceRollResults,index) == true)
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
   let home = 0;
   for (let index = 0; index < Dices.length; index++) {
      if(event.target == Dices[index])
      {
         thisDiceIndex = index;
      }
   }
   let transitionValue = diceRollResults;
   let trasnPossible = false;
   if(InHome[thisDiceIndex] != 0)
   {
      InHome[thisDiceIndex] += transitionValue;
      if(InHome[thisDiceIndex] <= 6)
      {
         let id = "";
         if(thisDiceIndex < 4) id ="u";
         else if(thisDiceIndex > 3 && thisDiceIndex < 8) id ="r";
         else if(thisDiceIndex > 7 && thisDiceIndex < 12) id ="g";
         else id = "y";
         document.getElementById(id+InHome[thisDiceIndex]).append(event.target);
         trasnPossible = true;
         PosTraversed[thisDiceIndex]-=transitionValue;
      }
      else
      {
         InHome[thisDiceIndex] -= transitionValue;
      }
      if(InHome[thisDiceIndex] == 6)
      {
        OutStatus[thisDiceIndex] = true;
      }
   }
   else
   {
      let CanGoHome = CanGoToHome(thisDiceIndex,Pos[thisDiceIndex]);
      Pos[thisDiceIndex]+=transitionValue;
      PosTraversed[thisDiceIndex]-=transitionValue;
      if(Pos[thisDiceIndex]>52)
      Pos[thisDiceIndex] = (Pos[thisDiceIndex]%53)+1;
      if(CanGoHome)
         home = specifyHome(thisDiceIndex,Pos[thisDiceIndex]);
      if(home != 0)
      {
         let appLoc = GoHome(home, Pos[thisDiceIndex],thisDiceIndex);
         document.getElementById(appLoc).append(event.target);
      }
      else{
         killDice(Pos[thisDiceIndex], thisDiceIndex);
         document.getElementById("b" + Pos[thisDiceIndex]).append(event.target);
      }
      trasnPossible = true;
   }
   if(trasnPossible == true)
   {
      for (let index = 0; index < Dices.length; index++)
         Dices[index].onclick = false;
      document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
      if(transitionValue < 6)
      document.getElementById("rollText").innerText=changeText(document.getElementById("rollText").innerText);
   }
}

function GoHome(DiceToGo, newPosition, thisDiceIndex)
{
   let inHomePos = newPosition - DiceToGo;
   let GoId = "";
   if(DiceToGo == 28) GoId ="u";
   else if(DiceToGo == 41) GoId ="r";
   else if(DiceToGo == 2) GoId ="g";
   else GoId = "y";
   if(inHomePos > 6)
      return;
   else
   {
      InHome[thisDiceIndex] = inHomePos;
      return (GoId + inHomePos);
   }
}
//return the id of dice clicked
function getId(e)
{
   if(e == "bdice1" || e == "bdice2" || e == "bdice3" || e == "bdice4") return "b30";
   else if(e == "rdice1" || e == "rdice2" || e == "rdice3" || e == "rdice4") return "b43";
   else if(e == "gdice1" || e == "gdice2" || e == "gdice3" || e == "gdice4") return "b4";
   else if(e == "ydice1" || e == "ydice2" || e == "ydice3" || e == "ydice4") return "b17";
}
//return the index for the dices of the player whoes turn comes i.e return 0 for blue 4 for red etc.
function getIndex(player)
{
   if(player == "Player 1 Blue Turn") return 0;
   else if(player == "Player 2 Red Turn") return 4;
   else if(player == "Player 3 Green Turn")  return 8;
   else return 12;
}
//set new player text
function changeText(player)
{
   if(player == "Player 1 Blue Turn") return "Player 2 Red Turn";
   else if(player == "Player 2 Red Turn") return "Player 3 Green Turn";
   else if(player == "Player 3 Green Turn")  return "Player 4 Yellow Turn";
   else return "Player 1 Blue Turn";
}
//tell if dice should go home or not
function CanGoToHome(diceIndex, newPosIndex)
{
   if(diceIndex < 4 && newPosIndex >= 2 && newPosIndex <= 28) return true;
   else if( diceIndex > 3 && diceIndex < 8 && newPosIndex >= 15 && newPosIndex <= 41) return true;
   else if(diceIndex > 7 && diceIndex < 12)
   {
      if(newPosIndex >= 28 && newPosIndex <= 52) return true;
      if(newPosIndex == 1 || newPosIndex == 2) return true;
   }
   else if(diceIndex > 11 && diceIndex < 16 )
   {
      if(newPosIndex >= 41 && newPosIndex <=52) return true;
      if(newPosIndex >= 1 && newPosIndex <=15) return true;
   }
   return false;
}
function specifyHome(diceIndex, newPosIndex)
{
   if(diceIndex < 4 && newPosIndex >= 29 && newPosIndex <= 52) return 28;
   else if( diceIndex > 3 && diceIndex < 8 && newPosIndex >= 42 && newPosIndex <= 52) return 41;
   else if(diceIndex > 7 && diceIndex < 12)
   {
      if(newPosIndex >= 3 && newPosIndex < 28) return 2;
   }
   else if(diceIndex > 11 && diceIndex < 16 )
   {
      if(newPosIndex >= 16 && newPosIndex < 41) return 15;
   }
   return 0;
}
//kill the dice
function killDice(DiceLoc,thisDiceIndex)
{
   if(DiceLoc == 51 || DiceLoc == 4 || DiceLoc == 43 || DiceLoc == 38 || DiceLoc == 12 || DiceLoc == 17 || DiceLoc == 25 || DiceLoc == 30)
      return;
   else
   {
      let x = document.getElementById("b"+DiceLoc);
      if(x.childNodes.length > 0)
      {
         let y = x.childNodes;
         let backToStore = [];
         let Back = [];
         let childs = y.length;
         let copy = [];
         for (let index = 0; index < childs; index++)
         {
               backToStore[index]=y[index];
               Back[index] = document.getElementById(y[index].id);
               copy[index] = y[index];
         }
         for (let index = 0; index < childs; index++)
         {
            if(sameColorDices(copy[index].id,Dices[thisDiceIndex].id))
            {
               backToStore[index]="";
               Back[index]="";
            }
            else
               x.removeChild(backToStore[index]);
         }
         for (let index = 0; index < Dices.length; index++)
         {
            for(let j = 0; j < Back.length; j++)
            {
               if(Back[j] == Dices[index])
               {
                  document.getElementById(DiceBoxes[index]).append(backToStore[j]);
                  let posStr = getId(Back[j].id);
                  posStr = posStr.substring(1);
                  posStr = parseInt(posStr);
                  console.log(Pos[index]);
                  Pos[index] = posStr;
                  PosTraversed[index]=56;
                  DicesStatus[index] = false;
               }
            }
         }

      }
   }
}
function sameColorDices(c1,c2)
{
   c1 = c1.substring(0,1);
   c2 = c2.substring(0,1);
   console.log(c1);
   console.log(c2);
   if(c1==c2)
   return true;
   return false;
}
function transitionPossible(value,diceIndex)
{
   let possible = false;
   if(diceIndex < 4 )
   {
      for(let i =0;i<4;i++)
      {
         if(PosTraversed[i] >= value)
         {
            if(DicesStatus[i]==true)
               possible = true;
         }
      }
   }
   else if( diceIndex > 3 && diceIndex < 8 )
   {
      for(let i =4;i<8;i++)
      {
         if(PosTraversed[i] >= value)
         {
            if(DicesStatus[i]==true)
               possible = true;
         }
      }
   }
   else if(diceIndex > 7 && diceIndex < 12)
   {
      for(let i =8;i<12;i++)
      {
         if(PosTraversed[i] >= value)
         {
            if(DicesStatus[i]==true)
               possible = true;
         }
      }
   }
   else if(diceIndex > 11 && diceIndex < 16 )
   {
      for(let i =12;i<16;i++)
      {
         if(PosTraversed[i] >= value)
         {
            if(DicesStatus[i]==true)
               possible = true;
         }
      }
   }
   return possible;
}
