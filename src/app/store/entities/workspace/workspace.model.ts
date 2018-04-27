import { Workspace } from './workspace.model';
import { TabItem } from './tabItem.model';
import { Tab } from './tab.model';

export interface Workspace {
    id: number;
    primaryTab: Tab;
    secondaryTab: Tab;
    getTab(keyWord: string): Tab;
}

export class WorkspaceConcrete implements Workspace {
    private static idIncrement = 3;
    id: number;
    primaryTab: Tab;
    secondaryTab: Tab;

    constructor(primaryTab: Tab, secondaryTab: Tab) {
        this.id = WorkspaceConcrete.idIncrement++;
        this.primaryTab = primaryTab;
        this.secondaryTab = secondaryTab;
    }

    getTab(keyWord: string): Tab {
        switch (keyWord) {
            case 'primary':
                return <Tab> this.primaryTab;
            default:
                return <Tab> this.secondaryTab;
        }
    }
}
