const fs=require("fs");

// create folder synchronously

const createFolder=(folderName)=>{
// check if folder already exist 
if(!fs.existsSync(folderName)){
    // then create folder if not exist
fs.mkdirSync(folderName);
    
}};


// create a default post for posts
const defaultPosts=`[{
"id":"2020",
"title":"HTML",
"url":"http://someurl.com",
"description":"The best"
}]`

// create file synchronously
const createFile=(fileName)=>{
    // check if file already exists
    if(!fs.existsSync(fileName)){
        fs.writeFileSync(fileName,defaultPosts);
    }
};

module.exports={
    createFolder,
    createFile
}