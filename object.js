const obj = {
    name: "Adrian",
    greet: function() {
        //console.log("Hello, " + this.name);
        console.log(`Hello, ${this.name}`);
    },
    greet2: () => {
        console.log("Hello, "  + this.name);
    }
}

obj.name = "Mihai";

obj.greet = function(){
    console.log('My name is Adrian')
}

obj.greet();