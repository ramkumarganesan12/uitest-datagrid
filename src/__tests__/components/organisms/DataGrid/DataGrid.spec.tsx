import { fireEvent, render, screen, within } from "@testing-library/react";
import { vi } from "vitest";
import { DataGrid } from "../../../../components/organisms/DataGrid/DataGrid";
import "@testing-library/jest-dom";

const mockData = [ // Testing using generic data
    {
        model: "A380",
        manufacturer: "Airbus",
        fleetSize: 320,
        topCustomer: "Emirates",

    },
    {
        model: "A350",
        manufacturer: "Airbus",
        fleetSize: 127,
        topCustomer: "Cathay",
    },
    {
        model: "B787",
        manufacturer: "Boeing",
        fleetSize: 458,
        topCustomer: "Virgin Atlantic",
    }
];

const mockColDefs = [
    {
        columnName: "model",
        isUnique: true,
    },
    {
        columnName: "manufacturer",
        isUnique: false,
    },
    {
        columnName: "fleetSize",
        isUnique: false,
    }
]

describe("Data Grid", () => {

    describe("Data Rendering", () => {
        beforeEach(() => {
            render(<DataGrid data={mockData} columnDefs={mockColDefs} />);
        });

        it("should render 3 rows of data", () => {
            const tBody = screen.getAllByRole('rowgroup')[1];
            const rows = within(tBody).getAllByRole('row');
            expect(rows).toHaveLength(3);
        })

        it("should display all 3 rows of data correctly", () => {
            expect(screen.queryByText(/A380/i)).toBeInTheDocument(); // First row data
            expect(screen.queryByText(/A350/i)).toBeInTheDocument(); // Second row data
            expect(screen.queryByText(/B787/i)).toBeInTheDocument(); // Third rowdata
        });

        it("should not display columns for the columns not defined in column defintions", () => {
            expect(screen.queryByText(/Emirates/i)).not.toBeInTheDocument(); // First row data
            expect(screen.queryByText(/Cathay/i)).not.toBeInTheDocument(); // Second row data
            expect(screen.queryByText(/Virgin Atlantic/i)).not.toBeInTheDocument(); // Third rowdata
        });
    })

    describe("No Data and No Column Defintions", () => {
       
        it("should display No Data error messages correctly", () => {
            render(<DataGrid data={[]} columnDefs={mockColDefs} />);
            expect(screen.queryByText(/No data to display!/i)).toBeInTheDocument(); 
        });

        it("should display No column selected error messages correctly", () => {
            render(<DataGrid data={mockData} columnDefs={[]} />);
            expect(screen.queryByText(/No column selected or No unique column is set!/i)).toBeInTheDocument(); 
        });
        
    })

    describe("Row Selection", () => {
        beforeEach(() => {
            render(<DataGrid data={mockData} columnDefs={mockColDefs} />);
        });

        it("should increment selected count on selecting checkbox and decrement on unselecting", () => {
            const checkbox1 = screen.getByRole("checkbox", { name: /A380/i });
            const checkbox2 = screen.getByRole("checkbox", { name: /A350/i });
            fireEvent.click(checkbox1);
            fireEvent.click(checkbox2);

            expect(screen.queryByText(/Selected : 2/i)).toBeInTheDocument();

            fireEvent.click(checkbox1);
            expect(screen.queryByText(/Selected : 1/i)).toBeInTheDocument();

            fireEvent.click(checkbox2);
            expect(screen.queryByText(/None Selected/i)).toBeInTheDocument();
        });

        it("should show un-checked state when all rows are selected", () => {
            const selectAllCheckbox = screen.getByRole("button", { name: /Select or Unselect all rows/i });

            expect(selectAllCheckbox).toHaveTextContent("");
        });

        it("should show intermediate state when some rows are selected", () => {
            const checkbox1 = screen.getByRole("checkbox", { name: "A380" });
            const checkbox2 = screen.getByRole("checkbox", { name: "A350" });
            fireEvent.click(checkbox1);
            fireEvent.click(checkbox2);

            const selectAllCheckbox = screen.getByRole("button", { name: /Select or Unselect all rows/i });

            expect(selectAllCheckbox).toHaveTextContent("—")
        });

        it("should show checked state when all rows are selected", () => {
            const checkbox1 = screen.getByRole("checkbox", { name: /A380/i });
            const checkbox2 = screen.getByRole("checkbox", { name: /A350/i });
            const checkbox3 = screen.getByRole("checkbox", { name: /B787/i });

            fireEvent.click(checkbox1);
            fireEvent.click(checkbox2);
            fireEvent.click(checkbox3);

            const selectAllCheckbox = screen.getByRole("button", { name: /Select or Unselect all rows/i });

            expect(selectAllCheckbox).toHaveTextContent("✔");
        });
    })

    describe("Select All Actions", () => {

        beforeEach(() => {
            render(<DataGrid data={mockData} columnDefs={mockColDefs} />);
        });

        it("should select all the rows on checking select all and deselect all rows on unchecking", () => {
            const selectAllCheckbox = screen.getByRole("button", { name: /Select or Unselect all rows/i });
            fireEvent.click(selectAllCheckbox);

            expect(screen.getByRole("checkbox", { name: /A380/i })).toBeChecked();
            expect(screen.getByRole("checkbox", { name: /A350/i })).toBeChecked();
            expect(screen.getByRole("checkbox", { name: /B787/i })).toBeChecked();

            fireEvent.click(selectAllCheckbox);

            expect(screen.getByRole("checkbox", { name: /A380/i })).not.toBeChecked();
            expect(screen.getByRole("checkbox", { name: /A350/i })).not.toBeChecked();
            expect(screen.getByRole("checkbox", { name: /B787/i })).not.toBeChecked();

        })
    });

    describe("Table Actions", () => {

        const performTableAction = vi.fn();

        beforeEach(() => {
            render(<DataGrid data={mockData} columnDefs={mockColDefs} tableAction={performTableAction} tableActionLabel="Extract"/>);
        });

        it("should render the button with correct label text", () => {
            expect(screen.getAllByRole("button", { name: "Extract" })).toHaveLength(1);
        })

        it("should render the button with correct icon", () => {
            render(<DataGrid data={mockData} columnDefs={mockColDefs} tableAction={performTableAction} tableActionLabel="Extract" tableActionIcon={<i>dummy icon</i>}/>);
            expect(screen.queryByText(/dummy icon/i)).toBeInTheDocument();;
        })

        it("should render the button and on click calls the action function with selected data", () => {

            const actionButton = screen.getByRole("button", { name: /Extract/i });
            const checkbox1 = screen.getByRole("checkbox", { name: /A380/i });

            fireEvent.click(checkbox1);
            fireEvent.click(actionButton);

            expect(performTableAction).toHaveBeenCalledTimes(1);
            expect(performTableAction).toHaveBeenCalledWith([
                {
                    model: "A380",
                    manufacturer: "Airbus",
                    fleetSize: 320,
                    topCustomer: "Emirates",
                }
            ]);

        })
    });

})