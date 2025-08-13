import { useState, type JSX } from "react";
import { DataRow } from "../../atoms/DataRow/DataRow"
import type { CheckboxState, ColumnDefinition } from "../../../utils/types";
import { Checkbox } from "../../atoms/Checkbox/Checkbox";
import styles from './DataGrid.module.css';

interface DataGridProps<T extends Record<string, string | number>> {
    columnDefs: ColumnDefinition[];
    data: T[];
    darkmode?: boolean;
    tableActionLabel?: string;
    tableActionIcon?: JSX.Element;
    tableAction?: (selectedData: T[]) => void;
    rowSelection?: boolean
    height?: number, // Included for handling large data sets, can be removed if grids are fixed size
    width?: number // Included for handling  large data sets , can be removed if grids are fixed size
}

export const DataGrid = <T extends Record<string, string | number>>(
    {
        columnDefs,
        data,
        darkmode,
        tableAction,
        tableActionIcon,
        tableActionLabel,
        rowSelection = true,
        height,
        width
    }: DataGridProps<T>) => {


    const [selectedSet, setSelectedSet] = useState<Set<T>>(new Set());

    // Extracting unique key for selection process
    const pivotKey = columnDefs.filter((column) => column.isUnique)[0]?.columnName || null;

     // If colum Definitions is empty or unique key not set, display error message
    if (columnDefs.length === 0 || !pivotKey) {
        return (
            <div className="noData">No column selected or No unique column is set!</div>
        )
    }

    // If data is empty or not available, display no-data message
    if (!data || data.length === 0) {
        return (
            <div className="noData">No data to display!</div>
        )
    }

    // Derived State for Custom checkbox
    let selectAllState: CheckboxState = "unchecked";

    if (selectedSet.size === data.length) {
        selectAllState = "checked";
    } else if (selectedSet.size > 0 && selectedSet.size < data.length) {
        selectAllState = "mixed";
    }

    // Handle Select All
    const handleSelectAllChange = () => {
        const selectedSize = selectedSet.size;
        if ((selectedSize > 0 && selectedSize < data.length) || selectedSize === 0) {
            setSelectedSet(new Set(data));
        } else {
            setSelectedSet(new Set());
        }
    }

    // Handle single row Select
    const handleRowSelect = (index: number, checked: boolean) => {
        if (checked) {
            const selectedData = data[index];
            // Set auto prevent duplicates
            setSelectedSet((prev) => new Set(prev).add(selectedData))
        } else {
            setSelectedSet((prev) => {
                const filtered = Array.from(prev).filter((row) => row[pivotKey] !== data[index][pivotKey]);
                return new Set(filtered);
            })
        }
    }

    return (
        <div className={`${styles.dataGrid} ${darkmode ? styles.darkMode : ''}`}>
            {
                rowSelection &&
                <div className={styles.dataToolBar}>
                    <Checkbox state={selectAllState} onChange={handleSelectAllChange} />
                    <span className={styles.selectedInfo}>{selectedSet.size === 0 ? "None Selected" : `Selected : ${selectedSet.size}`}</span>
                    {tableAction && (
                        <button onClick={() => tableAction(Array.from(selectedSet))} aria-label={tableActionLabel}>
                            {tableActionIcon && <span className="tableActionIcon">{tableActionIcon}</span>}
                            {tableActionLabel}
                        </button>
                    )}
                </div>
            }
            <div className={styles.dataGridContainer} style={{ maxHeight: height, maxWidth: width }}>
                <table>
                    <thead>
                        <tr>
                            {rowSelection && <th>select</th>}
                            {
                                columnDefs.map((columnHeaders) => (
                                    <th key={columnHeaders.columnName}>{columnHeaders.columnName}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((rowData, index) => (
                                <DataRow
                                    key={`${rowData[pivotKey]}-${index}`}
                                    selected={selectedSet.has(rowData)}
                                    rowData={rowData}
                                    columnDefs={columnDefs}
                                    onRowSelect={(checked) => handleRowSelect(index, checked)}
                                    selectable={rowSelection}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}