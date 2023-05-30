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
    var filteredData = _a.filteredData, columnsManaged = _a.columnsManaged, headerProperty = _a.headerProperty, csvExport = _a.csvExport, excelExport = _a.excelExport, pdfExport = _a.pdfExport, _b = _a.background, background = _b === void 0 ? '#677e11' : _b, _c = _a.color, color = _c === void 0 ? 'white' : _c, _d = _a.hoverBackground, hoverBackground = _d === void 0 ? '#7e9b16' : _d;
    var _e = useState(false), isDropDownOpen = _e[0], setIsDropDownOpen = _e[1];
    var exportDataRef = useRef(null);
    var _f = useState(-1), focusedButtonIndex = _f[0], setFocusedButtonIndex = _f[1];
    var toggleButtonRef = useRef(null);
    var singleButtonRef = useRef(null);
    var style = {
        '--background-color': background,
        '--color': color,
        '--hover-background-color': hoverBackground,
    };
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
    var exportTypes = [
        { enabled: csvExport, handler: handleExportCsv, text: 'Export to CSV' },
        {
            enabled: excelExport,
            handler: handleExportExcel,
            text: 'Export to Excel',
        },
        { enabled: pdfExport, handler: handleExportPdf, text: 'Export to PDF' },
    ];
    var handleClickOutside = function (event) {
        if (exportDataRef.current &&
            !exportDataRef.current.contains(event.target)) {
            setIsDropDownOpen(false);
        }
    };
    var toggleDropDown = function () {
        setIsDropDownOpen(!isDropDownOpen);
    };
    var handleKeyDown = useCallback(function (event) {
        switch (event.key) {
            case 'Tab':
                // Close dropdown on tab
                if (isDropDownOpen) {
                    setIsDropDownOpen(false);
                }
                // Let the event propagate to preserve default tab behavior
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (isDropDownOpen) {
                    setFocusedButtonIndex(function (prevIndex) {
                        return prevIndex > 0 ? prevIndex - 1 : prevIndex;
                    });
                }
                break;
            case 'ArrowDown':
                event.preventDefault();
                if (isDropDownOpen) {
                    setFocusedButtonIndex(function (prevIndex) {
                        return prevIndex < exportTypes.length - 1 ? prevIndex + 1 : prevIndex;
                    });
                }
                break;
            case 'Enter':
            case ' ':
                event.preventDefault();
                if (numberOfExportOptions === 1) {
                    // If there is only one export option, check if the single export button is currently focused
                    if (document.activeElement === singleButtonRef.current) {
                        var singleExportType = exportTypes.find(function (exportType) { return exportType.enabled; });
                        if (singleExportType) {
                            singleExportType.handler();
                        }
                    }
                }
                else {
                    // Check if the dropdown toggle button is currently focused
                    if (document.activeElement === toggleButtonRef.current) {
                        if (isDropDownOpen && focusedButtonIndex >= 0) {
                            var focusedButton = exportTypes[focusedButtonIndex];
                            if (focusedButton && focusedButton.enabled) {
                                focusedButton.handler();
                            }
                        }
                        else if (!isDropDownOpen) {
                            toggleDropDown();
                        }
                    }
                }
                break;
            default:
                break;
        }
    }, [
        isDropDownOpen,
        exportTypes,
        focusedButtonIndex,
        numberOfExportOptions,
        toggleButtonRef,
        singleButtonRef,
    ]);
    useEffect(function () {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
    useEffect(function () {
        if (isDropDownOpen &&
            focusedButtonIndex >= 0 &&
            focusedButtonIndex < exportTypes.length &&
            exportDataRef.current // Check if exportDataRef.current is not null
        ) {
            var buttonElement = exportDataRef.current.querySelector("button:nth-child(".concat(focusedButtonIndex + 1, ")"));
            // Convert the element into HTMLElement before calling the focus method
            var htmlElement = buttonElement;
            // Check to ensure the element exists
            if (htmlElement) {
                htmlElement.focus();
            }
        }
    }, [focusedButtonIndex, isDropDownOpen, exportTypes.length]);
    var ExportButton = function (_a) {
        var exportHandler = _a.exportHandler, label = _a.label, isFocused = _a.isFocused, index = _a.index;
        return (_jsx("button", __assign({ ref: index === 0 ? singleButtonRef : null, onClick: exportHandler, onFocus: function () {
                setFocusedButtonIndex(index);
            }, className: "ExportDataLi_btn ".concat(isFocused ? 'focused' : '', " customComponent"), tabIndex: 0, style: style }, { children: _jsx("span", { children: label }) })));
    };
    return (_jsxs("div", __assign({ className: "box-ExportData ".concat(isDropDownOpen ? 'box-ExportDataOpen' : ''), role: "menu", ref: exportDataRef }, { children: [numberOfExportOptions === 1 && (_jsx("div", __assign({ className: "toggle-btnExportData btnExportOne" }, { children: exportTypes.map(function (exportType, index) {
                    return exportType.enabled && (_jsx(ExportButton, { isFocused: index === focusedButtonIndex, index: index, exportHandler: exportType.handler, label: exportType.text }, exportType.text));
                }) }))), numberOfExportOptions > 1 && (_jsxs(_Fragment, { children: [_jsxs("button", __assign({ ref: toggleButtonRef, className: "toggle-btnExportData toggle-btnsExport ".concat(isDropDownOpen ? 'btnOpenExportData' : '', " customComponent"), onClick: toggleDropDown, "aria-label": "export data", "aria-haspopup": "true", "aria-expanded": isDropDownOpen, style: style }, { children: [_jsx("span", __assign({ className: isDropDownOpen ? 'btnExportDataOpen' : '' }, { children: "Export" })), !isDropDownOpen ? _jsx(FiChevronDown, {}) : _jsx(FiChevronUp, {})] })), isDropDownOpen && (_jsx("div", __assign({ className: "ExportData-dropdown" }, { children: _jsx("ul", { children: exportTypes.map(function (exportType, index) {
                                return exportType.enabled && (_jsx("li", __assign({ className: "dropdownOptionExportData" }, { children: _jsx(ExportButton, { index: index, isFocused: index === focusedButtonIndex, exportHandler: exportType.handler, label: exportType.text }) }), "li-".concat(exportType.text)));
                            }) }) })))] }))] })));
};
