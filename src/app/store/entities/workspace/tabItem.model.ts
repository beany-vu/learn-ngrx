export interface TabItem {
    id: number;
    name: string;
    href: string;
    classList: Set<string>;
}

export class TabItemConcrete implements TabItem {
    private static idIncrement = 1;
    id: number;
    name: string;
    href: string;
    classList: Set<string>;
    constructor(name: string, href: string, classList: Set<string>) {
        this.id = TabItemConcrete.idIncrement++;
        this.name = name;
        this.href = href;
        this.classList = classList;
    }
}
