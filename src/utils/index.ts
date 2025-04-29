import { AgGridReact } from "ag-grid-react";
import fs from "fs";

export function getLastRowId(gridRef: React.RefObject<AgGridReact>) {
    const newId = String(Number(gridRef?.current?.api.getDisplayedRowAtIndex(gridRef?.current?.api.getFirstDisplayedRow())?.data?.id) + 1);
    return newId;
}

export function createFakeServer(allData: any) {
    return {
        getData: (request: { startRow: number; endRow: number }) => {
            const sortRows = allData.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
            const requestedRows = sortRows.slice(request.startRow, request.endRow);
            return {
                success: true,
                rows: requestedRows
            };
        }
    };
}

// Added for netlify
// write to json
export const writeJsonToFile = (filePath: string, jsonData: any) => {
    try {
        const jsonString = JSON.stringify(jsonData, null, 2); // Convert object to JSON string with indentation
        fs.writeFileSync(filePath, jsonString, "utf-8"); // Write to file synchronously
        console.log(`Data successfully written to ${filePath}`);
    } catch (error) {
        console.error("An error occurred:", error);
    }
};
