import { useEffect, useRef, useState } from "react";
import {
   DateInput,
   MultipleInput,
   NumberInput,
   SelectInput,
   SpaceBar,
   TextArea,
   TextInput,
   TitleBar,
} from "../inputs";
import { makeSchemaWithWidths } from "./formUtils";

/**
 * CustomForm - Render a form from a schema (as generated by FormMaker)
 * Props:
 *   schema: { schema, widths } object (from FormMaker) or flat array
 *   onSubmit: function(formData) - called with form data on submit
 *   externalData: object - external form data to populate the form
 *   onExternalChange: function(fieldName, value) - called when field changes (for external state management)
 */
const CustomForm = ({
   schema: schemaProp,
   onSubmit,
   externalData = null,
   onExternalChange = null,
}) => {
   const [formData, setFormData] = useState({});
   const scrollContainerRef = useRef(null);

   // Apply custom scrollbar styles programmatically
   useEffect(() => {
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
         // Create a unique style element for this component instance
         const styleId =
            "custom-form-scrollbar-" + Math.random().toString(36).substr(2, 9);
         const existingStyle = document.getElementById(styleId);

         if (!existingStyle) {
            const style = document.createElement("style");
            style.id = styleId;
            style.textContent = `
               .${styleId}::-webkit-scrollbar {
                  width: 8px;
               }
               .${styleId}::-webkit-scrollbar-track {
                  background: #1F2937;
                  border-radius: 4px;
               }
               .${styleId}::-webkit-scrollbar-thumb {
                  background: #4B5563;
                  border-radius: 4px;
                  border: 1px solid #374151;
               }
               .${styleId}::-webkit-scrollbar-thumb:hover {
                  background: #6B7280;
               }
            `;
            document.head.appendChild(style);
            scrollContainer.classList.add(styleId);

            // Cleanup function
            return () => {
               const styleElement = document.getElementById(styleId);
               if (styleElement) {
                  document.head.removeChild(styleElement);
               }
            };
         }
      }
   }, []);

   // Accept either { schema, widths } or a flat array
   let schemaObj;
   if (Array.isArray(schemaProp)) {
      schemaObj = makeSchemaWithWidths(schemaProp);
   } else if (
      schemaProp &&
      Array.isArray(schemaProp.schema) &&
      Array.isArray(schemaProp.widths)
   ) {
      schemaObj = schemaProp;
   } else {
      schemaObj = null;
   }

   if (!schemaObj) {
      return <div className="text-gray-400">No form schema provided.</div>;
   }
   const schema = schemaObj.schema;
   const widths = schemaObj.widths;

   // Helper: get Tailwind col-span class for 4-section grid
   const getColSpan = (width) => {
      switch (width) {
         case "fourth":
            return "col-span-1";
         case "half":
            return "col-span-2";
         case "three-fourths":
            return "col-span-3";
         case "full":
         default:
            return "col-span-4";
      }
   };

   // Render a single field using the correct input component
   const renderField = (field) => {
      const commonProps = {
         label: field.label,
         value: getCurrentValue(field.name, field.type),
         onChange: (value) => handleChange(field.name, value),
         placeholder: field.placeholder,
         required: field.required,
         helperText: field.helperText,
         width: "w-full",
         options: field.options,
         min: field.min,
         max: field.max,
         step: field.step,
         disabled: field.disabled,
      };
      switch (field.type) {
         case "title":
            return <TitleBar value={field.label} width="w-full" />;
         case "text":
            return <TextInput {...commonProps} />;
         case "number":
            return <NumberInput {...commonProps} />;
         case "date":
            return <DateInput {...commonProps} />;
         case "select":
            return <SelectInput {...commonProps} />;
         case "multiple":
            return <MultipleInput {...commonProps} fieldType="select" />;
         case "spacer":
            return <SpaceBar {...commonProps} />;
         case "textarea":
            return <TextArea {...commonProps} />;
         default:
            return null;
      }
   };

   const handleChange = (name, value) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Call external change handler if provided
      if (onExternalChange) {
         onExternalChange(name, value);
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      // Use external data if provided, otherwise use internal form data
      const dataToSubmit = externalData || formData;
      if (onSubmit) onSubmit(dataToSubmit);
   };

   // Get current form values (external data takes precedence)
   const getCurrentValue = (fieldName, fieldType) => {
      if (
         externalData &&
         Object.prototype.hasOwnProperty.call(externalData, fieldName)
      ) {
         return externalData[fieldName];
      }
      return formData[fieldName] || (fieldType === "multiple" ? [] : "");
   };

   // Use widths to render rows/columns as in builder
   let rows = [];
   let fieldIdx = 0;
   rows = widths.map((rowWidths) => {
      const rowFields = rowWidths.map((width) => {
         const field = schema[fieldIdx];
         fieldIdx++;
         return { ...field, width };
      });
      return rowFields;
   });

   return (
      <div className="flex flex-col h-full max-h-screen">
         <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div
               ref={scrollContainerRef}
               className="flex-1 overflow-y-auto p-4"
               style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#4B5563 #1F2937",
               }}
            >
               <div className="relative w-full h-auto flex flex-col gap-3">
                  {rows.map((row, rowIdx) => (
                     <div key={rowIdx} className="grid grid-cols-4 gap-4 h-22">
                        {row.map((field, colIdx) => (
                           <div
                              key={
                                 field.id || field.name || `${rowIdx}-${colIdx}`
                              }
                              className={getColSpan(field.width)}
                           >
                              {renderField(field)}
                           </div>
                        ))}
                     </div>
                  ))}
               </div>
            </div>
            {schema.length > 0 && (
               <div className="flex-shrink-0 p-4">
                  <button
                     type="submit"
                     className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all cursor-pointer"
                  >
                     Submit
                  </button>
               </div>
            )}
         </form>
      </div>
   );
};

export default CustomForm;
