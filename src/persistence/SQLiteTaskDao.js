import { TaskDao } from './TaskDao';

export class SQLiteTaskDao extends TaskDao {

    constructor() {
        super();
        this.shortName = 'notepad';
        this.version = '1.0';
        this.initiated = false
        this.displayName = 'notepad';
        this.maxSize = 65536; // in bytes
    }

    async init() {
        if(this.initiated)
            return Promise.resolve()

        return new Promise((resolve, reject) => {
            openDatabase(this.shortName, this.version, this.displayName, this.maxSize,(db) => {
                if(db === null)
                    reject()

                this.db = db
                this.db.transaction(tx => {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS task (id INTEGER PRIMARY KEY AUTOINCREMENT, body TEXT NOT NULL)');
                },(err) => {
                    reject()
                },() => {
                    this.initiated = true
                    resolve()
                });
            });

        })

    }

    async create(note) {
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql('INSERT INTO task (body) VALUES (?)', [note.body],  (tx, results) => {
                    if(results.rowsAffected === 1) {
                        resolve({
                            body: note.body,
                            id: results.insertId
                        })
                    }
                    else {
                        reject("Not inserted")
                    }
                });
            },(err) => {
                reject(err)
            })
        })
    }

    async read(id) {
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql('SELECT * FROM task WHERE id = ?', [id],  (tx, results) => {
                    if(results.rows.length === 1) {
                        resolve(results.rows[0])
                    }
                    else {
                        reject("Not found")
                    }
                });
            },(err) => {
                reject(err)
            })
        })
    }

    async readAll() {
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql('SELECT * FROM task', [],  (tx, results) => {
                    const dtos = []
                    for(let i = 0; i < results.rows.length; i++) {
                        const row = results.rows.item(i);
                        dtos.push(row)
                    }
                    resolve(dtos)
                });
            },(err) => {
                reject(err)
            })
        })
    }

    async update(note) {
        return new Promise((resolve, reject) => {
            const id = note.id
            const body = note.body
            this.db.transaction((tx) => {
                tx.executeSql('UPDATE task SET body = ? WHERE id = ?', [body, id],  (tx, results) => {
                    if(results.rowsAffected === 1) {
                        resolve()
                    }
                    else {
                        reject("0 rows updated")
                    }
                });
            },(err) => {
                reject(err)
            });
        });
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql('DELETE FROM task WHERE id = ?', [id],  (tx, results) => {
                    if(results.rowsAffected === 1) {
                        resolve()
                    }
                    else {
                        reject("0 rows updated")
                    }
                });
            },(err) => {
                reject(err)
            });
        });
    }

    async deleteAll() {
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql('DELETE FROM task', [],  (tx, results) => {
                        resolve()
                });
            },(err) => {
                reject(err)
            });
        });
    }
}