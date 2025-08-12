import { DataGrid } from './components/DataGrid/DataGrid';
import { FileData } from './utils/data';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from './components/Modal/Modal';
import { DownloadList } from './components/DownloadList/DownloadList';
import type { ColumnDefinition, FileInfo } from './utils/types';
import './App.css'
import { Download } from 'lucide-react';

function App() {

  const [showDownloadAction, setShowDownloadAction] = useState<boolean>(false);
  const [gridSelectedItems, setGridSelectedItems] = useState<FileInfo[]>([]);

  const fileDataColumDefs: ColumnDefinition[] = [
    {
      columnName: "name",
      isUnique: true,
    },
    {
      columnName: "device",
      isUnique: false,
    },
    {
      columnName: "path",
      isUnique: false,
    },
    {
      columnName: "status",
      isUnique: false,
      columnStlye: {
        textTransform: "capitalize"
      },
      statusIndictor: {
        "available": "green"
      }
    }
  ];

  const handleDownloadClick = (selected: FileInfo[]) => {
    setShowDownloadAction(true);
    setGridSelectedItems(selected);
  }

  return (
    <>
      <h1>UI Test - Data Grid</h1>
      <DataGrid
        columnDefs={fileDataColumDefs}
        data={FileData}
        darkmode={false}
        tableAction={(selected) => handleDownloadClick(selected)}
        tableActionLabel="Download Selected"
        tableActionIcon={<Download />}
      />
      {
        showDownloadAction && (
          createPortal(
            <Modal onClose={() => setShowDownloadAction(false)}><DownloadList listItems={gridSelectedItems}></DownloadList></Modal>,
            document.body
          )
        )
      }
    </>
  )
}

export default App;
