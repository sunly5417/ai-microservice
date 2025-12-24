const express = require('express');
const app = express();
app.use(express.json()); // Allows the app to read JSON input


// This handles the "Home Page" of your URL
app.get('/', (req, res) => {
  res.send('AI Microservice is running! Please use POST /analyze to get results.');
});
app.post('/analyze', (req, res) => {
    const { scores, maxScore } = req.body;

    // 1. Compute Average
    const sum = scores.reduce((a, b) => a + b, 0);
    const average = sum / scores.length;

    // 2. Generate Summary based on your rules
    let status = "";
    if (average < 50) {
        status = "Poor performance";
    } else if (average <= 75) {
        status = "Average";
    } else {
        status = "Good";
    }

    // 3. Send Output JSON
    res.json({
        average: average,
        summary: `Overall performance is ${status.toLowerCase()}. More practice recommended.`
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`AI Service running on port ${PORT}`));
