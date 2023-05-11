  /*----- CONSTANTS -----*/

// const = 

const COLORS = {
    '1' : 'Salmon',
    '-1' : 'RebeccaPurple',
    '0' : 'transparent',
  }
  
  
  
    /*----- STATE VARIABLES -----*/
  // aka let winner
  // let turn =
  // let board =
  
  let board; // array of 7 Column Arrays
  let turn; // 1 or -1
  let winner; // null = no winner; 1 or -1 winner; 'T' = Tie
  
  
  
  
    /*----- CACHED ELEMENTS  -----*/
  
  // a cache for elements you plan to use more than once
  
  const messageEl = document.querySelector('h1');
  const playAgainBtn = document.querySelector('button');
  const markerEls = [...document.querySelectorAll('#markers > div')];
  
  
  
  
  
    /*----- EVENT LISTENERS -----*/
  
  document.getElementById('markers').addEventListener('click', handleDrop);
  playAgainBtn.addEventListener('click', init);
  
  
   // function handleMove(evt)
      
   // Check if we should exit the function
  // according to the current state
  // For example, ignore clicks if the
  // game has been won or is a tie:
  
  //  if (winner) return;
      // Logic/Code to update all impacted state
  
      //  ...
  
      // Visualize all state
      //   render();
   //  }
  
  
  
  
  
    /*----- FUNCTIONS -----*/
  
  
  // Your first line should be INIT() to INITIALIZE YOUR CODE
  
  init();
  
  // INITIALIZE all STATE, then call render()
  function init () {
  
  
    // to PICTURE what the BOARD looks like...mentally TILT IT 90 DEGREES counter-clockwise
    board = [
      [0, 0, 0, 0, 0, 0],  // col 0
      [0, 0, 0, 0, 0, 0],  // col 1
      [0, 0, 0, 0, 0, 0],  // col 2
      [0, 0, 0, 0, 0, 0],  // col 3
      [0, 0, 0, 0, 0, 0],  // col 4
      [0, 0, 0, 0, 0, 0],  // col 5
      [0, 0, 0, 0, 0, 0],  // col 6
    ];
    turn = -1;
    winner = null;
    render();
  } 
  
  // In response to USER INTERACTION -> update all impacted STATE then call RENDER render();
  
  function handleDrop(evt) {
    const colIdx = markerEls.indexOf(evt.target);
    //  Guards for your COLUMN OR ROW from NEGATIVE SPACE CLICKS
    if (colIdx === -1 || winner) return;
    //  SHORTCUT to the COLUMN ARRAY
    const colArr = board[colIdx];
    //  FIND the INDEX of the FIRST 0 in colArr
    const rowIdx = colArr.indexOf(0);
    //  UPDATE the BOARD STATE with the current PLAYER value (turn)  (!!!!!)
    colArr[rowIdx] = turn;
   
    // HOW to SWITCH PLAYER'S TURNS (!!!!!!!!)
    turn *= -1;
  
    /// CHECK for the WINNER (!!!!!)
  
    winner = getWinner(colIdx, rowIdx);
    render();
  }
  
  // **** WHERE THE WINNING LOGIC BEGINS **** ///
  
  //// checks for WINNER in BOARD STATE and
  ///// return null if no winner, 1 or -1 if a PLAYER has WON, 'T' if TIE
  
  function getWinner(colIdx, rowIdx) {
    return checkVerticalWin(colIdx, rowIdx) ||
    checkHorizontalWin(colIdx, rowIdx) ||
    checkDiagonalWinNESW(colIdx, rowIdx) ||
    checkDiagonalWinNWSE(colIdx, rowIdx);
  }
  
  function checkDiagonalWinNESW(colIdx, rowIdx) {
    const adjCountNE = countAdjacent(colIdx, rowIdx, 1, 1);
    const adjCountSW = countAdjacent(colIdx, rowIdx, -1, -1);
    return (adjCountNE + adjCountSW) >= 3 ? board[colIdx][rowIdx] : null;
  }
  
  function checkDiagonalWinNWSE(colIdx, rowIdx) {
    const adjCountNW = countAdjacent(colIdx, rowIdx, -1, 1);
    const adjCountSE = countAdjacent(colIdx, rowIdx, 1, -1);
    return (adjCountNW + adjCountSE) >= 3 ? board[colIdx][rowIdx] : null;
  }
  
  function checkHorizontalWin(colIdx, rowIdx) {
    const adjCountLeft = countAdjacent(colIdx, rowIdx, -1, 0);
    const adjCountRight = countAdjacent(colIdx, rowIdx, 1, 0);
    return (adjCountLeft + adjCountRight) >= 3 ? board[colIdx][rowIdx] : null;
  }
  
  function checkVerticalWin(colIdx, rowIdx) {
    return countAdjacent(colIdx, rowIdx, 0, -1) === 3 ? board[colIdx][rowIdx] : null;
  }
  
  function countAdjacent(colIdx, rowIdx, colOffset, rowOffset) {
    
    const player = board[colIdx][rowIdx];
    // ^ SHORTCUT VARIABLE (makes code more readable) to the PLAYER value
     
    // Track COUNT of adjacent cells with the SAME PLAYER VALUE
    let count = 0;
    // INITIALIZE new coordinates
    colIdx += colOffset;
    rowIdx += rowOffset;
    
    // WHILE LOOP
    while (
      // ensure colIdx is WITHIN BOUNDS of the BORDERLINE
      board[colIdx] !== undefined &&
      board[colIdx][rowIdx] !== undefined &&
      board[colIdx][rowIdx] === player 
      ) {
        count++;
        colIdx += colOffset;
        rowIdx += rowOffset;
      }
      return count;
    }
      
      
  function render() {
    renderBoard();
    renderMessage();
  
  
  // HIDING or SHOWING UI ELEMENTS (controls)
  
    renderControls();
  }
  
  function renderBoard() {
    board.forEach(function(colArr, colIdx) {
      // Iterate over the CELLS in the current COLUMN (colArr)
      colArr.forEach(function(cellVal, rowIdx) {
        const cellId = `c${colIdx}r${rowIdx}`;
        const cellEl = document.getElementById(cellId);
        cellEl.style.backgroundColor = COLORS[cellVal]
  ;    });
    });
  }
  
  
  
  function renderMessage() {
  /// IT'S A TIE message
    if (winner === 'T') {
      messageEl.innerHTML = `It's a <span style="color: cadetblue">draw.</span> <br><span style="font-size: 4vmin"><span style="color: cadetblue">Purify yourself </span>in the waters of <span style="color: cadetblue"> Lake Minnetonka.</span></span></br>`;
    } 
  /// PLAYER 2 WINS message
    else if (winner <= '-1') {
      messageEl.innerHTML = `...game, <span style="font-size: 6.66vmin">Blouses. <span style="color: ${COLORS[winner]}">  Prince </span></span> wins.`;
    } 
  /// PLAYER 1 WINS message
      else if (winner >= '1') {
      messageEl.innerHTML = `Congratulations, <span style="color: ${COLORS[winner]}">  Charlie Murphy. </span> You win. <br>...<span style="font-size: 4.5vmin"><span style="color: ${COLORS[winner]}">pancakes </span>will be served momentarily.</span></br>`;
    }
  /// ASSIGN NAME to PLAYER ONE in it's TURN via its COLORS const
      else if (turn >= '1') {
        messageEl.innerHTML = `It's <span style="color: ${COLORS[turn]}">Charlie Murphy's </span>turn`;
  ///
      }
      else {
      // game is in play
      messageEl.innerHTML = `...it's <span style="color: ${COLORS[turn]}">Prince's</span> turn`;
    }
  }
  
  function renderControls() {
  // Ternary Expression is the go-to when you want 1 of 2 Values
  // <cond expression> ? <truthy exp> : <flasy exp>
  playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
  }
  // Iterate OVER the MARKER ELEMENTS to HIDE or SHOW according to the COLUMN being FULL (no 0's) or not
  markerEls.forEach(function(markerEl, colIdx) {
    const hideMarker = ! board[colIdx].includes(0) || winner;
    markerEl.style.visibility = hideMarker ? 'hidden' : 'visible';
  });
  
  
  
  
  /////    THE END OF THE CODE, YO     /////