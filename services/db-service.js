import db from "../config/db.js";
const dbType = process.env.DB_TYPE;
export async function executeQuery(query, params = []) {
    if (dbType === 'postgres') {
        const result = await db.query(query, params);
        return result.rows;
    } else if (dbType === 'mysql') {
        const [rows] = await db.execute(query, params);
        return rows;
    } else {
        throw new Error('Unsupported DB_TYPE');
    }
}
