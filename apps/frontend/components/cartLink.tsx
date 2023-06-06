import { RiShoppingCart2Line } from "react-icons/ri";


const CartButton = () => 
    <button className="snipcart-checkout  text-white relative">
        <RiShoppingCart2Line size={24}/>
        <span className="snipcart-items-count absolute -top-3 -right-4 text-sm px-2 text-center bg-red-600 text-white rounded-full" />
        {/* <span className="snipcart-total-price" /> */}
    </button>

export default CartButton;