import React, { createContext, useContext, useState, useMemo } from 'react';

const ProductContext = createContext();

export default function ProductContextComponent({ children }) {
  const [productContext, setProductContext] = useState(null);

  const updateProductContext = (prod) => {
    setProductContext(prod);
  };

  const contextValue = useMemo(() => ({
    productContext,
    updateProductContext,
    setProductContext,
  }), [productContext]);

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProductContext = () => useContext(ProductContext);
