import { create } from 'zustand';

interface CommentBottomSheetState {
  isOpen: boolean;
  postId: string | null;
  openCommentSheet: (postId: string) => void;
  closeCommentSheet: () => void;
}

export const useCommentBottomSheet = create<CommentBottomSheetState>((set) => ({
  isOpen: false,
  postId: null,
  openCommentSheet: (postId: string) => set({ isOpen: true, postId }),
  closeCommentSheet: () => set({ isOpen: false, postId: null }),
}));