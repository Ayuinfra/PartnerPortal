import { Typography } from "@mui/material";




type HeadingProps = {
    text:string;
}
const Heading : React.FC <HeadingProps> = ({text}) => {

    return(
        <>
        <Typography >
            {text}
        </Typography>

        </>

    )
}
export default Heading;