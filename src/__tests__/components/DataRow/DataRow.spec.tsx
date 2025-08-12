import { render, screen } from "@testing-library/react";
import { DataRow } from "../../../components/DataRow/DataRow";
import type { ColumnDefinition } from "../../../utils/types";

const mockRowData = {
    model: "a350", // lowercase for testing
    manufacturer: "Airbus",
    fleetSize: 127,
    topCustomer: "Cathay",
}

const mockColDefs: ColumnDefinition[] = [
    {
        columnName: "model",
        isUnique: true,
        columnStlye: {
            textTransform: "uppercase"
        },
        statusIndictor: {
            "a350" : "rgb(0, 128, 3)"
        }
    }
];

describe("Data Row", () => {

    it("should render correct styles on specific columns on defintion", () => {

        render(<DataRow rowData={mockRowData} columnDefs={mockColDefs}/>);
        expect(screen.queryByText("a350")).toHaveStyle("text-transform: uppercase;");
    })

    it("should render status indicator with correct colour", () => {

        render(<DataRow rowData={mockRowData} columnDefs={mockColDefs}/>);
        const statusIndicator = screen.getByTestId("status-indicator");
        expect(statusIndicator).toHaveStyle({ backgroundColor: "rgb(0, 128, 3)" });
    })

})