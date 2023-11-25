const express =require("express");
const fs=require("fs");
const {createFile,createFolder}=require("./utils");
const postsData=require("./data/posts.json");
// console.log(postsData);

// console.log("Server is running");

const app=express();  // creating instance of express

// to tell express to pass the incoming data to existing file
app.use(express.json());


  
// create folder
createFolder("data");

// create file
createFile('data/posts.json',"Content here");


// routing in express 
app.get('/posts',function(req,res){
    res.json({
        message:"Post fetched successfully",
        postsData
    })
})

// fetch all posts, , to get posts data of posts.json file
// all API responses returns a json data means key-value pair


// app.get('/posts',function(req,res){
//     res.json({
//         message:"Post fetched successfully",
//         postsData
//     })
// })




// post a request
app.post('/posts',function(req,res){
   // get the post from user
   const newPost=req.body;

   // push new post to existing post
   postsData.unshift({
    ...newPost,
    id:postsData.length.toString(),
   })
  
   // write to a file
   fs.writeFile("data/posts.json", JSON.stringify(postsData),function(err){
    if(err){
        console.log("Error Occurred");
    }
    // else send message to users
    else{
        res.json({message:"Post created successfully"});
    }
   });
    
});








// update a post
app.put('/posts/:id',function(req,res){
   // get the id of post to update
   const id=req.params.id;
   const {title,url,description}=req.body;

   // find the post to update
   const postFound=postsData.find(function(post){
    return post.id==id;
   })
   if(!postFound){
   return res.json({message:"Post not found"});
   }

// filter out all the post wih the post found
const filteredPost=postsData.filter(function(post){
    return post.id!==id;
})

// update the post found
postFound.title=title;
postFound.url=url;
postFound.description=description;


// push the updated post into the filtered post
filteredPost.unshift(postFound);

// write the updated post into the file
fs.writeFile("data/posts.json",JSON.stringify(filteredPost),function(err){
    if(err){
        console.log(error);
    }
    else{
        res.json("post updated successfully");
    }
})


})









// delete a post
app.delete('/posts/:id',function(req,res){
    // get the id to delete a post
    const id=req.params.id;

    const filteredPost=postsData.filter(function(post){
        return post.id!==id;
    })
     
    // write to the file remaining filter posts means non deleted posts
    fs.writeFile("data/posts.json",JSON.stringify(filteredPost),function(err){
        if(err){
            console.log(err);
        }
        else{
            res.json({
                message:"Post deleted successfully",
            });
        }
    });

});






// fetch single post
app.get('/posts/:id',function(req,res){
  // fetch the id of the post using params
  const id=req.params.id;
  //find post by id
  const postFound=postsData.find((post)=>{
    return post.id==id;
  })
  if(!postFound){
    res.json({message:"post not found"});
  }else{
    res.json(postsData);  // sending the actual post
  }
})

// create a server

app.listen(9000,function(){
    console.log("server is running");
})
