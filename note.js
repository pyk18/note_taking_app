const fs = require("fs");
const chalk = require("chalk");

const removeNote = function(title) {
	const notes = loadNotes();
	if (notes.length === 0) {
		console.log(chalk.red.inverse("There are not records."));
		return;
	}
	const newNotes = notes.filter(note => note.title !== title);
	if (newNotes.length === notes.length) {
		console.log(chalk.red('No Notes with Title "' + title + '" found.'));
		return;
	}
	saveNotes(newNotes);
	console.log(chalk.green.bold('Notes with title "' + title + '" removed.'));
};

function addNotes(title, description) {
	const notes = loadNotes();
	const duplicateNotes = notes.filter(note => note.title === title);
	if (duplicateNotes.length === 0) {
		notes.push({
			title: title,
			description: description
		});
		console.log("new note added");
	} else {
		console.log("Title is taken, try different title");
	}
	saveNotes(notes);
}

function saveNotes(notes) {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync("notes.json", dataJSON);
	return;
}
function loadNotes() {
	try {
		const dataBuffer = fs.readFileSync("notes.json");
		const dataString = dataBuffer.toString();
		return JSON.parse(dataString);
	} catch (e) {
		return [];
	}
}

const listNotes = () => {
	const notes = loadNotes();
	if (notes.length === 0) {
		console.log(chalk.red.inverse("No Notes present."));
		return;
	}

	notes.forEach(element => {
		console.log(
			chalk.underline.bold.red.inverse("Title") + ": " + element.title
		);
		console.log(
			chalk.underline.bold.red.inverse("Body") + ": " + element.description
		);
		console.log("*".repeat(50));
	});
};
const readNotes = title => {
	notes = loadNotes();
	const noteToPrint = notes.find(note => note.title === title);
	if (noteToPrint) {
		console.log(
			chalk.green.inverse("Title") +
				": " +
				chalk.yellow.inverse(noteToPrint.title)
		);
		console.log(chalk.green.inverse("Body") + ": " + noteToPrint.description);
	} else {
		console.log(chalk.red.inverse("No Notes found."));
	}
};
module.exports = {
	add: addNotes,
	remove: removeNote,
	list: listNotes,
	read: readNotes
};
