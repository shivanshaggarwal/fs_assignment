const { mainModule } = require("process");

let inputArr = process.argv.slice(2);

if(inputArr[0] == "organize")
{
  let exportObj = require("./organise")
  //console.log(exportObj.b)
  console.log(exportObj.fxn(inputArr[1]))
}
else if(inputArr[0]== "tree")
{
  let exportObj = require("./tree")
  console.log(exportObj.fxn(inputArr[1]));
}

