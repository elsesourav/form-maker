# Form Maker – Modern React Form Builder

A drag-and-drop form builder for React, with a beautiful UI and flexible schema export.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

Copyright (c) 2025 elsesourav

---

## Features

-  **Drag & Drop**: Add, arrange, and resize fields visually.
-  **Field Types**: Text, Number, Date, Select, Multiple Choice, Title, Spacer, Textarea.
-  **Grid Layout**: Place up to 4 fields per row (25%, 50%, 75%, 100% widths).
-  **Live Preview**: Instantly preview your form.
-  **Schema Export**: Download your form schema as JSON.
-  **CustomForm Renderer**: Render any saved schema as a working form.

---

## How to Use

### 1. Add the Form Maker to Your App

```jsx
import { FormMaker, CustomForm } from "./components/formMaker";

function App() {
   const [showBuilder, setShowBuilder] = useState(false);
   const [formSchema, setFormSchema] = useState(null);

   return (
      <div>
         <button onClick={() => setShowBuilder(true)}>Open Form Builder</button>
         <FormMaker
            isOpen={showBuilder}
            onClose={() => setShowBuilder(false)}
            onSaveSchema={setFormSchema}
         />
         {formSchema && (
            <CustomForm
               schema={formSchema}
               onSubmit={(data) => console.log(data)}
            />
         )}
      </div>
   );
}
```

### 2. Building a Form

-  **Drag fields** from the left palette to the canvas.
-  **Resize** by dropping into different grid sections (25%, 50%, etc).
-  **Edit** a field by clicking the pencil icon.
-  **Delete** a field with the trash icon.
-  **Reorder** fields or rows by dragging.
-  **Preview** your form with the "Preview" button.
-  **Export** the schema as JSON or view the schema in the "Schema" tab.

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

### 4. Schema Example

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

## Rendering a Saved Form

Use the `CustomForm` component:

```jsx
import { CustomForm } from "./components/formMaker";

<CustomForm
   schema={savedSchema}
   onSubmit={(formData) => {
      // handle form submission
   }}
/>;
```

---

## Advanced

-  **Edit field options** (for select/multiple) in the field editor.
-  **Drag to reorder** fields within a row or move entire rows.
-  **Grid overlay** shows possible drop zones and widths.
-  **SchemaPreview** and **FormPreview** for instant feedback.

---

## Example Workflow

1. Click "Open Form Builder".
2. Drag a "Text" field, set label to "Name".
3. Drag a "Number" field, set label to "Age", min/max as needed.
4. Add a "Select" field, add options like "Male", "Female", "Other".
5. Click "Preview" to see the form.
6. Click "Schema" to view/export the JSON.
7. Click "Save" to use the schema in your app.

---

## Customization

-  **Styling**: Uses Tailwind CSS for easy theming.
-  **Extend Field Types**: Add new field types in `utils/formMaker.js` and update the palette.
-  **Validation**: Add more validation logic in the input components.

---

## File Structure

-  `FormMaker.jsx` – Main builder modal
-  `FieldPalette.jsx` – Draggable field types
-  `FormCanvas.jsx` – Drag-and-drop grid canvas
-  `FieldEditor.jsx` – Field property editor modal
-  `CanvasField.jsx` – Individual field in canvas
-  `FormPreview.jsx` – Live form preview
-  `SchemaPreview.jsx` – JSON schema viewer
-  `CustomForm.jsx` – Render a form from schema

---

## Credits

-  Built with React, Tailwind CSS, and react-icons.
-  Drag-and-drop logic is custom, no external DnD library.

---

Let us know if you want a quickstart, troubleshooting, or more advanced customization tips!
