export default class Database{

    static data = [
        {"id": 0, "name":"Play BasketBall", "num":[2,3], "category":"outdoor", "equipment":["basketball"], "time-length":[50, 90], "img":"assets/img/curry.jpg", "description":"Haha"},
        {"id": 1, "name":"Play Soccer", "num":[3,5], "category":"outdoor", "equipment":["soccer"], "time-length":[60, 80], "img":"assets/img/balotelli.jpg", "description":"testing"},
        {"id": 2, "name":"Sing", "num":[2,5], "category":"indoor", "equipment":["microphone", "speaker"], "time-length":[20,40], "img":"assets/img/gem.jpg", "description":"yo"},
        {"id": 3, "name":"Party", "num":[40,50], "category":"others", "equipment":["N/A"], "time-length":[20,40], "img":"assets/img/party.jpg", "description":"yo"}
    ];




    static setLike(card) {
        let arr = localStorage.getItem('favorite');
        if(arr == null) {
            arr = []
        } else {
            arr = JSON.parse(arr);
        }
        arr.push(card.json());
        localStorage.setItem('favorite', JSON.stringify(arr));
    }

    static getVisited() {
        const visited = localStorage.getItem('visited');
        if(visited) {
            return visited;
        } else {
            return 0;
        }
    }

    static setVisited(card) {
        const visited = Database.getVisited();
        visited += 1;
        localStorage.setItem('visited', visited);

    }

    static getMatches(num) {
        const matches = [];
        const start = Database.getVisited();
        for(let i=start; i<Database.length; i++) {
            if(i >= start + num) {
                break;
            }
            matches.push({...Database.data[i]});
        }

        return matches;
    }


    static setNoteboard(noteboard) {
        localStorage.setItem('noteboard', JSON.stringify(noteboard))
    }

    static getNoteboard() {
        const noteboard = localStorage.getItem('noteboard');
        if(noteboard != null) {
            return JSON.parse(noteboard);
        } else {
            return [];
        }
    }





}