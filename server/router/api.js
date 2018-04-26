import express from 'express';
import rp from 'request-promise';
const router = express.Router();


let options = {
    uri: 'http://service.picasso.adesk.com/v1/vertical/vertical',
    qs: {
        limit:20,
        skip:0,
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', async (req, res)=>{
    options.qs.skip = req.query.skip*1;
        res.json( await rp(options).catch(function (err) {
            // Crawling failed...
        }))
})
export default router;