import "./App.css";
import "ag-grid-enterprise";
import { useState, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { LicenseManager } from "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

LicenseManager.setLicenseKey(
    "ag-Grid_Evaluation_License_Not_for_Production_100Devs30_August_2037__MjU4ODczMzg3NzkyMg==9e93ed5f03b0620b142770f2594a23a2"
);

import Api from "./services";
import { ICar } from "./types";
import { useFormik } from "formik";
import { useToast } from "@chakra-ui/react";
import Header from "./components/Header/Header";
import { Box, useDisclosure } from "@chakra-ui/react";
import { CreateItemDrawer } from "./components/Drawer/CreateItemDrawer";
import { GetRowIdParams, GridOptions, GridReadyEvent } from "ag-grid-community";
import { createServerSideDatasource } from "./datasource/datasource";
import { createFakeServer, getLastRowId } from "./utils";
import { CreateItemSchema } from "./validator";

function App() {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const gridRef = useRef<AgGridReact<ICar>>(null);
    const [columnDefs] = useState([{ field: "make" }, { field: "model" }, { field: "type" }, { field: "year" }]);
    const { values, handleSubmit, handleChange, touched, errors } = useFormik({
        initialValues: { make: "", model: "", type: "", year: "" },
        validationSchema: CreateItemSchema,

        onSubmit: async (values) => {
            const nextId = getLastRowId(gridRef);

            const newItem: ICar = {
                id: nextId,
                make: values.make,
                model: values.model,
                type: values.type,
                year: Number(values.year)
            };
            try {
                const payload = JSON.stringify(newItem);
                const response = await Api.post("/cars", payload, {
                    headers: { "Content-Type": "application/json" }
                });

                await response.data;

                gridRef.current?.api.applyServerSideTransactionAsync({
                    add: [newItem],
                    addIndex: 0
                });

                setTimeout(() => toast({ status: "success", title: `${values.make} ${values.model} successfully added` }), 400);
                onClose();
            } catch (error: unknown) {
                if (error instanceof Error) return toast({ title: error.message, status: "error" });
            }
        }
    });

    // Loading spinner: "https://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-24.jpg"

    const getRowId = useCallback((params: GetRowIdParams) => {
        return params.data.id;
    }, []);

    const defaultColDef = {
        flex: 1
    };

    const handleGridReady = useCallback(
        async (params: GridReadyEvent) => {
            try {
                const response = await Api.get("/cars");
                const data = await response.data;
                const fakeServer = createFakeServer(data);
                const datasource = createServerSideDatasource(fakeServer);

                params.api.setServerSideDatasource(datasource);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast({ title: error.message, status: "error" });
                }
            }
        },
        [toast]
    );

    const gridOptions: GridOptions = {
        columnDefs,
        defaultColDef,
        enableCellChangeFlash: true,
        rowModelType: "serverSide",
        onGridReady: handleGridReady
    };

    return (
        <Box className="ag-theme-alpine" style={{ height: "100vh" }}>
            <Header onOpen={onOpen} />

            <AgGridReact
                ref={gridRef}
                getRowId={getRowId}
                gridOptions={gridOptions}
                overlayLoadingTemplate={'<span className="ag-overlay-loading-center">Loading...</span>'}
                overlayNoRowsTemplate={'<span className="ag-overlay-loading-center">No rows to display</span>'}
            />
            <CreateItemDrawer
                values={values}
                errors={errors}
                isOpen={isOpen}
                onOpen={onOpen}
                touched={touched}
                onClose={onClose}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
            />
        </Box>
    );
}

export default App;
