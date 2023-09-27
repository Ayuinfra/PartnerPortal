import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Grid } from "@mui/material";
import img from "../../assets/images/ShoppingKart.png";
import { AuthServices } from "../../core/services/AuthServices";
import { useEffect, useState } from "react";

const ManagePlanTab = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [managePlanData, setManagePlanData] = useState<any>({});

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    const fetchManagePlanProducts = (
      productName: string,
      productId: number
    ) => {
      AuthServices.ManagePlanProducts(productName, productId)
        .then((res: { response: any }) => {
          if (res?.response) {
            setManagePlanData((prevData: any) => ({
              ...prevData,
              [productName]: res?.response,
            }));
          }
        })
        .catch((err) => {
          console.error("API Error:", err);
        });
    };

    fetchManagePlanProducts("Trace & Trace", 4);
    fetchManagePlanProducts("EVM WEB API", 1);
    fetchManagePlanProducts("HFNC", 5);
    fetchManagePlanProducts("SOL API", 2);
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <h3>Products</h3>

          {Object.keys(managePlanData).map((productName, index) => (
            <Accordion
              key={productName}
              expanded={expanded === `panel${index + 1}`}
              onChange={handleChange(`panel${index + 1}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}bh-content`}
                id={`panel${index + 1}bh-header`}
              >
                <h5>{productName}</h5>
              </AccordionSummary>

              <AccordionDetails>
                <div>
                  {managePlanData[productName].partnerPlan.map((plan: any) => (
                    <div key={plan.id}>
                      <h6>Plan Name: {plan.planName}</h6>
                      <p>Plan Validity: {plan.planValidity}</p>
                      <p>Price: {plan.price}</p>
                      <p>API Balance: {plan.apiBalance}</p>
                    </div>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>

        <Grid item xs={5}>
          <h3>Summary</h3>

          <Box sx={{ border: "2px solid blue" }}>
            <img src={img} width={200} height={250} alt="no" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ManagePlanTab;
