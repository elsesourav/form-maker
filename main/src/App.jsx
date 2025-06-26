import { useState } from "react";
import CustomForm from "./components/formMaker/CustomForm";
import FormMaker from "./components/formMaker/FormMaker";

function App() {
   const [showBuilder, setShowBuilder] = useState(false);
   const [formSchema, setFormSchema] = useState(null);

   return (
      <div className="main">
         <button onClick={() => setShowBuilder(true)} className="btn">
            Open Form Builder
         </button>

         <FormMaker
            isOpen={showBuilder}
            onClose={() => setShowBuilder(false)}
            onSaveSchema={setFormSchema}
         />

         <div className="form">
            {formSchema && (
               <CustomForm
                  schema={formSchema}
                  onSubmit={(data) => console.log(data)}
               />
            )}
         </div>
      </div>
   );
}

export default App;
