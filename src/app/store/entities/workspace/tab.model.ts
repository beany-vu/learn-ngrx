import { TabItem, TabItemConcrete } from './tabItem.model';

export interface Tab {
    id: number;
    tabItems: Array<TabItem>;
    addTabItem(tabItem: TabItem): Array<TabItem>;
}

export class TabConcrete implements Tab {
    private static idIncrement = 1;
    id: number;
    tabItems: Array<TabItem>;

    constructor(tabItems: Array<TabItem>) {
        this.id = TabConcrete.idIncrement++;
        this.tabItems = tabItems;
    }

    addTabItem(tabItem: TabItem): Array<TabItem> {
        if (tabItem instanceof TabItemConcrete) {
            this.tabItems.push(tabItem);
        }
        return this.tabItems;
    }
}
