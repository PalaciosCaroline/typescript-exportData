import React from 'react';
import {ExportDataComponent} from './lib/components/ExportDataComponent';
import { datasExample, columnsExample } from './dataForExample';

function App() {
  document.title = 'ExportDataComponent';
  
  return (
    <div className="App">
      <ExportDataComponent 
        filteredData={datasExample} 
        columnsManaged={columnsExample} 
        csvExport={true}
        excelExport={true}
        pdfExport={true}
        />
    </div>
  );
}

export default App;
