import { configureStore } from "@reduxjs/toolkit";
import { create } from "zustand";
import { UserType } from "./utils";
// ...

export const store = configureStore({
    reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

interface selectedUserState {
    selectedUsers: UserType[] | null | undefined;
    setSelectedUsers: (users: UserType[] | null) => void;
}

export const useSelectedUserStore = create<selectedUserState>((set) => ({
    selectedUsers: undefined,
    setSelectedUsers: (users: UserType[] | null) =>
        set({ selectedUsers: users }),
}));
