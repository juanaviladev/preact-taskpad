import { TaskDao } from './TaskDao';

export class InMemoryDao extends TaskDao {

    constructor() {
        super();
        this.tableName = "task_table"
        this.initiated = false
        this.sequence = "task_seq"
        this.tasks = {};
        this.sequence = 0;
    }

    init() {
        if(this.initiated)
            return

        const existingTable = this.__restore()
        if(!existingTable) {
            this.__save({})
            this.sequence = 0
        }
        this.initiated = true
    }

    create(note) {
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
        this.tasks = table
    }

    __restore() {
        return this.tasks
    }

    read(id) {
        const table = this.__restore();
        return table[id]
    }

    readAll() {
        const entries = this.__restore()
        return Object.values(entries)
    }

    update(note) {
        const table = this.__restore();
        let existing = table[note.id]
        existing.body = note.body;
        this.__save(table)
    }

    __nextId() {
        let lastId = this.sequence
        const newId = ++lastId
        this.sequence = newId
        return newId
    }

    delete(id) {
        const table = this.__restore()
        delete table[id]
        this.__save(table)
    }

    deleteAll() {
        this.__save({})
        this.sequence = 0
    }
}