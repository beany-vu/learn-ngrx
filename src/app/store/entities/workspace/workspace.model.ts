import { TabItem } from './tabItem.model';
import { Tab } from './tab.model';

export interface Workspace {
    id: number;
    primaryTab: Array<Tab>;
    secondaryTab: Array<Tab>;
}
