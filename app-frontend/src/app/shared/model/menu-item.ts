import { Action } from './enum/action';

type Props = {
    title: string;
    action: Action;
    group: string;
    icon: JSX.Element;
    show: boolean;
    actionAdornment?: string;
};

export class MenuItem {
    title: string;
    action: Action;
    group: string;
    icon: JSX.Element;
    actionAdornment?: string;
    show: boolean;

    constructor({ title, action, group, icon, show, actionAdornment }: Props) {
        this.title = title;
        this.action = action;
        this.group = group;
        this.icon = icon;
        this.show = show;
        this.actionAdornment = actionAdornment;
    }
}
