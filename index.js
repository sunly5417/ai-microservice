const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('AI Microservice running — performance analysis enabled.');
});

app.post('/analyze', (req, res) => {
  const { scores, maxScore } = req.body;

  // Validate input
  if (!Array.isArray(scores)) {
    return res.status(400).json({
      error: "Scores must be an array of numbers"
    });
  }

  if (!maxScore || maxScore <= 0) {
    return res.json({
      average: 0,
      summary: "Invalid maximum score. Unable to analyze performance."
    });
  }

  if (scores.length === 0) {
    return res.json({
      average: 0,
      summary: "No submissions were found, so performance cannot be analyzed yet."
    });
  }

  // Basic statistics
  const total = scores.reduce((a, b) => a + b, 0);
  const average = total / scores.length;
  const percentage = (average / maxScore) * 100;

  const highest = Math.max(...scores);
  const lowest = Math.min(...scores);

  // Consistency estimation
  const variance =
    scores.reduce((sum, s) => sum + Math.pow(s - average, 2), 0) / scores.length;

  const consistency =
    variance < 20
      ? "very consistent"
      : variance < 60
      ? "moderately consistent"
      : "inconsistent";

  // Interpretation logic
  let interpretation = "";
  let recommendation = "";

  if (percentage < 50) {
    interpretation = "Most students are struggling with the material.";
    recommendation =
      "It may be helpful to revisit foundational concepts and provide more guided explanations or practice activities.";
  } else if (percentage < 70) {
    interpretation = "Students demonstrate partial understanding of the topic.";
    recommendation =
      "Providing additional examples, clarification sessions, or revision exercises may improve performance.";
  } else if (percentage < 85) {
    interpretation = "Students generally understand the material well.";
    recommendation =
      "Encouraging accuracy and reinforcing key concepts could further improve results.";
  } else {
    interpretation = "Students show strong mastery of the topic.";
    recommendation =
      "Consider introducing more advanced or challenging material to deepen understanding.";
  }

  const summary = `
Overall performance analysis:

${interpretation}

Average score: ${average.toFixed(1)} out of ${maxScore}
Highest score: ${highest}
Lowest score: ${lowest}

Consistency level: ${consistency}

Recommendation:
${recommendation}
`.trim();

  res.json({
    average: Number(average.toFixed(2)),
    summary
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`AI Service running on port ${PORT}`);
});
