import {TaskDao} from './TaskDao';

export class LocalStorageTaskDao extends TaskDao {

    constructor(storage) {
        super();
        this.tableName = "task_table"
        this.sequence = "task_seq"
        this.conn = storage;
        const existingTable = this.__restore()
        if(!existingTable) {
            this.__save({})
            this.conn.setItem(this.sequence, "0")
        }
    }

    async create(note) {
        let table = this.__restore();
        const id = this.__nextId()
        table[id] = {
            body: note.body,
            id: id
        }
        this.__save(table)
        return table[id]
    }

    __save(table) {
        this.conn.setItem(this.tableName,JSON.stringify(table))
    }

    __restore() {
        return JSON.parse(this.conn.getItem(this.tableName))
    }

    async read(id) {
        const table = this.__restore();
        return table[id]
    }

    async readAll() {
        const entries = this.__restore()
        return Object.values(entries)
    }

    async update(note) {
        const table = this.__restore();
        let existing = table[note.id]
        existing.body = note.body;
        this.__save(table)
    }

    __nextId() {
        let lastId = Number(this.conn.getItem(this.sequence))
        const newId = ++lastId
        this.conn.setItem(this.sequence,newId.toString())
        return newId
    }

    async delete(id) {
        const table = this.__restore()
        delete table[id]
        this.__save(table)
    }

    deleteAll() {
        this.__save({})
        this.conn.setItem(this.sequence, "0")
    }
}