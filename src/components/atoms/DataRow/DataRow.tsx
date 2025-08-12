import type { ColumnDefinition } from '../../../utils/types';
import styles from './DataRow.module.css';

interface DataRowProps<T extends Record<string, string | number>> {
    rowData: T,
    columnDefs: ColumnDefinition[],
    selected?: boolean,
    onRowSelect?: (checked: boolean) => void,
    selectable?: boolean
}

export const DataRow = <T extends Record<string, string | number>>({
    rowData,
    columnDefs,
    selected,
    onRowSelect,
    selectable = true
}: DataRowProps<T>) => {

    return (
        <tr className={selected ? styles.selectedRow : ""}>

            {selectable && <td>
                <input
                    type="checkbox"
                    onChange={event => onRowSelect?.(event.target.checked)}
                    checked={selected}
                    aria-label={`${rowData[columnDefs[0].columnName]}`}
                />
            </td> } 

            {columnDefs.map((columnDef, index) => (
                <td
                    key={columnDef.columnName}
                    style={columnDefs[index].columnStlye}
                >
                    {
                        columnDef.statusIndictor &&
                        <span
                            data-testid="status-indicator"
                            className={styles.statusIndicator}
                            style={{ background: `${columnDef.statusIndictor[rowData[columnDef.columnName]]}` }}>
                        </span>
                    }
                    {rowData[columnDef.columnName]}
                </td>
            ))}
        </tr>
    );
}