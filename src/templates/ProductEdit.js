import React, {useCallback, useState} from 'react';
import {PrimaryButton, SelectBox, TextInput} from "../components/UIkit";
import {useDispatch} from "react-redux";
import {saveProduct} from "../reducks/products/operations";
import {ImageArea} from "../components/Products";

const ProductEdit = () => {
    const dispatch = useDispatch()
    let id = window.location.pathname.split('/product/edit')[1];
    if (id !== "") {
        id = id.split('/')[1]
    }

    const [productName, setProductName] = useState(""),
          [description, setDescription] = useState(""),
          [images, setImages] = useState([]),
          [category, setCategory] = useState(""),
          [price, setPrice] = useState("");

    const categories = [
        {id: "shirts", name: "シャツ"},
        {id: "shoes", name: "靴"},
        {id: "pants", name: "パンツ"}
    ]

    const inputProductName = useCallback((event) => {
        setProductName(event.target.value)
    }, [setProductName])

    const inputDescription = useCallback((event) => {
        setDescription(event.target.value)
    }, [setDescription])

    const inputPrice = useCallback((event) => {
        setPrice(event.target.value)
    }, [setPrice])

    return (
        <section>
            <h2 className="u-text__headline">商品の登録・編集</h2>
            <div className="module-spacer--medium" />
            <div className="c-section-container">
                <ImageArea images={images} setImages={setImages} />
                <TextInput
                    fullWidth={true} label={"商品名"} multiline={false} required={true}
                    onChange={inputProductName} rows={1} value={productName} type={"text"}
                />
                <TextInput
                    fullWidth={true} label={"商品説明"} multiline={false} required={true}
                    onChange={inputDescription} rows={1} value={description} type={"text"}
                />
                <SelectBox
                    label={"カテゴリー"} options={categories} required={true} select={setCategory} value={category}
                />
                <TextInput
                    fullWidth={true} label={"価格"} multiline={false} required={true}
                    onChange={inputPrice} rows={1} value={price} type={"tel"}
                />
                <div className="module-spacer--small" />
                <div className="center">
                    <PrimaryButton
                        label={"商品情報を保存"}
                        onClick={() => dispatch(saveProduct(id, productName, description, category, price, images))} />
                </div>
            </div>
        </section>
    );
};

export default ProductEdit;