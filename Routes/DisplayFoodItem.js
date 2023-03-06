const express = require('express');
const router = express.Router();

router.post('/foodData', async (req, res) => {
    try {
        // console.log(global.food_category);
        res.status(200).send([global.food_items, global.food_category])
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
})

module.exports = router;
