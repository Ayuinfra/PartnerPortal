import * as React from "react";

import Accordion from "@mui/material/Accordion";

import AccordionDetails from "@mui/material/AccordionDetails";

import AccordionSummary from "@mui/material/AccordionSummary";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Box, Button, Grid } from "@mui/material";

import img from "../../../assets/images/ShoppingKart.png";

import TabNavigation from "../../../component/common/TabNavigation";

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <TabNavigation activeTab={"managePlan"} />

      <Grid container spacing={2}>
        <Grid item xs={7}>
          <h3>Products</h3>

          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <h5>Trace & Trace</h5>
            </AccordionSummary>

            <AccordionDetails>
              <Button></Button>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <h5>EVM WEB API</h5>
            </AccordionSummary>

            <AccordionDetails>
              <Button></Button>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <h5>HFNC</h5>
            </AccordionSummary>

            <AccordionDetails>
              <Button></Button>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <h5>SOL API</h5>
            </AccordionSummary>

            <AccordionDetails>
              <Button></Button>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={5}>
          <h3>Summary</h3>

          <Box sx={{ border: "2px solid blue" }}>
            <img src={img} width={200} height={250} alt="no"></img>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
