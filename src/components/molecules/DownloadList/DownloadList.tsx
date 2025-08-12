import type { ColumnDefinition, FileInfo } from "../../../utils/types";
import { DataGrid } from "../../organisms/DataGrid/DataGrid";


interface DownloadListProps {
    listItems: FileInfo[]
}

export const DownloadList = ({ listItems }: DownloadListProps) => {
    
    const availableItems = listItems.filter((item) => item.status === "available");
    const downloadColDefs : ColumnDefinition[] = [
        {
            columnName: "path",
            isUnique: true,
        },
        {
            columnName: "device",
            isUnique: false,
        }
    ];

    if(availableItems.length === 0){
        return (
            <div>No file selected or Selected Files are not available for download at the moment!</div>
        )
    }

    return (
        <DataGrid data={availableItems} columnDefs={downloadColDefs} rowSelection={false}></DataGrid>
    )
}