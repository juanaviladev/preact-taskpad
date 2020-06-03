import {SQLiteTaskDao} from "./persistence/SQLiteTaskDao";
import {LocalStorageTaskDao} from "./persistence/LocalStorageTaskDao";
import {InMemoryDao} from "./persistence/InMemoryDao";

export const taskDaoInstance = (() => {
    if(typeof window !== "undefined") {
        if(window.openDatabase) {
            return new SQLiteTaskDao()
        }
        else {
            return new LocalStorageTaskDao(window.localStorage)
        }
    }
    else {
        return new InMemoryDao()
    }
})()
