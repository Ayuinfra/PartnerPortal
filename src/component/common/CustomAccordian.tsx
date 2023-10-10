
import { FC,useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface ICustomAccordianProps{
    body : any
    header : string
    id : number
}


const CustomAccordian : FC<ICustomAccordianProps> = (props)=>{

    const {header,body,id} = props;

    const [expanded, setExpanded] = useState<string | false>(false);
    const handleChange = (pannelId: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? pannelId : false);
    };

    return(
        <div>
            <Accordion 
                expanded={expanded === id.toString()} 
                onChange={handleChange(id.toString())}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >

                    {header}
                </AccordionSummary>
                <AccordionDetails>
                    {body}
                </AccordionDetails>
            </Accordion>
        </div>

    )
}
export default CustomAccordian;