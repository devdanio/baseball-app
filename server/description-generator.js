const Anthropic = require("@anthropic-ai/sdk");
require("dotenv").config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function generateFamousPersonDescription(personName) {
  try {
    const completion = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `Please provide a short description (2-3 sentences) of the baseball player named ${personName}. Include their most notable achievements or contributions.`,
        },
      ],
    });

    return completion.content[0].text;
  } catch (error) {
    console.error("Error generating description:", error);
    return null;
  }
}

module.exports = {
  generateFamousPersonDescription,
};
