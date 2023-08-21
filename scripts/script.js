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
var numMinorErrors = 0;
// boolleans
var gameNotStarted = true;
var isCellCreated = false;



// handle automove type
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


// handle sumbit
submitBtn.addEventListener('click', event =>{ 
	ruinCells();
	createCells(widthInput.value, اheightInput.value);
});

moveBtn.addEventListener('click', move);



// functions


function createCells(thisWidth, thisHeight) {
	// console.log(!!(thisHeight * thisHeight % 2));
	if (!((thisHeight * thisWidth) % 2)) {
		++thisWidth;
	} 
	cellContainer.style.width = window.innerWidth - window.innerWidth / 20 + 'px';
	cellContainer.style.gridTemplateRows = `repeat(${thisHeight}, 50px)`;
	cellContainer.style.gridTemplateColumns = `repeat(${thisWidth}, 50px)`;
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
			event.target.active = false;
		} else{
			event.target.classList.add('alive');
			event.target.classList.remove('dead');
			event.target.active = true;	
		}
	}
}


function move() {
	// all cells that are possible to be alive or dead next move
	allPossibleCells = getPossibleCells(document.querySelectorAll('.cell'));
	aliveCellsList = [];
	aliveCellsNumbersList = [];
	deadCellsList = [];
	deadCellsNumbersList = [];

	// --------- algorythme --------- //
	// for all cells
		// get selected row
		// get selected column
		// get number of alives arround

	allPossibleCells.forEach(cell => {
		index = cell.index;
		thisRow = getSelectedRow(index);
		thisColumn = getSelectedColumn(index);
		numberOfAliveCellsArround = getAlivesArround(thisRow, thisColumn);

		if (numberOfAliveCellsArround == 3 || (numberOfAliveCellsArround == 2 && cell.cell.active)) {
			aliveCellsNumbersList.push(index);
		} else {
			deadCellsNumbersList.push(index);
		}
	})

	for (let i = 0; i < aliveCellsNumbersList.length; i++) {
		document.querySelectorAll('.cell')[aliveCellsNumbersList[i]].classList.remove('dead');
		document.querySelectorAll('.cell')[aliveCellsNumbersList[i]].classList.add('alive');
		document.querySelectorAll('.cell')[aliveCellsNumbersList[i]].active = true;
	}
	for (let i = 0; i < deadCellsNumbersList.length; i++) {
		document.querySelectorAll('.cell')[deadCellsNumbersList[i]].classList.remove('alive');
		document.querySelectorAll('.cell')[deadCellsNumbersList[i]].classList.add('dead');
		document.querySelectorAll('.cell')[deadCellsNumbersList[i]].active = false;
	}

	console.log('moved');
}


function getSelectedRow(cellNumber) {
	for (let i = 1; i <= height; i++) {
		if (document.querySelectorAll('.cell')[cellNumber]?.classList.contains(`r-${i}`)) {
			return i
		}
	}
}


function getSelectedColumn(cellNumber) {
	for (let i = 1; i <= width; i++) {
		if (document.querySelectorAll('.cell')[cellNumber]?.classList.contains(`c-${i}`)) {
			return i
		}
	}
}

// see what cells have chnace to be alive or die out next step
function getPossibleCells(cells) {
	const cellsList = [];
	for(let i = 0; i < cells.length; i++) {
		cellsList.push(cells[i])
	}

	const aliveCells = []
	cellsList.forEach((cell, index) => {
		cell.active &&  aliveCells.push({cell, index})
	})
	const possibleCells = [];
	aliveCells.forEach((cell) => possibleCells.push(cell));
	aliveCells.forEach(cell => {
		const i = cell.index;
		[i - Number(width) - 1, i - Number(width), i - Number(width) + 1,i - 1, i + 1, i + Number(width) - 1, i + Number(width), i + Number(width) +1 ].forEach(index => {
			cell = cellsList[index];
			!possibleCells.includes(cell) && possibleCells.push({cell, index})
		})
	})
	return possibleCells
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
		numMinorErrors++
	} 
	// r+ c+
	try {
		if (allCellsList[theRow + 1][theCol + 1].classList.contains('alive')) {
			numberOfAlivesArround++
		}
	}catch (error) {
		numMinorErrors++
	}
	// r+ c-
	try {
		if (allCellsList[theRow + 1][theCol - 1].classList.contains('alive')) {
			numberOfAlivesArround++
		}
	}catch (error) {
		numMinorErrors++
	}
	// r- c
	try {
		if (allCellsList[theRow - 1][theCol].classList.contains('alive')) {
			numberOfAlivesArround++
		}
	}catch (error) {
		numMinorErrors++
	}
	// r- c+
	try {
		if (allCellsList[theRow - 1][theCol + 1].classList.contains('alive')) {
			numberOfAlivesArround++
		}
	}catch (error) {
		numMinorErrors++
	}
	// r- c-
	try {
		if (allCellsList[theRow - 1][theCol - 1].classList.contains('alive')) {
			numberOfAlivesArround++
		}
	}catch (error) {
		numMinorErrors++
	}
	// r c+
	try {
		if (allCellsList[theRow][theCol + 1].classList.contains('alive')) {
			numberOfAlivesArround++
		}
	}catch (error) {
		numMinorErrors++
	}
	// r c-
	try {
		if (allCellsList[theRow][theCol - 1].classList.contains('alive')) {
			numberOfAlivesArround++
		}
	}catch (error) {
		numMinorErrors++
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