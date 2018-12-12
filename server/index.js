const express = require('express');
const path = require('path');
var mongoose = require('mongoose');
//mongoose
mongoose.connect("mongodb://localhost:27017/bookdb",{useNewUrlParser : true});

var monSchema = mongoose.Schema({
    title : String,
    image : String,
    desc  : String,
    date  : {
               type : Date,
               default : Date.now
    }
});

var Book =  mongoose.model('Book',monSchema);

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));



// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    // var list = ["item1", "item2", "item3"];
    Book.find({}, function(err, found){
        if(err) {
            console.log(err);
            // res.render('error');
        }
        else {
    res.json(found);
    // console.log(found);
}
})
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    // res.sendFile(path.join(__dirname+'/client/build/index.html'));
    res.send("Go to /api/getList");
});



const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);