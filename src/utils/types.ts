import type { CSSProperties, JSX } from "react"

export interface ColumnDefinition {
    columnName: string,
    isUnique: boolean,
    columnStlye?: CSSProperties,
    statusIndictor?: Record<string, string>
}

export interface FileInfo extends Record<string, string | number> {
    name: string,
    device: string,
    path: string,
    status: string
}

export interface TableAction<T extends Record<string, string | number>> {
    label: string,
    action: (selectedData: T[]) => void,
    icon? : JSX.Element
}

export type CheckboxState = "checked" | "mixed" | "unchecked";