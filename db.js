const mongoose = require('mongoose');
const mongoUri = process.env.DATABASE;
mongoose.set('strictQuery', false);
const dbconnection = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log("connection Sucessfull...")

        const data = await mongoose.connection.db.collection("food_items");
        data.find({}).toArray(async function (err, data) {
            const categroy_data = await mongoose.connection.db.collection("food_category");
            categroy_data.find({}).toArray(function (err, categroy_data) {
                if (err)
                    console.log(err);
                else {
                    global.food_items = data;
                    global.food_category = categroy_data;
                    // console.log(global.food_items);
                }
            })

        })

    }
    catch (err) {
        console.log(err);
    }
}


module.exports = dbconnection;

