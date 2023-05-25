const body = document.querySelector('body');
const settings = document.querySelector('.settings');
const widthInput = document.querySelector('input.width-input');
const اheightInput = document.querySelector('input.height-input');
const submitBtn = document.querySelector('button.submit-btn');
const moveBtn = document.querySelector('button.move-btn');
const cellContainer = document.querySelector('div.cell-container');
const autoMoveCheckBox = document.querySelector('input[type="checkbox"]');
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


autoMoveCheckBox.addEventListener('click', event => {
	let intervalID = 'hello';
	if (width * height < 250 ) {
		intervalID = setInterval(function () {
			if (autoMoveCheckBox.checked) {
				move();
			} else {
				clearInterval(intervalID);
				console.log('didint Stop');
			}
		}, 100);
	} else {
		intervalID = setInterval(function () {
			if (autoMoveCheckBox.checked) {
				move();
			} else {
				clearInterval(intervalID);
				console.log('didint Stop');
			}
		}, 5000);
	}
})


submitBtn.addEventListener('click', event =>{ 
	ruinCells();
	createCells(widthInput.value, اheightInput.value);
});

moveBtn.addEventListener('click', move);



// functions


function createCells(thisWidth, thisHeight) {
	cellContainer.style.width = window.innerWidth - window.innerWidth / 20 + 'px';
	cellContainer.style.gridTemplateRows = `repeat(${thisHeight}, 1fr)`;
	cellContainer.style.gridTemplateColumns = `repeat(${thisWidth}, auto)`;
	for (let i = 0; i < thisHeight; i++) {
		allCellsList.push([]);
		for (let j = 0; j < thisWidth; j++) {
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
	// create variables
	let numberOfAlivesArround = 0;
	const theRow = thisRow - 1;
	const theCol = thisColumn - 1;

	// check 8 conditions implicitly
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