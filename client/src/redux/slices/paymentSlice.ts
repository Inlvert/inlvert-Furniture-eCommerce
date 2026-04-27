import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "@/api/index";

const SLISE_NAME = "payment";

export const createStripeCheckout = createAsyncThunk(
  `${SLISE_NAME}/stripeCheckout`,
  async (items: any[]) => {
    const res = await API.cretaeStripeCheckout(items);

    const data = await res.json();

    return data.checkoutUrl;
  },
);
