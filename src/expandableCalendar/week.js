import React, { useRef, useMemo } from 'react';
import { View } from 'react-native';
import { getPartialWeekDates, getWeekDates, sameMonth } from '../dateutils';
import { parseDate, toMarkingFormat } from '../interface';
import { getState } from '../day-state-manager';
import { extractComponentProps } from '../componentUpdater';
import styleConstructor from './style';
import Calendar from '../calendar';
import Day from '../calendar/day/index';
const Week = (props) => {
    const { theme, current, firstDay, hideExtraDays, markedDates, onDayPress, style: propsStyle, numberOfDays = 1, timelineLeftInset } = props;
    const style = useRef(styleConstructor(theme));
    const getWeek = (date) => {
        if (date) {
            return getWeekDates(date, firstDay);
        }
    };
    // renderWeekNumber (weekNumber) {
    //   return <BasicDay key={`week-${weekNumber}`} theme={this.props.theme} marking={{disableTouchEvent: true}} state='disabled'>{weekNumber}</BasicDay>;
    // }
    const renderDay = (day, id) => {
        const dayProps = extractComponentProps(Day, props);
        const currXdate = parseDate(current);
        // hide extra days
        if (current && hideExtraDays) {
            if (!sameMonth(day, currXdate)) {
                return <View key={id} style={style.current.emptyDayContainer}/>;
            }
        }
        return (<View style={style.current.dayContainer} key={id}>
        <Day {...dayProps} date={toMarkingFormat(day)} state={getState(day, currXdate, props)} marking={markedDates?.[toMarkingFormat(day)]} onPress={onDayPress} onLongPress={onDayPress}/>
      </View>);
    };
    const renderWeek = () => {
        const dates = numberOfDays > 1 ? getPartialWeekDates(current, numberOfDays) : getWeek(current);
        let week = [];
        if (dates) {
            dates.forEach((day, id) => {
                week.push(renderDay(day, id));
            }, this);
        }
        // if (this.props.showWeekNumbers) {
        //   week.unshift(this.renderWeekNumber(item[item.length - 1].getWeek()));
        // }
        const todayIndex = dates?.indexOf(parseDate(new Date())) || -1;
        if (numberOfDays > 1 && todayIndex > -1) {
            week = week.slice(todayIndex, numberOfDays);
        }
        return week;
    };
    const partialWeekStyle = useMemo(() => {
        return [style.current.partialWeek, { paddingLeft: timelineLeftInset }];
    }, [timelineLeftInset]);
    return (<View style={style.current.container}>
      <View style={[style.current.week, numberOfDays > 1 ? partialWeekStyle : undefined, propsStyle]}>{renderWeek()}</View>
    </View>);
};
export default Week;
Week.displayName = 'Week';
Week.propTypes = {
    ...Calendar.propTypes
};
