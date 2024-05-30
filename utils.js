const fs = require('fs');

const db = "db.json";

function withDBRead(res, callback) {
	fs.readFile(db, "utf8", (e, json) => {
		try {
			const dbData = JSON.parse(json);
			callback(dbData);
		} catch (e) {
			console.log(e.message);
			res.status(500).json({ message: e.message });
		}
	})
}

function updateDB(data) {
	fs.writeFile(db, JSON.stringify({ movies: data }), () => {});
}

module.exports = {
	withDBRead,
	updateDB
}