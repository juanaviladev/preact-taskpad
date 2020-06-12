import {SQLiteTaskDao} from "./persistence/SQLiteTaskDao";
import {LocalStorageTaskDao} from "./persistence/LocalStorageTaskDao";
import {InMemoryDao} from "./persistence/InMemoryDao";

const _dao = (async () => {
    let dao;
    if (typeof window !== "undefined") {
        if (window.localStorage) {
            dao = new LocalStorageTaskDao(window.localStorage)
        }
        else if(window.openDatabase) {
            dao = new SQLiteTaskDao()
        }
        else {
            dao = new InMemoryDao();
        }
    } else {
        dao = new InMemoryDao();
    }
    try {
        await dao.init()
    }
    catch (e) {
        return new InMemoryDao()
    }
    return dao
})();

export const dao = _dao;