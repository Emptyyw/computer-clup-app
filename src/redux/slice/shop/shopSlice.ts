import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createCategoryAndProductById,
  deleteCategoryAndAllProducts,
  deleteCategoryAndProduct,
  deleteImageToFirebase,
  getCategories,
  getProductsByCategoryId,
  updateCategoryAndProductById,
  uploadImageToFirebase,
} from 'api/shopDb';
import { RootState } from 'store/store';
import { CollectionPaths } from 'Enum/Enum';
import { v1 } from 'uuid';

export interface ICategory {
  id: string;
  name: string;
}

export interface IProduct {
  categoryId: string;
  id: string;
  name: string;
  image: string;
  quantity: string;
  price: string;
}

export interface IUpdateProduct extends Omit<IProduct, 'image'> {
  image: File;
}

interface ShopState {
  categories: ICategory[];
  products: IProduct[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ShopState = {
  categories: [] as ICategory[],
  products: [] as IProduct[],
  status: 'idle',
  error: null,
};

export const getCategoriesAsync = createAsyncThunk(
  'shop/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const categories = await getCategories(CollectionPaths.CATEGORIES);

      return categories;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getProductsByCategoryAsync = createAsyncThunk<IProduct[] | null, string>(
  'shop/getProductsByCategory',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const products = await getProductsByCategoryId<IProduct>(
        CollectionPaths.PRODUCTS,
        'categoryId',
        categoryId,
      );

      return products;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createCategoryAsync = createAsyncThunk(
  'shop/createCategory',
  async (name: string, { rejectWithValue }) => {
    try {
      const id = `categoryId-${v1()}`;

      const newCategory = await createCategoryAndProductById<ICategory>(
        CollectionPaths.CATEGORIES,
        id,
        { id, name },
      );

      return newCategory;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createProductAsync = createAsyncThunk(
  'shop/createProduct',
  async (
    {
      image,
      newProductData,
      categoryId,
    }: { image: File; newProductData: IUpdateProduct; categoryId: string },
    { rejectWithValue },
  ) => {
    try {
      const id = `productId-${v1()}`;

      const imageUrl = await uploadImageToFirebase(image, newProductData);

      const newProduct = {
        categoryId,
        id: id,
        name: newProductData.name,
        price: newProductData.price,
        quantity: newProductData.quantity,
        image: imageUrl,
      };

      const product = await createCategoryAndProductById(
        CollectionPaths.PRODUCTS,
        id,
        newProduct,
      );

      return product;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateProductAsync = createAsyncThunk(
  'shop/updateProduct',
  async (
    {
      updateProductData,
      categoryId,
    }: { updateProductData: IUpdateProduct; categoryId: string },
    { rejectWithValue },
  ) => {
    try {
      const imageUrl = await uploadImageToFirebase(
        updateProductData.image,
        updateProductData,
      );

      const updatedProductRef = await updateCategoryAndProductById(
        CollectionPaths.PRODUCTS,
        updateProductData.id,
        {
          name: updateProductData.name,
          price: updateProductData.price,
          quantity: updateProductData.quantity,
          image: imageUrl,
        },
      );

      const updatedProduct = {
        categoryId: categoryId,
        id: updatedProductRef.id,
        name: updateProductData.name,
        price: updateProductData.price,
        quantity: updateProductData.quantity,
        image: imageUrl,
      };

      return updatedProduct;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateCategoryAsync = createAsyncThunk(
  'shop/updateCategory',
  async (
    { categoryId, name }: { categoryId: string; name: string },
    { rejectWithValue },
  ) => {
    try {
      const updatedCategoryRef = await updateCategoryAndProductById(
        CollectionPaths.CATEGORIES,
        categoryId,
        { name },
      );

      const updatedCategory = { id: updatedCategoryRef.id, name };

      return updatedCategory;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteCategoryAndAllProductsAsync = createAsyncThunk(
  'shop/deleteAllProductInCategory',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      await deleteCategoryAndAllProducts(CollectionPaths.PRODUCTS, categoryId);

      return categoryId;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteProductAsync = createAsyncThunk(
  'shop/deleteProduct',
  async (
    { productId, imageUrl }: { productId: string; imageUrl: string },
    { rejectWithValue },
  ) => {
    try {
      await deleteImageToFirebase(imageUrl);

      await deleteCategoryAndProduct(CollectionPaths.PRODUCTS, productId);

      return productId;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getProductsByCategoryAsync.fulfilled, (state, action) => {
        state.products = action.payload || [];
      })
      .addCase(createCategoryAsync.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
        const categoryIndex = state.categories.findIndex(
          category => category.id === action.payload.id,
        );

        if (categoryIndex !== -1) {
          state.categories[categoryIndex] = action.payload;
        }
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const existingProduct = state.products.find(
          product => product.id === action.payload.id,
        );

        if (existingProduct) {
          existingProduct.name = action.payload.name;
          existingProduct.price = action.payload.price;
          existingProduct.quantity = action.payload.quantity;
          existingProduct.image = action.payload.image;
        }
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        const productId = action.payload;
        state.products = state.products.filter(product => product.id !== productId);
      })
      .addCase(deleteCategoryAndAllProductsAsync.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          category => category.id !== action.payload,
        );

        state.products = state.products.filter(
          product => product.categoryId !== action.payload,
        );
      })
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.status = 'loading';
          state.error = null;
        },
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        state => {
          state.status = 'failed';
          state.error = 'ERROR';
        },
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        state => {
          state.status = 'succeeded';
          state.error = null;
        },
      );
  },
});

export const selectCategories = (state: RootState) => state.shop.categories;
export const selectProducts = (state: RootState) => state.shop.products;

export default shopSlice.reducer;
