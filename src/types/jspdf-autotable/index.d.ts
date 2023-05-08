import { jsPDF } from "jspdf";

declare module "jspdf" {
  export interface jsPDF {
    autoTable(options: any): jsPDF;
  }
}

declare global {
  const autoTable: (options: any) => jsPDF;
}

export { autoTable };