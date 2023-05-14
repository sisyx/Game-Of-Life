const body = document.querySelector('body');
const widthInput = document.querySelector('input.width-input');
const اheightInput = document.querySelector('input.height-input');
const submitBtn = document.querySelector('button.submit-btn');
const moveBtn = document.querySelector('button.move-btn');
const cellContainer = document.querySelector('div.cell-container');
var width = 0;
var height = 0;
var allCellsList = [];
var aliveCellsList = [];
var aliveCellsNumbersList = [];
var deadCellsList = [];
var deadCellsNumbersList = [];
var kosSher = 0;
// bolleans
var gameNotStarted = true;
var isCellCreated = false;


submitBtn.addEventListener('click', event =>{ 
	ruinCells();
	createCells(widthInput.value, اheightInput.value);
});

moveBtn.addEventListener('click', move);



// functions

function createCells(thisWidth, thisHeight) {
	cellContainer.style.gridTemplateRows = `repeat(${thisWidth}, 50px)`;
	cellContainer.style.gridTemplateColumns = `repeat(${thisHeight}, 50px)`;
	for (let i = 0; i < thisWidth; i++) {
		allCellsList.push([]);
		for (let j = 0; j < thisHeight; j++) {
			const thisCell = document.createElement('div');
			thisCell.classList.add('cell');
			thisCell.classList.add('dead');
			thisCell.classList.add(`c-${j + 1}`);
			thisCell.classList.add(`r-${i + 1}`);
			allCellsList[i].push(thisCell);
			cellContainer.append(thisCell);
			thisCell.addEventListener('click', event => { cellClick(event); })
		}
	}
	width = thisWidth;
	height = thisHeight;
}

function ruinCells() {
	for (let i = document.querySelectorAll('.cell').length - 1; i >= 0; i--) {
		document.querySelectorAll('.cell')[i].remove();
		allCellsList.splice(0,allCellsList.length)
	}
}

function cellClick(event) {
	if (gameNotStarted) {
		if (event.target.classList.contains('alive')) {
			event.target.classList.add('dead');
			event.target.classList.remove('alive');		
		} else{
			event.target.classList.add('alive');
			event.target.classList.remove('dead');	
		}
	}
}

function move() {
	aliveCellsList = [];
	aliveCellsNumbersList = [];
	deadCellsList = [];
	deadCellsNumbersList = [];
	// for all cells
		// get selected row
		// get selected column
		// get number of alives arround
	for (let i = document.querySelectorAll('.cell').length - 1; i >= 0; i--) {
		const thisRow = getSelectedRow(i);
		const thisColumn = getSelectedColumn(i);
		const numberOfAliveCellsArround = getAlivesArround(thisRow, thisColumn);

		if (numberOfAliveCellsArround == 3) {
			aliveCellsNumbersList.push(i);
		} else if (numberOfAliveCellsArround == 2 && document.querySelectorAll('.cell')[i].classList.contains('alive')) {
			aliveCellsNumbersList.push(i);
		} else {
			deadCellsNumbersList.push(i);
		}

	}

	for (let i = 0; i < aliveCellsNumbersList.length; i++) {
		document.querySelectorAll('.cell')[aliveCellsNumbersList[i]].classList.remove('dead');
		document.querySelectorAll('.cell')[aliveCellsNumbersList[i]].classList.add('alive');
	}
	for (let i = 0; i < deadCellsNumbersList.length; i++) {
		document.querySelectorAll('.cell')[deadCellsNumbersList[i]].classList.remove('alive');
		document.querySelectorAll('.cell')[deadCellsNumbersList[i]].classList.add('dead');
	}

	console.log('moved');
}

function getSelectedRow(cellNumber) {
	for (let i = 1; i <= height; i++) {
		if (document.querySelectorAll('.cell')[cellNumber].classList.contains(`r-${i}`)) {
			return i
		}
	}
}

function getSelectedColumn(cellNumber) {
	for (let i = 1; i <= width; i++) {
		if (document.querySelectorAll('.cell')[cellNumber].classList.contains(`c-${i}`)) {
			return i
		}
	}
}

function getAlivesArround(thisRow, thisColumn) {
	let numberOfAlivesArround = 0;
	const theRow = thisRow - 1;
	const theCol = thisColumn - 1;
	// r+ c
	try {
		if (allCellsList[theRow + 1][theCol].classList.contains('alive')) {
			numberOfAlivesArround++
		}
	}catch (error) {
		kosSher++
	} 
	// r+ c+
	try {
		if (allCellsList[theRow + 1][theCol + 1].classList.contains('alive')) {
			numberOfAlivesArround++
		}
	}catch (error) {
		kosSher++
	}
	// r+ c-
	try {
		if (allCellsList[theRow + 1][theCol - 1].classList.contains('alive')) {
			numberOfAlivesArround++
		}
	}catch (error) {
		kosSher++
	}
	// r- c
	try {
		if (allCellsList[theRow - 1][theCol].classList.contains('alive')) {
			numberOfAlivesArround++
		}
	}catch (error) {
		kosSher++
	}
	// r- c+
	try {
		if (allCellsList[theRow - 1][theCol + 1].classList.contains('alive')) {
			numberOfAlivesArround++
		}
	}catch (error) {
		kosSher++
	}
	// r- c-
	try {
		if (allCellsList[theRow - 1][theCol - 1].classList.contains('alive')) {
			numberOfAlivesArround++
		}
	}catch (error) {
		kosSher++
	}
	// r c+
	try {
		if (allCellsList[theRow][theCol + 1].classList.contains('alive')) {
			numberOfAlivesArround++
		}
	}catch (error) {
		kosSher++
	}
	// r c-
	try {
		if (allCellsList[theRow][theCol - 1].classList.contains('alive')) {
			numberOfAlivesArround++
		}
	}catch (error) {
		kosSher++
	}
	return numberOfAlivesArround
}
// r+ c
// r+ c+
// r+ c-
// r- c
// r- c+
// r- c-
// r c+
// r c-