export function promptForNL2SqlQuery(question, schema) {
    return `Convert the following natural language question to an SQL query using the given schema.
     - In the SELECT clause, include all relevant fields from each table.
- For every selected column, format the alias as: tableName_columnName (e.g., employee_name, department_name, project_title).
- Do not use SELECT *.
- Use clear and consistent table aliases.
- Return only the SQL query with no explanation, no formatting, and no extra text.
Schema:
${schema}

Question: "${question}"`;
}
