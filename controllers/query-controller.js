import { convertToSQL } from '../services/openai-service.js';
import sqlValidator from '../services/sqlValidator.js';
import { executeQuery } from '../services/db-service.js'
import { promptForNL2SqlQuery } from '../utils/prompt-builder.js';
import { getDatabaseSchema } from '../utils/extractSchema.js';

export default async function handleQuery(req, res) {
    try {
        const { question } = req.body;
        const schema = await getDatabaseSchema();
        const prompt = promptForNL2SqlQuery(schema, question);

        const sqlQuery = await convertToSQL(prompt);
        console.log("Sql Query", sqlQuery)

        const isValid = sqlValidator(sqlQuery);
        if (!isValid) return res.status(400).json({ error: 'Invalid or unsafe SQL query.' });

        const result = await executeQuery(sqlQuery);
        res.json({ sql: sqlQuery, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
