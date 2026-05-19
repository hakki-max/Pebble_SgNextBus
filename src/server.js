require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/bus-arrival', async (req, res) => {
    try {
        const response = await axios.get(
            "https://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2",
            {
                params: {
                    BusStopCode: "83139",
                    ServiceNo: "14"
                },
                headers: {
                    AccountKey: process.env.LTA_API_KEY,
                    accept: "application/json"
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error fetching data");
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
