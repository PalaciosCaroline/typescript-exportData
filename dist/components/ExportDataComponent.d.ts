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
export declare const ExportDataComponent: <T>({ filteredData, columnsManaged, headerProperty, csvExport, excelExport, pdfExport, background, color, hoverBackground, }: ExportDataComponentProps<T>) => JSX.Element;
export {};
