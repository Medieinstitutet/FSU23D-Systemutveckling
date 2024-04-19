{
    let multiply = function(coordinates) {

        return coordinates.x*coordinates.y;
    }

    let coordinates = {
        "x": 3,
        "y": 4
    }
    
    console.log(multiply(coordinates));
}

{

    let coordinates = {
        "x": 3,
        "y": 4,
        "multiply": function() {
            return this.x*this.y;
        }
    }
    
    console.log(coordinates.multiply());
}

{
    let Coordinates = class {
        constructor() {
            this.x = 3;
            this.y = 4;
        }

        multiply() {
            return this.x*this.y;
        }
    }

    let coordinates = new Coordinates();
    console.log(coordinates.multiply());
}