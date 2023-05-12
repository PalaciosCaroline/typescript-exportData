var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
var formatDataForExport = function (data, columns) {
    var anyVisible = columns.some(function (column) { return column.isVisible; });
    // if any column has isVisible , return every data
    if (!anyVisible) {
        return data.map(function (row) {
            return columns.map(function (column) { return row[column.property]; });
        });
    }
    return data.map(function (row) {
        return columns
            .filter(function (column) { return column.isVisible; })
            .map(function (column) { return row[column.property]; });
    });
};
var formatHeadersForExport = function (columns, headerProperty) {
    var anyVisible = columns.some(function (column) { return column.isVisible; });
    var anyHeaderProperty = headerProperty
        ? columns.some(function (column) { return column[headerProperty]; })
        : false;
    // if any column has true , return every columns
    if (!anyVisible) {
        if (anyHeaderProperty) {
            return columns.map(function (column) { return column[headerProperty || 'property']; });
        }
        else {
            return columns.map(function (column) { return column['property']; });
        }
    }
    if (anyHeaderProperty) {
        return columns
            .filter(function (column) { return column.isVisible; })
            .map(function (column) { return column[headerProperty || 'property']; });
    }
    else {
        return columns
            .filter(function (column) { return column.isVisible; })
            .map(function (column) { return column['property']; });
    }
};
// export format CSV
export var exportToCsv = function (data, columns, headerProperty, filename) {
    var formattedData = formatDataForExport(data, columns);
    var headers = formatHeadersForExport(columns, headerProperty);
    var csvContent = headers.join(',') +
        '\n' +
        formattedData.map(function (row) { return row.join(','); }).join('\n');
    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
};
// expoort format Excel
export var exportToExcel = function (data, columns, headerProperty, filename) {
    var formattedData = formatDataForExport(data, columns);
    var headers = formatHeadersForExport(columns, headerProperty);
    var worksheet = XLSX.utils.aoa_to_sheet(__spreadArray([headers], formattedData, true));
    var workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, filename);
};
// export format PDF
export var exportToPdf = function (data, columns, headerProperty, filename) {
    var formattedData = formatDataForExport(data, columns);
    var headers = formatHeadersForExport(columns, headerProperty);
    var doc = new jsPDF();
    doc.autoTable({
        head: [headers],
        body: formattedData,
        theme: 'grid',
    });
    doc.save(filename);
};
