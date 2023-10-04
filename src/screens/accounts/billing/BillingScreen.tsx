import TabNavigation from "../../../component/common/TabNavigation";

import Table from "@mui/material/Table";

import TableBody from "@mui/material/TableBody";

import TableCell from "@mui/material/TableCell";

import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";

import { getUserFromLocalStorage } from "../../../api/shared/CommonApi";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import { useRef, useState } from "react";

import EditBilling from "./EditBilling";

import { rawData } from "../../../component/common/DummyData";

import CustomDialog from "../../../component/common/DialogBox";

const BillingScreen = () => {
  const userName = getUserFromLocalStorage();

  const addTemplateRef = useRef<any>();

  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const update = () => {
  
    addTemplateRef.current.click();
  };

  return (
    <>
      <TabNavigation activeTab={"billing"} />

      <h3>Your Subscriptions</h3>

      <TableContainer component={Paper} style={{ width: "65%" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {rawData.map((row) => (
              <TableRow
                key={row.key}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },

                  height: "80px",
                }}
              >
                <TableCell scope="column">
                  <h5>{row.plan} </h5> Free plan -{row.request} requests
                </TableCell>

                <TableCell align="right">
                  <h5>{row.price}</h5> Monthly
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h3>Billing Info</h3>

      <Card
        sx={{ minWidth: 275 }}
        style={{
          width: "65%",

          display: "flex",

          flexDirection: "row",

          justifyContent: "space-between",

          backgroundColor: "#f7fcfd",
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 20 }}>
            {userName?.partnerBillingDetails?.fullName}
          </Typography>

          <Typography> {userName?.username}</Typography>
        </CardContent>

        <CardActions>
          <Button size="small" variant="outlined" onClick={handleEditOpen}>
            Edit
          </Button>
        </CardActions>
      </Card>

      <CustomDialog
        open={openEdit}
        child={<EditBilling ref={addTemplateRef} />}
        secondryBtnAction={update}
        secondryBtn="Save Billing Address"
        primaryBtn="Discard Changes"
        title="Billing Details"
        onClose={handleEditClose}
        primaryBtnAction={handleEditClose}
      />
    </>
  );
};

export default BillingScreen;
