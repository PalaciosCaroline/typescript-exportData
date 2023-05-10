// import { saveAs } from 'file-saver';
// import * as XLSX from 'xlsx';
// import 'jspdf-autotable';
// import { jsPDF } from "jspdf";
// import { autoTable } from "./../../types/jspdf-autotable/index";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// interface Column {
//   label: string;
//   property: string;
//   isVisible: boolean;
// }
// const formatDataForExport = (data: any[], columns: Column[]): any[][] => {
//   return data.map((row) => {
//     return columns
//       .filter((column) => column.isVisible)
//       .map((column) => row[column.property]);
//   });
// };
// const formatHeadersForExport = (columns: Column[]): string[] => {
//   return columns
//     .filter((column) => column.isVisible)
//     .map((column) => column.label);
// };
// // Fonction pour exporter les données en CSV
// export const exportToCsv = (
//   data: any[],
//   columns: Column[],
//   filename: string
// ): void => {
//   const formattedData = formatDataForExport(data, columns);
//   const headers = formatHeadersForExport(columns);
//   const csvContent =
//     headers.join(',') +
//     '\n' +
//     formattedData.map((row) => row.join(',')).join('\n');
//   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//   saveAs(blob, filename);
// };
// // Fonction pour exporter les données en Excel
// export const exportToExcel = (
//   data: any[],
//   columns: Column[],
//   filename: string
// ): void => {
//   const formattedData = formatDataForExport(data, columns);
//   const headers = formatHeadersForExport(columns);
//   const worksheet = XLSX.utils.aoa_to_sheet([headers, ...formattedData]);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
//   XLSX.writeFile(workbook, filename);
// };
// // Fonction pour exporter les données en PDF
// export const exportToPdf = (
//   data: any[],
//   columns: Column[],
//   filename: string
// ): void => {
//   const formattedData = formatDataForExport(data, columns);
//   const headers = formatHeadersForExport(columns);
//   const doc = new jsPDF();
//   doc.autoTable({
//     head: [headers],
//     body: formattedData,
//     theme: 'grid',
//   });
//   doc.save(filename);
// };
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { jsPDF } from "jspdf";
var formatDataForExport = function (data, columns) {
    return data.map(function (row) {
        return columns
            .filter(function (column) { return column.isVisible; })
            .map(function (column) { return row[column.property]; });
    });
};
var formatHeadersForExport = function (columns) {
    return columns
        .filter(function (column) { return column.isVisible; })
        .map(function (column) { return column.label; });
};
// Fonction pour exporter les données en CSV
export var exportToCsv = function (data, columns, filename) {
    var formattedData = formatDataForExport(data, columns);
    var headers = formatHeadersForExport(columns);
    var csvContent = headers.join(',') +
        '\n' +
        formattedData.map(function (row) { return row.join(','); }).join('\n');
    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
};
// Fonction pour exporter les données en Excel
export var exportToExcel = function (data, columns, filename) {
    var formattedData = formatDataForExport(data, columns);
    var headers = formatHeadersForExport(columns);
    var worksheet = XLSX.utils.aoa_to_sheet(__spreadArray([headers], formattedData, true));
    var workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, filename);
};
// Fonction pour exporter les données en PDF
export var exportToPdf = function (data, columns, filename) {
    var formattedData = formatDataForExport(data, columns);
    var headers = formatHeadersForExport(columns);
    var doc = new jsPDF();
    doc.autoTable({
        head: [headers],
        body: formattedData,
        theme: 'grid',
    });
    doc.save(filename);
};
