import { FC } from "react";
import { Card, CardContent } from "@mui/material";

export type PlanInfo = {
  apiBalance: number;
  description: string[];
  id: number;
  isActive: boolean;
  planName: string;
  planValidity: string;
  price: number;
};

interface IPlanDetailsProps {
  product: any;
  plan: PlanInfo[];
  onPriceSelect: (plan: any, productId: number) => void;
}

const PlanDetails: FC<IPlanDetailsProps> = (props) => {
  const { product, plan, onPriceSelect } = props;

  return (
    <div>
      {plan.map((plan) => (
        <Card
          variant="outlined"
          style={{ marginBottom: "10px" }}
          onClick={() => onPriceSelect(plan, product)}
        >
          <CardContent
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <p>
              <b>Plan Name:</b> {plan.planName}
            </p>
            <p>
              <b>Price:</b> {plan.price} / {plan.planValidity}
            </p>
            <p>
              <b>API Balance:</b> {plan.apiBalance} /{plan.planValidity}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default PlanDetails;
