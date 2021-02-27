import {db} from './firebase';

export default class TodoService {

    static collection  = db.collection('Todos');

    static getRandomFirebaseID(collectionName) {
        return db.collection(collectionName).doc().id;
    }

    static async addTodo(todo) {
        return TodoService.collection.doc(todo.id).set(todo);
    }

    static async getTodos() {
        return TodoService.collection.get();
    }

    static async deleteTodo(id) {
        return TodoService.collection.doc(id).delete(id);
    }

    static async editTodo(todo) {
        const id = todo.id;
        return TodoService.collection.doc(id).update(todo);
    }

}