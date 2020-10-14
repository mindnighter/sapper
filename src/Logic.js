const N = 10;
export const mine = "mine";

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export function Fill(arr){

  for(let i = 0; i < N+2; i++){
    arr[i] = [];
    for(let j = 0; j < N+2; j++){
      arr[i][j]={
        i: i-1,
        j: j-1,
        number: 0,
        show: false,
        checked: false,
        flag: false
      };
      arr[i][j].counting = function() {
        if (this.number !== mine){
          this.number++;
        }
      };
    }
  }

  SetMines(arr);
  SetNumbers(arr);
  RemoveUseless(arr);

}

function SetMines(arr){
  let counter = 0;
  while(counter <= N){
    counter = 1;
    for(let i = 1; i < N; i++){
      for(let j = 1; j < N; j++){
        arr[i][j].number=0;
      }
    }
    for(let i = 1; i < N; i++){
      for(let j = 1; j < N; j++){
        if(getRandomArbitrary(0,100) <= 10 && counter <= N){
          arr[i][j].number= mine;
          counter++;
        } 
      }
    }
  }
}

function RemoveUseless(arr) {
  arr.shift();
  arr.pop();
   for(let i = 0; i < arr.length; i++){
      arr[i].shift();
      arr[i].pop();
  }
  for(let i = 0; i < arr.length; i++){
    for(let j = 0; j < arr.length; j++){
      if(arr[i][j].number === 0){
        arr[i][j].number = "";
      }
    }
  } 

}

function SetNumbers(arr){
  for(let i = 1; i < N; i++){
    for(let j = 1; j < N; j++){
      if(arr[i][j].number === mine){
        arr[i-1][j-1].counting()
        arr[i][j-1].counting()
        arr[i+1][j-1].counting()
        arr[i+1][j].counting()
        arr[i+1][j+1].counting()
        arr[i][j+1].counting()
        arr[i-1][j+1].counting()
        arr[i-1][j].counting()
      }
    }
  }
}

export function NearClick(arr,x,y) {
  if( x > N-1 || x < 0 || y > N-1 || y < 0 || arr[x][y].number || arr[x][y].checked){
    if(x <= N-1 && x >= 0 && y <= N-1 && y >= 0 &&  !arr[x][y].flag){arr[x][y].show = true;}
    return 0
  }
  if(x <= N-1 && x >= 0 && y <= N-1 && y >= 0 &&  !arr[x][y].flag){
        arr[x][y].show = true;
        arr[x][y].checked = true;
        NearClick(arr,x-1,y-1);
        NearClick(arr,x,y-1);
        NearClick(arr,x+1,y-1);
        NearClick(arr,x+1,y);
        NearClick(arr,x+1,y+1);
        NearClick(arr,x,y+1);
        NearClick(arr,x-1,y+1);
        NearClick(arr,x-1,y);
  }
}

export function CheckWin(arr){
  let counter_of_hidden = 0
  for(let i = 0; i < arr.length; i++){
    for(let j = 0; j < arr.length; j++){
      if(!arr[i][j].show){
        counter_of_hidden++;
      }
    }
  }
  
  if(counter_of_hidden === N){
    return true
  }
  return false
}
