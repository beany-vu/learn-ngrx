import { TabItem } from './tabItem.model';

export interface Tab {
    id: number;
    tabPrimaryItems: Array<TabItem>;
    tabSecondaryItems: Array<TabItem>;
}
