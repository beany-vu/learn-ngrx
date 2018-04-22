import { TabItem } from './tabItem.model';

export interface Tab {
    id: number;
    tabItems: Array<TabItem>;
}

export class TabConcrete implements Tab {
    private static idIncrement = 1;
    id: number;
    tabItems: Array<TabItem>;

    constructor(tabItems: Array<TabItem>) {
        this.id = TabConcrete.idIncrement++;
        this.tabItems = tabItems;
    }

}