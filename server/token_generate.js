import fs from 'fs';
import hash from 'object-hash';
import config from './config.json' assert {type: "json"};

const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var token = "";
for(var i=0; i<15; i++){
    var index = Math.floor(Math.random()*arr.length);
    token += arr[index];
}
token += Date.now();
token = hash(token);
console.log("\n请妥善保管token, 您的token为: " + token+"\n");
token = hash(token);

config["TOKEN"] = token;

const data = JSON.stringify(config, null, "\t");
fs.writeFileSync('config.json', data);
