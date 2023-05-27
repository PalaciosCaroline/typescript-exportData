import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { exportToCsv, exportToExcel, exportToPdf } from '../utils/exportData';
import './../styles/exportDataComponant.css';

interface ColumnBase {
  isVisible?: boolean;
  property: string;
}

type ColumnManaged<T = any> = ColumnBase & {
  [otherProp: string]: T | undefined;
};

export interface DataItem<T> {
  [key: string]: T | undefined;
}

interface ExportDataComponentProps<T> {
  filteredData: DataItem<T>[];
  columnsManaged: ColumnManaged[];
  headerProperty?: string;
  csvExport?: boolean;
  excelExport?: boolean;
  pdfExport?: boolean;
}

interface ExportButtonProps {
  exportHandler: () => void;
  label: string;
  isFocused: boolean;
  index: number;
}

export const ExportDataComponent = <T,>({
  filteredData,
  columnsManaged,
  headerProperty,
  csvExport,
  excelExport,
  pdfExport,
}: ExportDataComponentProps<T>): JSX.Element => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const exportDataRef = useRef<HTMLDivElement>(null);
  const [focusedButtonIndex, setFocusedButtonIndex] = useState(-1);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const singleButtonRef = useRef<HTMLButtonElement>(null);

  const numberOfExportOptions = [csvExport, excelExport, pdfExport].filter(
    Boolean,
  ).length;

  const handleExportCsv = () => {
    exportToCsv(filteredData, columnsManaged, headerProperty, 'export.csv');
  };

  const handleExportExcel = () => {
    exportToExcel(filteredData, columnsManaged, headerProperty, 'export.xlsx');
  };

  const handleExportPdf = () => {
    exportToPdf(filteredData, columnsManaged, headerProperty, 'export.pdf');
  };

  const exportTypes = [
    { enabled: csvExport, handler: handleExportCsv, text: 'Export to CSV' },
    {
      enabled: excelExport,
      handler: handleExportExcel,
      text: 'Export to Excel',
    },
    { enabled: pdfExport, handler: handleExportPdf, text: 'Export to PDF' },
  ];

  const handleClickOutside = (event: MouseEvent) => {
    if (
      exportDataRef.current &&
      !exportDataRef.current.contains(event.target as Node)
    ) {
      setIsDropDownOpen(false);
    }
  };

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
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
            setFocusedButtonIndex((prevIndex) =>
              prevIndex > 0 ? prevIndex - 1 : prevIndex,
            );
          }
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (isDropDownOpen) {
            setFocusedButtonIndex((prevIndex) =>
              prevIndex < exportTypes.length - 1 ? prevIndex + 1 : prevIndex,
            );
          }
          break;

        case 'Enter':
        case ' ':
          event.preventDefault();
          if (numberOfExportOptions === 1) {
            // If there is only one export option, check if the single export button is currently focused
            if (document.activeElement === singleButtonRef.current) {
              const singleExportType = exportTypes.find(
                (exportType) => exportType.enabled,
              );
              if (singleExportType) {
                singleExportType.handler();
              }
            }
          } else {
            // Check if the dropdown toggle button is currently focused
            if (document.activeElement === toggleButtonRef.current) {
              if (isDropDownOpen && focusedButtonIndex >= 0) {
                const focusedButton = exportTypes[focusedButtonIndex];
                if (focusedButton && focusedButton.enabled) {
                  focusedButton.handler();
                }
              } else if (!isDropDownOpen) {
                toggleDropDown();
              }
            }
          }
          break;

        default:
          break;
      }
    },
    [
      isDropDownOpen,
      exportTypes,
      focusedButtonIndex,
      numberOfExportOptions,
      toggleButtonRef,
      singleButtonRef,
    ],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (
      isDropDownOpen &&
      focusedButtonIndex >= 0 &&
      focusedButtonIndex < exportTypes.length &&
      exportDataRef.current // Check if exportDataRef.current is not null
    ) {
      const buttonElement = exportDataRef.current.querySelector(
        `button:nth-child(${focusedButtonIndex + 1})`,
      );

      // Convert the element into HTMLElement before calling the focus method
      const htmlElement = buttonElement as HTMLElement;

      // Check to ensure the element exists
      if (htmlElement) {
        htmlElement.focus();
      }
    }
  }, [focusedButtonIndex, isDropDownOpen, exportTypes.length]);

  const ExportButton: React.FC<ExportButtonProps> = ({
    exportHandler,
    label,
    isFocused,
    index,
  }) => (
    <button
      ref={index === 0 ? singleButtonRef : null}
      onClick={exportHandler}
      onFocus={() => {
        setFocusedButtonIndex(index);
      }}
      className={`ExportDataLi_btn ${isFocused ? 'focused' : ''}`}
      tabIndex={0}
    >
      <span>{label}</span>
    </button>
  );

  return (
    <div
      className={`box-ExportData ${isDropDownOpen ? 'box-ExportDataOpen' : ''}`}
      role="menu"
      ref={exportDataRef}
    >
      {numberOfExportOptions === 1 && (
        <div className="toggle-btnExportData btnExportOne">
          {exportTypes.map(
            (exportType, index) =>
              exportType.enabled && (
                <ExportButton
                  isFocused={index === focusedButtonIndex}
                  key={exportType.text}
                  index={index}
                  exportHandler={exportType.handler}
                  label={exportType.text}
                />
              ),
          )}
        </div>
      )}
      {numberOfExportOptions > 1 && (
        <>
          <button
            ref={toggleButtonRef}
            className={`toggle-btnExportData toggle-btnsExport ${
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
                {exportTypes.map(
                  (exportType, index) =>
                    exportType.enabled && (
                      <li
                        className="dropdownOptionExportData"
                        key={`li-${exportType.text}`}
                      >
                        <ExportButton
                          index={index}
                          isFocused={index === focusedButtonIndex}
                          exportHandler={exportType.handler}
                          label={exportType.text}
                        />
                      </li>
                    ),
                )}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};
