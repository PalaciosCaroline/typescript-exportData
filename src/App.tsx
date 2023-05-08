import React from 'react';
import {ExportDataComponent} from './lib/components/ExportDataComponent';
import { datasExample, columnsExample } from './dataForExample';

function App() {
  document.title = 'typescript-table';
  
  return (
    <div className="App">
      <div>voilà</div>
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
