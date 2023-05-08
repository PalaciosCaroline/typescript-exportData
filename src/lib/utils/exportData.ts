import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { jsPDF } from "jspdf";
import { autoTable } from "./../../types/jspdf-autotable/index";

interface Column {
  isVisible: boolean;
  property: string;
  label: string;
}

const formatDataForExport = (data: any[], columns: Column[]): any[][] => {
  return data.map((row) => {
    return columns
      .filter((column) => column.isVisible)
      .map((column) => row[column.property]);
  });
};

const formatHeadersForExport = (columns: Column[]): string[] => {
  return columns
    .filter((column) => column.isVisible)
    .map((column) => column.label);
};

// Fonction pour exporter les données en CSV
export const exportToCsv = (
  data: any[],
  columns: Column[],
  filename: string
): void => {
  const formattedData = formatDataForExport(data, columns);
  const headers = formatHeadersForExport(columns);
  const csvContent =
    headers.join(',') +
    '\n' +
    formattedData.map((row) => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
};

// Fonction pour exporter les données en Excel
export const exportToExcel = (
  data: any[],
  columns: Column[],
  filename: string
): void => {
  const formattedData = formatDataForExport(data, columns);
  const headers = formatHeadersForExport(columns);
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...formattedData]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, filename);
};

// Fonction pour exporter les données en PDF
export const exportToPdf = (
  data: any[],
  columns: Column[],
  filename: string
): void => {
  const formattedData = formatDataForExport(data, columns);
  const headers = formatHeadersForExport(columns);

  const doc = new jsPDF();
  doc.autoTable({
    head: [headers],
    body: formattedData,
    theme: 'grid',
  });
  doc.save(filename);
};