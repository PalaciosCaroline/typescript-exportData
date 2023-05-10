import 'jspdf-autotable';
interface Column {
    label: string;
    property: string;
    isVisible?: boolean;
}
export interface DataItem<T> {
    [key: string]: T | undefined;
}
export declare const exportToCsv: <T>(data: DataItem<T>[], columns: Column[], filename: string) => void;
export declare const exportToExcel: <T>(data: DataItem<T>[], columns: Column[], filename: string) => void;
export declare const exportToPdf: <T>(data: DataItem<T>[], columns: Column[], filename: string) => void;
export {};
