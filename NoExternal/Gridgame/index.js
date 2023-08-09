var player = {
    cord: {
        x: 0,
        y: 0
    },
    ori_cord: {
        x: 0,
        y: 0
    },
    hp: 10
};
var thing = {
    tree: {
        cord: [[2,0],[2,1]],
        thing_resource: ["wood"]
    },
    test: {
        cord: [[1,2]]
    }
};

var temp_num = 0;
var temp_string = "";

for (let j = 0; j < Object.keys(thing).length; j++){
    if (Object.hasOwn(thing[Object.keys(thing)[j]], "cord")){
        for (let i = 0; i < thing[Object.keys(thing)[j]].cord.length; i++) {
            document.getElementById("table_main").getElementsByClassName("row")[thing[Object.keys(thing)[j]].cord[i][1]].getElementsByClassName("col")[thing[Object.keys(thing)[j]].cord[i][0]].textContent = Object.keys(thing)[j];
        }
    } else {
        break;
    }
}
var resource = {
    wood: 0
}

const PlayerLocation = document.getElementById("cord_player");
document.addEventListener("keydown", function (event) {
    // Im too lazy to fix this lol
    // it's supposed to start you at the center not at the top-left
    // player.y = (event.code == "ArrowUp") ? player.y + 1 : player.y;
    // player.y = (event.code == "ArrowDown") ? player.y - 1 : player.y;
    player.ori_cord.x = player.cord.x;
    player.ori_cord.y = player.cord.y;
    player.cord.y = (event.code == "ArrowUp") ? player.cord.y - 1 : player.cord.y;
    player.cord.y = (event.code == "ArrowDown") ? player.cord.y + 1 : player.cord.y;
    player.cord.x = (event.code == "ArrowRight") ? player.cord.x + 1 : player.cord.x;
    player.cord.x = (event.code == "ArrowLeft") ? player.cord.x - 1 : player.cord.x;
    update();
});

function btn_arrowkeys(num) {
    player.ori_cord.x = player.cord.x;
    player.ori_cord.y = player.cord.y;
    switch (num) {
        case 1:
            player.cord.y -= 1;
            break;
        case 2:
            player.cord.x -= 1;
            break;
        case 3:
            player.cord.x += 1;
            break;
        case 4:
            player.cord.y += 1;
            break;
        default:
            console.log("illegal activities");
            break;
    }
    update();
}


function update() {
    document.getElementById("table_main").getElementsByClassName("row")[player.ori_cord.y].getElementsByClassName("col")[player.ori_cord.x].style.backgroundColor = "white";
    player.cord.x = player.cord.x > document.getElementById("table_main").getElementsByClassName("row")[0].childElementCount-1 ? player.cord.x - 1 : player.cord.x;
    player.cord.x = player.cord.x == -1 ? player.cord.x + 1 : player.cord.x;

    player.cord.y = player.cord.y > document.getElementById("table_main").getElementsByClassName("row")[0].childElementCount-1 ? player.cord.y - 1 : player.cord.y;
    player.cord.y = player.cord.y == -1 ? player.cord.y + 1 : player.cord.y;


    PlayerLocation.innerHTML = "player : (" + player.cord.x + "," + player.cord.y + ")";
    document.getElementById("table_main").getElementsByClassName("row")[player.cord.y].getElementsByClassName("col")[player.cord.x].style.backgroundColor = "rgb(0,255,0)";

    for (let i=0;i < thing.tree.cord.length;i++){
        if (player.cord.x == thing.tree.cord[i][0] && player.cord.y == thing.tree.cord[i][1]){
            document.getElementById("btn_collect_manual").disabled = false;
            document.getElementById("btn_collect_manual").style.opacity = 1;
            break;
        }else {
            document.getElementById("btn_collect_manual").style.opacity = 0;
            document.getElementById("btn_collect_manual").disabled = true;
        }
    }
}

function collect_manual(){
    temp_string = document.getElementById("table_main").getElementsByClassName("row")[player.cord.y].getElementsByClassName("col")[player.cord.x].textContent;

    temp_num = thing[temp_string].thing_resource.length;
    for (let i = 0; i < temp_num; i++){
        temp_string = document.getElementById("table_main").getElementsByClassName("row")[player.cord.y].getElementsByClassName("col")[player.cord.x].textContent;
        temp_string = thing[temp_string].thing_resource[i];
        resource[temp_string] += 1;
    }
    document.getElementById("div_resource").getElementsByTagName("p")[0].textContent = "wood: "+resource.wood;
}
function tick(){
    // :eyes:
}
