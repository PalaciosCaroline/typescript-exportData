import React from 'react';
import {ExportDataComponent} from './lib/components/ExportDataComponent';
import { datasExample, columnsExample } from './dataForExample';

function App() {
  document.title = 'ExportDataComponent';
  
  return (
    <div className="App">
       <button style={{margin:'20px'}}>avant</button>
      <ExportDataComponent 
        filteredData={datasExample} 
        columnsManaged={columnsExample} 
        headerProperty='label'
        csvExport={true}
        excelExport={true}
        pdfExport={true}
        />
        <button style={{margin:'20px'}}>Après</button>
    </div>
  );
}

export default App;
