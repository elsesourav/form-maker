
// Utility to generate { schema, widths } layout for FormMaker and SchemaPreview

/**
 * Given a flat array of fields, returns { schema, widths } for layout
 * - schema: the flat array of fields
 * - widths: array of arrays, each subarray is the widths for a row
 *
 * This matches the logic in SchemaPreview and FormMaker handleSave
 */
export function makeSchemaWithWidths(fields) {
   // Group fields into rows based on width (4 columns per row)
   const rows = [];
   let currentRow = [];
   let currentSpan = 0;
   const getColSpan = (width) => {
      switch (width) {
         case "fourth":
            return 1;
         case "half":
            return 2;
         case "three-fourths":
            return 3;
         case "full":
         default:
            return 4;
      }
   };
   for (const field of fields) {
      const span = getColSpan(field.width);
      if (currentSpan + span > 4) {
         rows.push(currentRow);
         currentRow = [];
         currentSpan = 0;
      }
      currentRow.push(field);
      currentSpan += span;
   }
   if (currentRow.length > 0) rows.push(currentRow);
   const widths = rows.map((row) => row.map((f) => f.width || "full"));
   return { schema: fields, widths };
}
