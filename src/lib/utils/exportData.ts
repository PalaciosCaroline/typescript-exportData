import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { autoTable } from './../../types/jspdf-autotable/index';

interface ColumnBase {
  isVisible?: boolean;
  property: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ColumnManaged<T = any> = ColumnBase & {
  [otherProp: string]: T | undefined;
};

export interface DataItem<T> {
  [key: string]: T | undefined;
}

const formatDataForExport = <T>(
  data: DataItem<T>[],
  columns: ColumnManaged[],
): (T | undefined)[][] => {
  const anyVisible = columns.some((column) => column.isVisible);
  // if any column has isVisible , return every data
  if (!anyVisible) {
    return data.map((row) => {
      return columns.map((column) => row[column.property]);
    });
  }
  return data.map((row) => {
    return columns
      .filter((column) => column.isVisible)
      .map((column) => row[column.property]);
  });
};

const formatHeadersForExport = (
  columns: ColumnManaged[],
  headerProperty: string | undefined,
): string[] => {
  const anyVisible = columns.some((column) => column.isVisible);
  const anyHeaderProperty = headerProperty 
    ? columns.some((column) => column[headerProperty])
    : false;
  // if any column has true , return every columns
  if (!anyVisible) {
    if(anyHeaderProperty) {
      return columns.map((column) => column[headerProperty || 'property']);
    } else {
    return columns.map((column) => column['property']);}
  } if(anyHeaderProperty) {
    return columns
    .filter((column) => column.isVisible)
    .map((column) => column[headerProperty || 'property']);
  }else {
    return columns
    .filter((column) => column.isVisible)
    .map((column) => column['property']);
  }
};

// export format CSV
export const exportToCsv = <T>(
  data: DataItem<T>[],
  columns: ColumnManaged[],
  headerProperty: string | undefined,
  filename: string,
): void => {
  const formattedData = formatDataForExport(data, columns);
  const headers = formatHeadersForExport(columns, headerProperty);
  const csvContent =
    headers.join(',') +
    '\n' +
    formattedData.map((row) => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
};

// expoort format Excel
export const exportToExcel = <T>(
  data: DataItem<T>[],
  columns: ColumnManaged[],
  headerProperty: string | undefined,
  filename: string,
): void => {
  const formattedData = formatDataForExport(data, columns);
  const headers = formatHeadersForExport(columns, headerProperty);
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...formattedData]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, filename);
};

// export format PDF
export const exportToPdf = <T>(
  data: DataItem<T>[],
  columns: ColumnManaged[],
  headerProperty: string | undefined,
  filename: string,
): void => {
  const formattedData = formatDataForExport(data, columns);
  const headers = formatHeadersForExport(columns, headerProperty);

  const doc = new jsPDF();
  doc.autoTable({
    head: [headers],
    body: formattedData,
    theme: 'grid',
  });
  doc.save(filename);
};
