import XDate from 'xdate';
import React from 'react';
import { Theme } from '../types';
import { CalendarProps } from '../calendar';
export declare type CalendarListItemProps = CalendarProps & {
    item: any;
    calendarWidth?: number;
    calendarHeight?: number;
    horizontal?: boolean;
    theme?: Theme;
    scrollToMonth?: (date: XDate) => void;
};
declare const CalendarListItem: React.MemoExoticComponent<(props: CalendarListItemProps) => JSX.Element>;
export default CalendarListItem;
