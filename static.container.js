module.exports = class Container{

    static counter = 0;
    static container = [];

    static getAll(){
        try{
            return this.container;
        } catch (error){
            throw new Error(`${error.message}`);
        }
    }

    static getById(id){
        return this.container.filter(object => object.id == id);
    }

    static modify(object, id){
        let index = this.container.indexOf(object => object.id == id);
        object.id = id;
        this.container = this.container.splice(index, 1, object);
        return this.container;
    }

    static save(object){
        try{
            this.counter++;
            object.id = this.counter;
            this.container.push(object);
            return object;
        } catch (error){
            throw new Error(`${error.message}`);
        }
    }

    static delete(id){
        let index = this.container.findIndex(object => object.id == id);
        if (index >= 0){
            this.container = this.container.splice(index, 1);
            return this.container;
        }       
    }
}