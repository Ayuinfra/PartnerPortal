import React, { useContext, useEffect, useState } from "react";
import Cart from "./Cart";
import { AuthServices } from "../../core/services/AuthServices";
import PlanDetails, { PlanInfo } from "./PlanDetails";
import { CommonContext } from "../../core/context/CommonContext";
import CustomAccordian from "../common/CustomAccordian";

export type CartProduct = {
  productId: number;
  productName: string;
  plane: PlanInfo;
};

const ManagePlan = () => {
  const [managePlanData, setManagePlanData] = useState<any[]>([]);
  const [selectedPlans, setSelectedPlans] = useState<CartProduct[]>([]);

  const commonContext = useContext(CommonContext);

  const { loggedInUser } = commonContext || {};
  const { profileId, api_key } = loggedInUser || {};

  const onPlanSelectHandler = async (plan: any, product: any) => {

    if (plan.planName !== "Free") {
      const arr: CartProduct[] = JSON.parse(JSON.stringify(selectedPlans));
      const index = arr.findIndex((item) => item.productId === product.id);

      if (index > -1) {
        arr[index].plane = plan;
        setSelectedPlans(arr);
      } else {
        setSelectedPlans((prev) => [
          ...prev,
          {
            productId: product.id,
            plane: plan,
            productName: product.product,
          },
        ]);
      }

      try {
        const response = await AuthServices.addWalletPlan({
          profileId: profileId || "",
          api_key: api_key || "",
        });

        console.log("Plan added to cart:", response);
      } catch (ex) {
        console.error("Error adding plan to cart:", ex);
      }
    }
  };



  const onGetProducts = async () => {
    try {
      const response = await AuthServices.GetAllPlanProducts();
      if (response?.response) {
        setManagePlanData(response.response);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const onPlanRemoveHandler = (indexToRemove: any) => {
    setSelectedPlans((prevPlans) =>
      prevPlans.filter((_, index) => index !== indexToRemove)
    );
  };

  useEffect(() => {
    onGetProducts();
  }, []);

  useEffect(() => { }, [selectedPlans]);

  return (
    <div className="row">
      <div className="col-md-8">
        <h3>Products</h3>
        <div>
          {managePlanData.map((plan) => (
            <div className="mb-2" key={plan.id}>
              <CustomAccordian
                header={plan.product}
                id={plan.id}
                body={
                  <PlanDetails
                    product={plan}
                    onPriceSelect={onPlanSelectHandler}
                    plan={plan.partnerPlan}
                  />
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className="col-md-4">
        <Cart
          selectedPlans={selectedPlans}
          onPlanRemove={onPlanRemoveHandler}
        />
      </div>
    </div>
  );
};

export default ManagePlan;
