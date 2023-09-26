export enum HeaderTypes {
  Text = "text",
  Date = "date",
  Actions = "actions",
  Status = "status",
  Custom = "Custom",
}

export interface TableHeaderProps {
  title: string;
  key: string;
  isSortable?: boolean;
  headerType: HeaderTypes;
}


export  interface TableProps {
    header : TableHeaderProps[];
    data:any;
    onRowClickHandler?: (row: any) => void;
    rowSelectedKey?: any;
    selectedRow?:any

}

export interface MenusProps {
    name: string;
    clickHandler: (rowData: any) => void;
    disableMenu?: boolean;
}
