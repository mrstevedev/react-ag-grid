/**
 * CreateServerSideDataSource
 */
export const createServerSideDatasource: (server: any) => any = (server: any) => {
    return {
        getRows: (params: { request: { startRow: number; endRow: number }; success: (arg0: { rowData: any }) => void; fail: () => void }) => {
            console.log("[Datasource] - rows requested by grid: ", params.request);
            // get data for request from our fake server
            const response = server.getData(params.request);
            // simulating real server call with a 500ms delay
            setTimeout(() => {
                if (response.success) {
                    // supply rows for requested block to grid
                    params.success({ rowData: response.rows });
                } else {
                    params.fail();
                }
            }, 2000);
        }
    };
};
