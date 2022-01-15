let express             = require("express"),
    app                 = express(),
    port                = process.env.PORT || 3000,
    bodyParser          = require("body-parser"),
    methodOverWrite     = require('method-override');


// ====================================== config =================================
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverWrite("_method"));
app.use(express.json())

const res = require("express/lib/response");
// ===================================== mongo DB config ==========================
let mongoose           = require("mongoose");
mongoose.connect("mongodb://localhost/task");

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let crudSchema  = new Schema({
    name: String,
    price: Number,
    quantity: Number
});

let Crud = mongoose.model('Crud', crudSchema)



app.get("/products", async (req, res) => {
    const q = req.query
    console.log(q)
    const p = {
        price: 25,
        quantity: {
            $lt: 50
        }
    }
    try{
        const getAllProducts = await Crud.find(p)
        res.status(201).json({
            message: 'Success',
            resultSize: getAllProducts.length,
            products: getAllProducts
        })
    } catch(error){
        console.log(error)
    }
});

// adding a new products
app.get('/new', (req, res) => {
    res.render('new')
})

//create a new products
app.post("/products", async (req, res) => {
    // retrive data from the form
    let newName = req.body.name;
    let newPrice = req.body.price;
    let newQuantity = req.body.quantity;
    console.log(req)
    let newInfo = {
        name: newName,
        price: newPrice,
        quantity: newQuantity
    };
    try{
        const newProduct = await Crud.create(newInfo)
        res.status(201).json({
            message: 'success',
            product: newProduct
        })
    } catch(e){
        console.log(e)
    }
    // create new data & save into the database
    // Crud.create(newInfo, (err, newlyCreated) => {
    //     if(err){
    //         console.log(err);
    //     } else{
    //         // redirect to home page
    //         //res.redirect("/");
    //     }
    // });
});

let mySort = {quantity: 1}

app.get('/sort', (req, res) => {
    Crud.find({}).sort(mySort).toArray((error, result) => {
        if(error){
            console.log(error)
        } else{
            res.render('sort', {info: result})
        }
    })
})

app.listen(port, () => {
    console.log('server is starting')
})