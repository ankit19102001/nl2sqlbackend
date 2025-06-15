import OpenAI from 'openai';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});
export async function convertToSQL(prompt) {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0,
    });

    const sql = response.choices[0].message.content.trim();
    return sql;
}