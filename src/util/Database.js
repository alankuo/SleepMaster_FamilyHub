export default class Database{

    static data = [
        {"id": 0, "name":"Play BasketBall", "num":[2,3], "category":"outdoor", "equipment":["basketball"], "time-length":[50, 90], "img":"assets/img/curry.jpg", "description":"Haha",
      "comments": [{"name": "Lan Wang", "comment": "Really enjoy it with my family!"},{"name": "Yuhan Wang", "comment": "Like it!"}]},

        {"id": 1, "name":"Play Soccer", "num":[3,5], "category":"outdoor", "equipment":["soccer"], "time-length":[60, 80], "img":"assets/img/balotelli.jpg", "description":"testing",
        "comments": [{"name": "Alan Kuo", "comment": "My fav!"},{"name": "Yuhan Wang", "comment": "Like it!"}]},

        {"id": 2, "name":"Sing", "num":[2,5], "category":"indoor", "equipment":["microphone", "speaker"], "time-length":[20,40], "img":"assets/img/gem.jpg", "description":"yo",
          "comments": [{"name": "Lan", "comment": "enjoy!"},{"name": "Yuhan", "comment": "Love it!"}]},

        {"id": 3, "name":"Party", "num":[40,50], "category":"others", "equipment":["N/A"], "time-length":[20,40], "img":"assets/img/party.jpg", "description":"yo",
          "comments": [{"name": "Guo", "comment": "enjoy it with my family!"},{"name": "Yuhan Wang", "comment": "I really Like it!"}]},

        {"id": 4, "name":"Play BasketBall", "num":[2,3], "category":"outdoor", "equipment":["basketball"], "time-length":[50, 90], "img":"assets/img/curry.jpg", "description":"Haha",
          "comments": [{"name": "Lan Wang", "comment": "Really enjoy it with my family!"},{"name": "Yuhan Wang", "comment": "Like it!"}]}
    ];

    static test = true;

    static init(test) {
        // set fake data
        Database.test = test;
        if(test) {
            localStorage.setItem('activities', JSON.stringify(Database.data));
        }
    }


    static getActivities() {
        const data = localStorage.getItem('activities');

        if(data) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }


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

    static setUnlike(card) {
        let arr = localStorage.getItem('favorite');
        if(arr == null) {
            arr = []
        } else {
            arr = JSON.parse(arr);
        }

        for(let i=0; i < arr.length; i++) {
            if(arr[i].img == card.img && arr[i].name == card.name) {
                arr.splice(i, 1)
            }
        }
        localStorage.setItem('favorite', JSON.stringify(arr));

    }

    static getVisited() {
        const visited = localStorage.getItem('visited');
        if(visited) {
            return parseInt(visited);
        } else {
            return 0;
        }
    }

    static setVisited() {
        let visited = Database.getVisited();
        visited += 1;
        console.log(visited);
        localStorage.setItem('visited', visited);

    }

    static undoVisited() {
        let visited = Database.getVisited();
        visited -= 1;
        console.log(visited);
        localStorage.setItem('visited', visited);
    }
    static getMatches(num) {
        const matches = [];
        const start = Database.getVisited();
        const data = Database.getActivities()
        for(let i=start; i<data.length; i++) {
            if(i >= start + num) {
                break;
            }
            matches.unshift({...data[i]});
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