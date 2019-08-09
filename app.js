const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./note.js");

yargs.version("1.0.0");

yargs.command({
	command: "add",
	describe: "Add personal notes",
	builder: {
		title: {
			describe: "Title of Note",
			demandOption: true,
			type: "string"
		},
		description: {
			describe: "Note Description",
			demandOption: true,
			type: "string"
		}
	},
	handler: function(argv) {
		// console.log("Title: " + title + "\nDescription: " + description);
		notes.add(argv.title, argv.description);
	}
});

yargs.command({
	command: "remove",
	describe: "Remove the note from the database.",
	builder: {
		title: {
			describe: "Title of the note to be removed.",
			demandOption: true,
			type: "string"
		}
	},
	handler: function(argv) {
		// console.log("Removing the note from database.");
		notes.remove(argv.title);
	}
});

yargs.command({
	command: "list",
	describe: "List the Notes in the Database",
	handler() {
		notes.list();
	}
});

yargs.command({
	command: "read",
	describe: "Read the notes to the user",
	builder: {
		title: {
			describe: "Title to read from the saved notes.",
			demandOption: true,
			type: "string"
		}
	},
	handler(argv) {
		notes.read(argv.title);
	}
});

yargs.parse();
