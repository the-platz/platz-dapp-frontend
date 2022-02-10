import { configureStore } from '@reduxjs/toolkit';
import nearSlice from './slices/nearSlice';
import walletSlice from './slices/walletSlice';

export const store = configureStore({
    reducer: {
        wallet: walletSlice,
        near: nearSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'wallet/signIn', 
          'wallet/signOut', 
          'wallet/setWalletConnection', 
          'near/setNear'
        ],
      },
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch