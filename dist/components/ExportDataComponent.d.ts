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
export declare const ExportDataComponent: <T>({ filteredData, columnsManaged, csvExport, excelExport, pdfExport, }: ExportDataComponentProps<T>) => JSX.Element;
export {};
