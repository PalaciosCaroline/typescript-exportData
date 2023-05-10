import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { exportToCsv, exportToExcel, exportToPdf } from '../utils/exportData';
import './../styles/exportDataComponant.css';

interface ColumnManaged {
  isVisible?: boolean;
  property: string;
  label: string;
}

export interface DataItem<T> {
  [key: string]: T | undefined;
}

interface ExportDataComponentProps<T> {
  filteredData: DataItem<T>[];
  columnsManaged: ColumnManaged[];
  csvExport?: boolean;
  excelExport?: boolean;
  pdfExport?: boolean;
}

export const ExportDataComponent = <T,>({
  filteredData,
  columnsManaged,
  csvExport,
  excelExport,
  pdfExport,
}: ExportDataComponentProps<T>): JSX.Element => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const exportDataRef = useRef<HTMLDivElement>(null);

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      exportDataRef.current &&
      !exportDataRef.current.contains(event.target as Node)
    ) {
      setIsDropDownOpen(false);
    }
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Tab' && isDropDownOpen) {
        const lastMenuItem = exportDataRef.current?.querySelector(
          'li:last-child button',
        );
        if (event.target === lastMenuItem && !event.shiftKey) {
          setIsDropDownOpen(false);
        }
      }
    },
    [isDropDownOpen],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const numberOfExportOptions = [csvExport, excelExport, pdfExport].filter(
    Boolean,
  ).length;

  const handleExportCsv = () => {
    exportToCsv(filteredData, columnsManaged, 'export.csv');
  };

  const handleExportExcel = () => {
    exportToExcel(filteredData, columnsManaged, 'export.xlsx');
  };

  const handleExportPdf = () => {
    exportToPdf(filteredData, columnsManaged, 'export.pdf');
  };

  return (
    <div
      className={`box-ExportData ${isDropDownOpen ? 'box-ExportDataOpen' : ''}`}
      role="menu"
      ref={exportDataRef}
    >
      {numberOfExportOptions === 1 && (
        <div className="toggle-btnExportData btnExportOne">
          {csvExport && (
            <button
              onClick={() => handleExportCsv()}
              className="ExportDataLi_btn"
            >
              <span>Export to CSV</span>
            </button>
          )}
          {excelExport && (
            <button
              onClick={() => handleExportExcel()}
              className="ExportDataLi_btn"
            >
              <span>Export to Excel</span>
            </button>
          )}
          {pdfExport && (
            <button
              onClick={() => handleExportPdf()}
              className="ExportDataLi_btn"
            >
              <span>Export to PDF</span>
            </button>
          )}
        </div>
      )}
      {numberOfExportOptions > 1 && (
        <>
          <button
            className={`toggle-btnExportData ${
              isDropDownOpen ? 'btnOpenExportData' : ''
            }`}
            onClick={toggleDropDown}
            aria-label="export data"
            aria-haspopup="true"
            aria-expanded={isDropDownOpen}
          >
            <span className={isDropDownOpen ? 'btnExportDataOpen' : ''}>
              Export
            </span>
            {!isDropDownOpen ? <FiChevronDown /> : <FiChevronUp />}
          </button>
          {isDropDownOpen && (
            <div className="ExportData-dropdown">
              <ul>
                {csvExport && (
                  <li className="dropdownOptionExportData">
                    {
                      <button
                        onClick={() => handleExportCsv()}
                        className="ExportDataLi_btn"
                      >
                        Export to CSV
                      </button>
                    }
                  </li>
                )}
                {excelExport && (
                  <li>
                    {
                      <button
                        onClick={() => handleExportExcel()}
                        className="ExportDataLi_btn"
                      >
                        Export to Excel
                      </button>
                    }
                  </li>
                )}
                {pdfExport && (
                  <li>
                    {
                      <button
                        onClick={() => handleExportPdf()}
                        className="ExportDataLi_btn"
                      >
                        Export to PDF
                      </button>
                    }
                  </li>
                )}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};
