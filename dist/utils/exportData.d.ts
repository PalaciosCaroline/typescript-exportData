import 'jspdf-autotable';
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
export declare const exportToCsv: <T>(data: DataItem<T>[], columns: ColumnManaged[], headerProperty: string | undefined, filename: string) => void;
export declare const exportToExcel: <T>(data: DataItem<T>[], columns: ColumnManaged[], headerProperty: string | undefined, filename: string) => void;
export declare const exportToPdf: <T>(data: DataItem<T>[], columns: ColumnManaged[], headerProperty: string | undefined, filename: string) => void;
export {};
