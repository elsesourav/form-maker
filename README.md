# Form Maker – Modern React Form Builder

A beautiful, drag-and-drop form builder for React. Build forms visually, arrange fields in a responsive grid, preview instantly, and export your schema as JSON.

---

## Features

-  **Drag & Drop**: Add, arrange, and resize fields visually on a grid.
-  **Field Types**: Text, Number, Date, Select, Multiple Choice, Title, Spacer, Textarea.
-  **Grid Layout**: Place up to 4 fields per row (25%, 50%, 75%, 100% widths).
-  **Live Preview**: Instantly preview your form as you build.
-  **Schema Export**: Download your form schema as JSON or view it in-app.
-  **CustomForm Renderer**: Render any saved schema as a working form.
-  **Row & Field Reordering**: Drag to reorder fields within a row or move entire rows.
-  **Field Editor**: Edit all field properties in a modal, including options for select/multiple fields.
-  **Auto-scroll**: Canvas auto-scrolls when dragging near the top or bottom.
-  **No External DnD Library**: All drag-and-drop logic is custom and lightweight.
-  **Tailwind CSS**: Clean, modern UI with easy theming.

---

## Getting Started

### 1. Add Form Maker to Your App

```jsx
import { useState } from "react";
import FormBuilder from "./components/formMaker/FormBuilder";
import CustomForm from "./components/formMaker/CustomForm";

function App() {
   const [showBuilder, setShowBuilder] = useState(false);
   const [formSchema, setFormSchema] = useState(null);

   return (
      <div>
         <button onClick={() => setShowBuilder(true)}>Open Form Builder</button>
         <FormBuilder
            isOpen={showBuilder}
            onClose={() => setShowBuilder(false)}
            onSaveSchema={setFormSchema}
         />
         {formSchema && (
            <div className="my-8">
               <h2>Rendered Form:</h2>
               <CustomForm
                  schema={formSchema.schema}
                  onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
               />
            </div>
         )}
      </div>
   );
}
```

---

### 2. Building a Form

-  **Drag fields** from the left palette to the canvas.
-  **Resize** by dropping into different grid sections (25%, 50%, etc).
-  **Edit** a field by clicking the pencil icon.
-  **Delete** a field with the trash icon.
-  **Reorder** fields within a row, or drag the row handle to reorder rows.
-  **Preview** your form with the "Preview" button.
-  **Export** the schema as JSON or view the schema in the "Schema" tab.

---

### 3. Field Types

| Type     | Description               | Options/Settings             |
| -------- | ------------------------- | ---------------------------- |
| Text     | Single line input         | Label, Placeholder, Required |
| Number   | Numeric input             | Min, Max, Step, Required     |
| Date     | Date picker               | Required                     |
| Select   | Dropdown                  | Options, Required            |
| Multiple | Multi-select (checkboxes) | Options, Required            |
| Title    | Section header            | Title text                   |
| Spacer   | Empty space               | Width only                   |
| Textarea | Multi-line input          | Rows, Required               |

---

### 4. Example Schema

A saved schema looks like:

```json
{
   "schema": [
      {
         "id": "field_0",
         "type": "text",
         "name": "firstName",
         "label": "First Name",
         "placeholder": "Enter your first name",
         "required": true,
         "width": "half"
      },
      {
         "id": "field_1",
         "type": "number",
         "name": "age",
         "label": "Age",
         "min": 0,
         "max": 120,
         "width": "fourth"
      }
      // ...more fields
   ],
   "widths": [
      ["half", "fourth", "fourth"], // Row 1: 50%, 25%, 25%
      ["full"] // Row 2: 100%
   ]
}
```

---

### 5. Rendering a Saved Form

Use the `CustomForm` component:

```jsx
import CustomForm from "./components/formMaker/CustomForm";

<CustomForm
   schema={savedSchema.schema}
   onSubmit={(formData) => {
      // handle form submission
      console.log(formData);
   }}
/>;
```

---

## Advanced Usage

-  **Edit field options** (for select/multiple) in the field editor modal.
-  **Drag to reorder** fields within a row, or move entire rows.
-  **Grid overlay** shows possible drop zones and widths.
-  **SchemaPreview** and **FormPreview** for instant feedback.
-  **Auto-scroll**: When dragging a field near the top or bottom of the canvas, the canvas will scroll automatically.

---

## File Structure

All logic is in a single file for easy integration:

-  `FormBuilder.jsx` – Main builder modal, field palette, canvas, field editor, preview, and schema export.
-  `CustomForm.jsx` – Render a form from a saved schema.

---

## Customization

-  **Styling**: Uses Tailwind CSS for easy theming.
-  **Extend Field Types**: Add new field types in `formUtils.js` and update the palette.
-  **Validation**: Add more validation logic in the input components.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

Copyright (c) 2025 elsesourav

---

## Credits

-  Built with React, Tailwind CSS, and react-icons.
-  Drag-and-drop logic is custom, no external DnD library.

---

Let us know if you want a quickstart, troubleshooting, or more
