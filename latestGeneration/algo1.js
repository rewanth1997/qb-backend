var count;
var positions;
var positionsOfAllWords = [];
var words = ['tammana', 'durga', 'venkata', 'rewanth'];
var counterArray = [];
var checkSet;
var MAX_SIZE = 5;

var getRandom = () => {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

var getRandomPosition = (count) => {
	return Math.floor(Math.random() * count);
}

var getRandomDirection = () => {
	let direction = Math.floor(Math.random() * count);
	return direction % 4;
}

var getRandomDirectionForTop = () => {
	let direction = Math.floor(Math.random() * 3);
	let arr = [0,2,3];
	return arr[direction];
}

var check = (pos, next) => {

	let size = MAX_SIZE*4;
	let newPosition;
	console.log(pos, next);

	checkSet.add(next);


	if(next == 0) {
		newPosition = pos + 1;
		
		// Checking the boundary values
		for(let i = 1; i <= MAX_SIZE; i++) {
			if(pos == (size*i - 1)) {
				newPosition = pos + 1 - size;
			}
		}

		console.log(pos, next, document.getElementById(newPosition).innerHTML);
		if(document.getElementById(newPosition).innerHTML != "#") {
			if(Array.from(checkSet).length == 4) {
				return run();
			}
			return check(pos, getRandomDirection());
		}

		return newPosition;
	}

	if(next == 1) {
		newPosition = pos - size;

		// Checking whether the alloted position is empty or not
		// and changing its position
		if(pos > 0 && pos < size) {
			newPosition = pos + size;
			if(document.getElementById(newPosition) != '#') {
				newPosition = pos - 1;
				if(document.getElementById(newPosition) != '#') {
					newPosition = pos + 1;
					if(document.getElementById(newPosition) != '#') {
						newPosition = 10000;
					}
				}
			}
		}

		console.log(pos, next, document.getElementById(newPosition).innerHTML);

		if(document.getElementById(newPosition).innerHTML != "#") {
			if(Array.from(checkSet).length == 4) {
				return run();
			}
			return check(pos, getRandomDirection());
		}

		return newPosition;
	}

	if(next == 2) {
		newPosition = pos - 1;

		// Checking the boundary values
		for(let i = 1; i < MAX_SIZE; i++) {
			if(pos == (MAX_SIZE*4*i)) {
				newPosition = pos - 4*MAX_SIZE;
			}
		}

		if(pos == 0) {
			newPosition = pos + size - 1;
			if(document.getElementById(newPosition) != '#') {
				newPosition = pos + size;
				if(document.getElementById(newPosition) != '#') {
					newPosition = 10000;
				}
			}
		}
		
		console.log(pos, next, document.getElementById(newPosition).innerHTML);
		
		if(document.getElementById(newPosition).innerHTML != "#") {
			if(Array.from(checkSet).length == 4) {
				return run();
			}
			return check(pos, getRandomDirection());
		}

		return newPosition;
	}
	
	if(next == 3) {
		newPosition = pos + size;

		// Checking whether the alloted position is empty or not
		// and changing its position
		if(newPosition >= count) {
			newPosition = pos - size;
			if(document.getElementById(newPosition) != '#') {
				newPosition = pos - 1;
				if(document.getElementById(newPosition) != '#') {
					newPosition = pos + 1;
					if(document.getElementById(newPosition) != '#') {
						newPosition = 10000;
					}
				}
			}
		}
		console.log(pos, next, document.getElementById(newPosition).innerHTML);
		
		if(document.getElementById(newPosition).innerHTML != "#") {
			if(Array.from(checkSet).length == 4) {
				return run();
			}
			return check(pos, getRandomDirection());
		}

		return newPosition;
	}
}


var box = (size) => {
	
	let table = "";
	
	let row = size*4;
	let col = size;
	count = 0;

    for(let i = 0; i < col; i++) {
        table += '<tr>'
        for(let j = 0; j < row; j++) {
        	
	        table += '<td id="' + count  + '" ></td>';
	        count += 1;
        }
        table += '</tr>';        
    }
    console.log(table);
    document.getElementById('top').innerHTML = table;

    for(let i = 0; i < count; i++) {
    	document.getElementById(i).innerHTML = '#';
    }

}

var putName = (name) => {
	
	let pos = getRandomPosition(count);
	console.log(pos,count);
	let newPosition = pos;
	positions = []

	for(let i = 0; i < name.length; i++) {

		try {
			checkSet = new Set();
			newPosition = check(pos, getRandomDirection());
			pos = newPosition;
			document.getElementById(newPosition).innerHTML = name[i];
			positions.push(newPosition);
		}
		catch(err) {
			console.log(err);
			return 0;
		}
	
	}
}

// Makes sure that the answer doesn't move more than 3 faces/
var numberOfFacesCovered = () => {

	let rangeArray = positions.map((num) => num % (4 * MAX_SIZE));
	let maxFace = Math.max(...rangeArray)/5;
	let minFace = Math.min(...rangeArray)/5;
	let range = Math.abs(maxFace - minFace);

	// Since this will be folded this isn't a violation
	if(maxFace == 4 && maxFace == 1) {
		return 1;
	}

	return range;
}

var run = () => {

	//positionsOfAllWords = [[], [], [], []];
	//counterArray = [0, 0, 0, 0];
	positionsOfAllWords = [];
	counterArray = [];

	for(let i = 0; i < MAX_SIZE; i++) {
		positionsOfAllWords.push([]);
		counterArray.push(0);
	}
	
	box(MAX_SIZE);
	putName1(0);
	putName1(1);
	putName1(2);
	putName1(3);
	
}

var putName1 = (functionId) => {
	
	let res;
	res = 1; 
	
	res = putName(words[functionId]);
	let range = numberOfFacesCovered();

	if(res == 0 || range > 1) {
		for(let i = 0; i < positions.length; i++) {
			document.getElementById(positions[i]).innerHTML = '#';
		}

		if(counterArray[functionId] >= 5) {
			if(functionId == 0) {
				return run();
			}
			else {
				for(let i = 0; i < positionsOfAllWords[functionId].length; i++) {
					document.getElementById(positionsOfAllWords[functionId][i]).innerHTML = '#';
				}
				counterArray[functionId] = 0;
				return putName1(functionId - 1);
			}
		}

		positionsOfAllWords[0] = positions;

		counterArray[functionId] += 1;
		return putName1(functionId);
	}
}

run();

let temp = 0;
let grid = [];
for(let i = 0; i < MAX_SIZE; i++) {
	grid.push([]);
	for(let j = 0; j < MAX_SIZE*4; j++) {
		grid[i].push(document.getElementById(temp).innerHTML);
		temp += 1;
	}
}

// Split the grid into faces
let faces = [[], [], [], []];
for(i = 0; i < 4; i++) {
    let s = '';
    for(j = 0; j < MAX_SIZE; j++) {
        s += grid[j].splice(0, MAX_SIZE).join('');
    }
    faces[i] = s;
}

