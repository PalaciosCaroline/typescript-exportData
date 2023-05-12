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
    headerProperty?: string | undefined;
    csvExport?: boolean;
    excelExport?: boolean;
    pdfExport?: boolean;
}
export declare const ExportDataComponent: <T>({ filteredData, columnsManaged, headerProperty, csvExport, excelExport, pdfExport, }: ExportDataComponentProps<T>) => JSX.Element;
export {};
