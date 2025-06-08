import { Tab } from "./tab";
import { UserSlice } from "./user";
import { PostSlice } from "./post";
import { GroupSlice } from "./group";
import { MessageSlice } from "./message";
import { NotificationSlice } from "./notification";

export interface AppState
  extends UserSlice,
    PostSlice,
    NotificationSlice,
    GroupSlice,
    MessageSlice {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}
