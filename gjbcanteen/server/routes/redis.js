// const express = require('express');
// const router = express.Router();
// const redisClient = require('../redisClient');
// const { promisify } = require('util');

// const redisKeysAsync = promisify(redisClient.keys).bind(redisClient);
// const redisGetAsync = promisify(redisClient.get).bind(redisClient);

// router.get('/redisData', async (req, res) => {
//     try {
//         console.log("here");
//         const keys = await redisKeysAsync('*');
//         console.log(keys);

//         // Fetch data for each key
//         const redisData = await Promise.all(keys.map(async (key) => {
//             const value = await redisGetAsync(key);
//             console.log(value);
//             return JSON.parse(value);
//         }));

//         res.json(redisData);
//     } catch (error) {
//         console.error('Error fetching Redis data', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// module.exports = router;
