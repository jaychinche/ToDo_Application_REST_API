const express = require("express");
const app = express();
const port = 4001;
const path = require("path");


const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Update this line
app.use(express.static(path.join(__dirname, "public")));


app.listen(port, () => {
    console.log("Server is running on port", port);
});

let arraypost = [
    {
        id: uuidv4(),
        content: "i am happy"
    },
    {
        id: uuidv4(),
        content: "dinner"
    },
    {
        id: uuidv4(),
        content: "lanuch"
    }
];
app.get("/todoapp", (req, res) => {
    res.render("index.ejs",{arraypost});
});
app.post("/todoapp", (req, res) => {
    let {content}=req.body;
    let id= uuidv4();
    arraypost.push({ id, content });
    res.render("index.ejs",{arraypost});
});

app.post("/todoapp/create", (req, res) => {
    res.render("createtodo.ejs");
})

app.get("/todoapp/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = arraypost.find((p) => id === p.id);
    res.render("edit.ejs", { post });
})

app.patch("/todoapp/:id", (req, res) => {
    let { id } = req.params;
    let post = arraypost.find((p) => id === p.id);

    let newContent = req.body.content;
    post.content = newContent;
    console.log(post.content);
    res.redirect("/todoapp");
  });
  app.delete("/todoapp/:id/",(req,res)=>{
    let { id } = req.params;
    arraypost = arraypost.filter((p) => id !== p.id);
    res.redirect("/todoapp");
  })
  