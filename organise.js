let fs = require("fs")
let path = require("path"); 
let types = {
    media: ["mp4","mkv","mp3"],
    archives:["zip", "7z", "rar", "tar", "gz", "iso", "xz"], 
    documents:["docx","pdf", "doc", "xlsx", "xls", "odt", "ods", "odp", "odf","odg", "txt","ps"],
    app:["exe","dmg","pkg","deb"]
}


function makeDir(src){
    if (src == undefined)
    {
        src = process.cwd();
    }

    let organizedFilesPAth = path.join(src,"organized_files");
    if(fs.existsSync(organizedFilesPAth)==false)
    {
        fs.mkdirSync(organizedFilesPAth);
    }

    let allTheFiles = fs.readdirSync(src);
    for(let i=0; i<allTheFiles.length;i++)
    {
        let fullOriginPath = path.join(src,allTheFiles[i]);
        if(fs.lstatSync(fullOriginPath).isFile()==true)
        {
            let folderName = checkExtensionAndFolder(allTheFiles[i]);
            copyFileToDest(folderName,fullOriginPath,src);
        }
    }
}   

    function checkExtensionAndFolder(fileName)
    {
        let typeOfExt = path.extname(fileName);
            typeOfExt = typeOfExt.slice(1);
        for(let key in types)
        {
            for (let i=0; i<types[key].length;i++)
            {
                if (types[key][i]==typeOfExt)
                {
                    return key;
                }
            }
        }
        return "others"
    }

    function copyFileToDest(folderName, fullOriginPath, src)
    {
        let destPath = path.join(src,"organized_files",folderName)
        if(fs.existsSync(destPath)==false)
        {
            fs.mkdirSync(destPath);
        }
        let originalFileName = path.basename(fullOriginPath);
        let destFilePath = path.join(destPath,originalFileName)
        fs.copyFileSync(fullOriginPath,destFilePath);
        console.log(originalFileName,"copied to", folderName);
    }


module.exports={
    
    fxn: makeDir
}