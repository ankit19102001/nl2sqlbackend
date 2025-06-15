import db from '../config/db.js'; // or your actual db config file path
const dbType = 'postgres';

export async function getDatabaseSchema() {
    let query = '';
    let schema = '';
    if (dbType === 'postgres') {
        query = `
      SELECT table_name, column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position;
    `;
    } else if (dbType === 'mysql') {
        query = `
      SELECT table_name, column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = DATABASE()
      ORDER BY table_name, ordinal_position;
    `;
    } else {
        throw new Error('Unsupported DB_TYPE. Must be either "postgres" or "mysql".');
    }

    const [rows] = dbType === 'mysql' ? await db.query(query) : [await db.query(query).then(res => res.rows)];

    let currentTable = '';
    for (const row of rows) {
        if (row.table_name !== currentTable) {
            currentTable = row.table_name;
            schema += `\nTable: ${currentTable}\n`;
        }
        schema += `  ${row.column_name} (${row.data_type})\n`;
    }

    return schema.trim();
}

