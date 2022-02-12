import { configureStore } from '@reduxjs/toolkit';
import nearSlice from './slices/nearSlice';
import walletSlice from './slices/walletSlice';
import campaignFactorySlice from './slices/campaignFactorySlice';

export const store = configureStore({
    reducer: {
        wallet: walletSlice,
        near: nearSlice,
        campaignFactory: campaignFactorySlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
      /*{
        // Ignore these action types
        ignoredActions: [
          'wallet/signIn', 
          'wallet/signOut', 
          'wallet/setWalletConnection',
          'wallet.walletConnection',
          'near/setNear',
          'campaignFactory/setCampaigns',
        ],
      }, */
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch