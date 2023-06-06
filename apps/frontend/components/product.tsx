import Image, { StaticImageData } from "next/image";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  slug: string;
  description: string;
  image?: StaticImageData;
}

interface IProductProps {
  product: IProduct;
}

const Product = (props: IProductProps) => {
  return (
    <div>
      <div>
        {props.product.image && (
          <Image src={props.product.image} alt={props.product.image.src} />
        )}
      </div>
      <div className="product__price-button-container">
        <div className="mb-4 text-2xl">${props.product.price.toFixed(2)}</div>
        <button
          className={`snipcart-add-item py-4 px-8 bg-orange-600 text-white text-xl`}
          data-item-id={props.product.id}
          data-item-name={props.product.name}
          data-item-description={props.product.description}
          data-item-price={props.product.price}
          data-item-url={`https://builtbyandrew.com/piece/${props.product.slug}`}
          //data-item-image={props.product.image.src}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
