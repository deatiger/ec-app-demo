import React from 'react';
import Divider from "@material-ui/core/Divider";
import {OrderedProducts} from "./index";
import {dateToString} from "../../function/common";
import {TextDetail} from "../UIkit";

const OrderHistoryItem = (props) => {
    const shippingDate = dateToString(props.order.shipping_date.toDate())
    const totalPrice = "¥" + props.order.amount.toLocaleString()
    const products = props.order.products

    return (
        <div>
            <div className="module-spacer--small" />
            <TextDetail label={"注文ID"} value={props.order.id} />
            <TextDetail label={"発送予定日"} value={shippingDate} />
            <TextDetail label={"注文金額"} value={totalPrice}/>
            {Object.keys(products).length > 0 && (
                <OrderedProducts products={products} />
            )}
            <div className="module-spacer--extra-extra-small" />
            <Divider />
        </div>
    );
};

export default OrderHistoryItem;