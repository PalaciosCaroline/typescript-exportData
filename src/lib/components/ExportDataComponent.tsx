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
  background?: string;
  color?: string;
  hoverBackground?: string;
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
  background = '#677e11',
  color = 'white',
  hoverBackground = '#7e9b16',
}: ExportDataComponentProps<T>): JSX.Element => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const exportDataRef = useRef<HTMLDivElement>(null);
  const [focusedButtonIndex, setFocusedButtonIndex] = useState(-1);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const singleButtonRef = useRef<HTMLButtonElement>(null);
  const style = {
    '--background-color': background,
    '--color': color,
    '--hover-background-color': hoverBackground,
  } as React.CSSProperties;

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
  
  const toggleDropDownExport = useCallback(() => {
    setIsDropDownOpen((prevIsOpen) => {
      if (!prevIsOpen) {
        setFocusedButtonIndex(0);
      }
      return !prevIsOpen;
    });
  }, []);

  const handleKeyDownExport = useCallback(
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
          if (isDropDownOpen) {
            event.preventDefault();
            setFocusedButtonIndex((prevIndex) =>
              prevIndex > 0 ? prevIndex - 1 : prevIndex,
            );
          }
          break;
        case 'ArrowDown':
          if (isDropDownOpen) {
            event.preventDefault();
            setFocusedButtonIndex((prevIndex) =>
              prevIndex < exportTypes.length - 1 ? prevIndex + 1 : prevIndex,
            );
          }
          break;

        case 'Enter':
        case ' ':
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
                event.preventDefault();
                if (isDropDownOpen && focusedButtonIndex >= 0) {

                  const focusedButton = exportTypes[focusedButtonIndex];
                  if (focusedButton && focusedButton.enabled) {
                    focusedButton.handler();
                  }
                } else if (!isDropDownOpen) {
                  toggleDropDownExport();
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
    document.addEventListener('keydown', handleKeyDownExport);

    return () => {
      document.removeEventListener('keydown', handleKeyDownExport);
    };
  }, [handleKeyDownExport]);

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
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault(); 
          exportHandler();
          setIsDropDownOpen(false);
          setFocusedButtonIndex(-1);
          toggleButtonRef.current?.focus();
        }
      }}
      className={`ExportDataLi_btn ${
        isFocused ? 'focused' : ''
      } customComponent`}
      tabIndex={0}
      style={style}
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
                  // exportHandler={handleOptionSelected(exportType.handler)}
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
            } customComponent`}
            onClick={toggleDropDownExport}
            aria-label="export data"
            aria-haspopup="true"
            aria-expanded={isDropDownOpen}
            style={style}
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
