import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import styles from './CartList.module.scss';
import { useEffect } from 'react';
import { getProductsInCart } from '../../redux/slices/cartProductSlise';


export default function CartList() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductsInCart());

  }, [dispatch]);

  const cartProductState = useAppSelector((state) => state.cartProduct);

  console.log("CART PRODUCT STATE:", cartProductState);
  
  // TODO: use cart products from redux
  return (
    <div className={styles.cartListContainer}>
      <h1 className={styles.cartListTitle}>Cart List</h1>
    </div>
  );
}