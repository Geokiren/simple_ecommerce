const apiBaseUrl: string = `${import.meta.env.VITE_API_BASE_URL as string}/products`;

export const getCategories = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/categories`);

    if (!response.ok) {
      throw new Error(`Failed to fetch product categories. HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchProducts = async (searchTerm: string) => {
  try {
    const response = await fetch(`${apiBaseUrl}/search?q=${searchTerm}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch products. HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProducts = async (params: string) => {
  try {
    const response = await fetch(`${apiBaseUrl}?${new URLSearchParams(params).toString()}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch products. HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProductsByCategory = async (category: string, params: string) => {
  try {
    const response = await fetch(
      `${apiBaseUrl}/category/${category}?${new URLSearchParams(params).toString()}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products. HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProduct = async (id: string) => {
  try {
    const response = await fetch(`${apiBaseUrl}/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch product. HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
