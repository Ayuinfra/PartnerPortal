import { Box, Card, CardContent, IconButton } from "@mui/material";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { CartProduct } from "./ManagePlan";
import img from "../../assets/images/ShoppingKart.png";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import CustomDialog from "../common/CustomDialog";

interface ICartProps {
  selectedPlans: CartProduct[];
  onPlanRemove: (index: number) => void;
}

const Cart: FC<ICartProps> = (props) => {
  const { selectedPlans, onPlanRemove } = props;

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalApiBalance, setTotalApiBalance] = useState<number>(0);
  const [openPay, setOpenPay] = useState<boolean>(false);
  const addTemplateRef = useRef<any>();

  useEffect(() => {
    let _totalPrice = 0;
    let _totalApiBalance = 0;

    selectedPlans.forEach((plan) => {
      _totalPrice = _totalPrice + plan.plane.price;
      _totalApiBalance = _totalApiBalance + plan.plane.apiBalance;
    });

    setTotalPrice(_totalPrice);
    setTotalApiBalance(_totalApiBalance);
  }, [selectedPlans]);

  const handleOpenPay = () => {setOpenPay(true)};
  const handleClosePay = () => {setOpenPay(false)};
  const PaySubscribe=()=>{
    addTemplateRef.current.click();
  }

  return (
    <Fragment>
      <h2>Summary</h2>
      <Box sx={{ border: "1px solid grey" }}>
        {selectedPlans.length === 0 ? (
          <div style={{ textAlign: "center" }}>
            <img src={img} width={200} height={250} alt="no" />
            <h4>Your cart is empty {":("}</h4>
          </div>
        ) : null}

        {selectedPlans.map((selectedPlan, index) => (
          <div key={index}>
            <Card variant="outlined">
              <CardContent
                style={{
                  border: "2px solid cyan",
                  height: "80%",
                  margin: "10px",
                  backgroundColor: "#f3fbfc",
                }}
              >
                <IconButton
                  onClick={() => onPlanRemove(index)} // Call the removal function on click
                  color="error"
                  style={{ float: "right" }} // Use a delete icon or button style
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
                <p>
                  <b>Product:</b> {selectedPlan.productName}
                </p>
                <p>
                  <b>Plan Name:</b> {selectedPlan.plane.planName}
                </p>
                <p>
                  <b>Price:</b> {selectedPlan.plane.price}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
        {selectedPlans.length > 0 ? (
          <div style={{ marginLeft: "10px" }}>
            <p>
              <span>Total Request: {totalApiBalance}</span>
            </p>
            <p>
              <h3>Order Total Price: {totalPrice}</h3>
            </p>
          </div>
        ) : null}
      </Box>
      <div style={{ textAlign: "center" }}>
        <button
          className="btn btn-primary  mt-4 rounded-0 w-100 "
          onClick={handleOpenPay}
        >
          Pay & Subscribe <EastOutlinedIcon fontSize="small" />
        </button>
      </div>
      <CustomDialog
        open={openPay}
        child={undefined}
        primaryBtn={"Continue"}
        primaryBtnAction={PaySubscribe}
        title={"Purchasing EVM WEB API"}
        onClose={handleClosePay}
      />
    </Fragment>
  );
};

export default Cart;
