var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect, useCallback } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { exportToCsv, exportToExcel, exportToPdf } from '../utils/exportData';
import './../styles/exportDataComponant.css';
export var ExportDataComponent = function (_a) {
    var filteredData = _a.filteredData, columnsManaged = _a.columnsManaged, headerProperty = _a.headerProperty, csvExport = _a.csvExport, excelExport = _a.excelExport, pdfExport = _a.pdfExport;
    var _b = useState(false), isDropDownOpen = _b[0], setIsDropDownOpen = _b[1];
    var exportDataRef = useRef(null);
    var toggleDropDown = function () {
        setIsDropDownOpen(!isDropDownOpen);
    };
    var handleClickOutside = function (event) {
        if (exportDataRef.current &&
            !exportDataRef.current.contains(event.target)) {
            setIsDropDownOpen(false);
        }
    };
    var handleKeyDown = useCallback(function (event) {
        var _a;
        if (event.key === 'Tab' && isDropDownOpen) {
            var lastMenuItem = (_a = exportDataRef.current) === null || _a === void 0 ? void 0 : _a.querySelector('li:last-child button');
            if (event.target === lastMenuItem && !event.shiftKey) {
                setIsDropDownOpen(false);
            }
        }
    }, [isDropDownOpen]);
    useEffect(function () {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
    var numberOfExportOptions = [csvExport, excelExport, pdfExport].filter(Boolean).length;
    var handleExportCsv = function () {
        exportToCsv(filteredData, columnsManaged, headerProperty, 'export.csv');
    };
    var handleExportExcel = function () {
        exportToExcel(filteredData, columnsManaged, headerProperty, 'export.xlsx');
    };
    var handleExportPdf = function () {
        exportToPdf(filteredData, columnsManaged, headerProperty, 'export.pdf');
    };
    return (_jsxs("div", __assign({ className: "box-ExportData ".concat(isDropDownOpen ? 'box-ExportDataOpen' : ''), role: "menu", ref: exportDataRef }, { children: [numberOfExportOptions === 1 && (_jsxs("div", __assign({ className: "toggle-btnExportData btnExportOne" }, { children: [csvExport && (_jsx("button", __assign({ onClick: function () { return handleExportCsv(); }, className: "ExportDataLi_btn" }, { children: _jsx("span", { children: "Export to CSV" }) }))), excelExport && (_jsx("button", __assign({ onClick: function () { return handleExportExcel(); }, className: "ExportDataLi_btn" }, { children: _jsx("span", { children: "Export to Excel" }) }))), pdfExport && (_jsx("button", __assign({ onClick: function () { return handleExportPdf(); }, className: "ExportDataLi_btn" }, { children: _jsx("span", { children: "Export to PDF" }) })))] }))), numberOfExportOptions > 1 && (_jsxs(_Fragment, { children: [_jsxs("button", __assign({ className: "toggle-btnExportData ".concat(isDropDownOpen ? 'btnOpenExportData' : ''), onClick: toggleDropDown, "aria-label": "export data", "aria-haspopup": "true", "aria-expanded": isDropDownOpen }, { children: [_jsx("span", __assign({ className: isDropDownOpen ? 'btnExportDataOpen' : '' }, { children: "Export" })), !isDropDownOpen ? _jsx(FiChevronDown, {}) : _jsx(FiChevronUp, {})] })), isDropDownOpen && (_jsx("div", __assign({ className: "ExportData-dropdown" }, { children: _jsxs("ul", { children: [csvExport && (_jsx("li", __assign({ className: "dropdownOptionExportData" }, { children: _jsx("button", __assign({ onClick: function () { return handleExportCsv(); }, className: "ExportDataLi_btn" }, { children: "Export to CSV" })) }))), excelExport && (_jsx("li", { children: _jsx("button", __assign({ onClick: function () { return handleExportExcel(); }, className: "ExportDataLi_btn" }, { children: "Export to Excel" })) })), pdfExport && (_jsx("li", { children: _jsx("button", __assign({ onClick: function () { return handleExportPdf(); }, className: "ExportDataLi_btn" }, { children: "Export to PDF" })) }))] }) })))] }))] })));
};
