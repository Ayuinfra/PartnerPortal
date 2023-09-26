import React, { useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

import { TableProps } from "../../enums/CustomTableEnum";

const CustomTable: React.FC<TableProps> = ({
  header,
  data,
  onRowClickHandler,
  rowSelectedKey,
  selectedRow,
}) => {
  const [page, setPage] = useState<number>(0);
  const rowsPerPage: number = 5;

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const filteredData = data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const handleRowClick = (row: any) => {
    if (onRowClickHandler) {
      onRowClickHandler(row);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {header.map((headerItem, index) => (
              <TableCell key={index}>{headerItem.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row: any, rowIndex: number) => (
            <TableRow
              key={rowIndex}
              onClick={() => handleRowClick(row)}
              style={{
                cursor: onRowClickHandler ? "pointer" : "default",
                backgroundColor:
                  row[rowSelectedKey] === selectedRow ? "#ccc" : "transparent",
              }}
            >
              {header.map((headerItem, headerIndex) => (
                <TableCell key={headerIndex}>{row[headerItem.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_event, newPage) => handleChangePage(null, newPage)}
      />
    </TableContainer>
  );
};

export default CustomTable;
