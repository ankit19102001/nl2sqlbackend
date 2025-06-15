export default function validateSQL(query) {
  const safe = query.toLowerCase().startsWith('select') &&
               !query.toLowerCase().includes('drop') &&
               !query.toLowerCase().includes('delete') &&
               !query.toLowerCase().includes('insert') &&
               !query.toLowerCase().includes('update');

  return safe;
};
