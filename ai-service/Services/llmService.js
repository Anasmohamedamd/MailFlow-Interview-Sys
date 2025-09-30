const OpenAI = require('openai');

const client = () => new OpenAI ({
    apiKey : process.env.OPENAI_API_KEY
});

async function askLLM(prompt) {
    const response = await client.chat.completions.create({
        model:'gpt-4o-mini',
        messages:[{role:'user',content:prompt}]
    })
    return response.choices[0].message.content.trim();
}
module.exports = askLLM;