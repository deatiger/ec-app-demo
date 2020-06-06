import React from 'react';
import {ProductCard} from "../components/Products";

const ProductList = () => {
    const products = [
        {image: "", price: 10760, productName: "トラウザーズ"},
        {image: "", price: 2980, productName: "リネンシャツ"},
        {image: "", price: 12500, productName: "Mexico 66｜オニツカタイガー"},
        {image: "", price: 1000, productName: "スニカーズ｜オニツカタイガー"},
    ];

    return (
        <section className="c-section-wrapin">
            <div className="p-grid__row">
                {products.map(product => {
                    return <ProductCard image={product.image} price={product.price} productName={product.productName} />
                })}
            </div>
        </section>
    );
};

export default ProductList;