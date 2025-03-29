import { AgGridReact } from "ag-grid-react";

export function getLastRowId(gridRef: React.RefObject<AgGridReact>) {
    const newId = String(Number(gridRef?.current?.api.getDisplayedRowAtIndex(gridRef?.current?.api.getFirstDisplayedRow())?.data?.id) + 1);
    return newId;
}

export function createFakeServer(allData: { id: number }[]) {
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
