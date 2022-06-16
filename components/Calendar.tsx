import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import styles from "styles/components/Calendar.module.scss";
import { Button } from "components";
import classNames from "classnames";

const today = new Date();

const _schedule = [
    {
        date: today,
        events: [
            {
                id: "1",
                time: "9:00 - 9:40",
                title: "Приветствие",
                color: "#2751F2",
            },
            {
                id: "2",
                time: "9:50 - 10:30",
                title: "Приветствие",
                color: "#D92EC9",
            },
            {
                id: "3",
                time: "14:00 - 15:40",
                title: "Приветствие",
                color: "#00A875",
            },
            {
                id: "4",
                time: "16:10 - 18:00",
                title: "Приветствие",
                color: "#00A875",
            },
        ]
    }
];

enum DayName {
    Monday = 0,
    Tuesday = 1,
    Wednesday = 2,
    Thursday = 3,
    Friday = 4,
    Saturday = 5,
    Sunday = 6,
}

enum MonthName {
    January = 0,
    February = 1,
    March = 2,
    April = 3,
    May = 4,
    June = 5,
    July = 6,
    August = 7,
    September = 8,
    October = 9,
    November = 10,
    December = 11,
}

declare global {
    interface Date {
        GetFirstDayOfWeek(): Date,
        GetLastDayOfWeek(): Date,
        GetWeekDay(weekday): Date,
    }
}

Date.prototype.GetFirstDayOfWeek = function () {
    const date = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    return (new Date(date.setDate(date.getDate() - date.getDay() + (date.getDay() == 0 ? -6 : 1))));
}
Date.prototype.GetLastDayOfWeek = function () {
    const date = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    return (new Date(date.setDate(date.getDate() - date.getDay() + (date.getDay() == 0 ? 0 : 7))));
}
Date.prototype.GetWeekDay = function (weekday) {
    const date = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    const day = this.getDay();
    return new Date(date.setDate(date.getDate() - day + (day == 0 ? -6 : 1) + weekday));
}

function daysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
}

function getDayOfWeek(day: number, month: number, year: number) {
    const dayOfWeek = new Date(year, month, day).getDay();
    return dayOfWeek === 0 ? 7 : dayOfWeek;
}

function opacityColor(color: string, factor: number) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${factor})`;
}


export default function Calendar() {
    const [whole, setWhole] = useState(false);
    const [mode, setMode] = useState("month");
    const [date, setDate] = useState(today);
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    Calendar
                </div>
                <div className={styles.headerRight}>
                    <Button label={whole ? "⟵ Back" : "Whole calender"} size="large" variant={whole ? "text" : "fill"} onClick={() => { setWhole(!whole) }} />
                </div>
            </div>
            {whole ? (
                <div className={styles.calendar}>
                    <div className={styles.modeSelect}>
                        <div className={classNames(styles.modeSelectItem, { [styles.selectedMode]: mode === "month" })} onClick={() => { setMode("month") }}>
                            Month
                        </div>
                        <div className={classNames(styles.modeSelectItem, { [styles.selectedMode]: mode === "week" })} onClick={() => { setMode("week") }}>
                            Week
                        </div>
                        <div className={classNames(styles.modeSelectItem, { [styles.selectedMode]: mode === "day" })} onClick={() => { setMode("day") }}>
                            Day
                        </div>
                    </div>
                    <div className={styles.calendarHeader}>
                        <div className={styles.datePeriod}>
                            {mode === "month" && `${MonthName[date.getMonth()]}, ${date.getFullYear()}`}
                            {mode === "week" && `${date.GetFirstDayOfWeek().getDate()} - ${date.GetLastDayOfWeek().getDate()} ${MonthName[date.GetLastDayOfWeek().getMonth()]}, ${date.GetLastDayOfWeek().getFullYear()}`}
                            {mode === "day" && `${date.getDate()} ${MonthName[date.getMonth()]}, ${date.getFullYear()}`}
                        </div>

                        <div className={styles.calendarControls}>
                            <ReactSVG
                                src="/images/icons/paginator/prev.svg"
                                className={styles.paginationBtn}
                                onClick={() => { 
                                    if (mode === "month") {
                                        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
                                    }
                                    if (mode === "week") {
                                        setDate(new Date(date.GetFirstDayOfWeek().getFullYear(), date.GetFirstDayOfWeek().getMonth(), date.GetFirstDayOfWeek().getDate() - 7));
                                    }
                                    if (mode === "day") {
                                        setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1));
                                    }
                                }}
                            />
                            <ReactSVG
                                src="/images/icons/paginator/next.svg"
                                className={styles.paginationBtn}
                                onClick={() => { 
                                    if (mode === "month") {
                                        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
                                    }
                                    if (mode === "week") {
                                        setDate(new Date(date.GetLastDayOfWeek().getFullYear(), date.GetLastDayOfWeek().getMonth(), date.GetLastDayOfWeek().getDate() + 7));
                                    }
                                    if (mode === "day") {
                                        setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1));
                                    }
                                }}
                            />
                        </div>
                        <div className={styles.whiteSpace} />
                        <Button label="Add" size="large" variant="fill" onClick={() => { }} />
                    </div>
                    {mode === "month" && (
                        <MonthView date={date} schedule={_schedule} />
                    )}
                    {mode === "week" && (
                        <WeekView date={date} schedule={_schedule} />
                    )}
                    {mode === "day" && (
                        <DayView date={date} schedule={_schedule} />
                    )}
                </div>
            ) : (
                <div className={styles.calendar}>
                    <div className={styles.calendarHeader}>
                        <div className={styles.datePeriod}>
                            17-20 June, 2022
                        </div>
                        <div className={styles.calendarControls}>
                            <ReactSVG
                                src="/images/icons/paginator/prev.svg"
                                className={styles.paginationBtn}
                                onClick={() => { }}
                            />
                            <ReactSVG
                                src="/images/icons/paginator/next.svg"
                                className={styles.paginationBtn}
                                onClick={() => { }}
                            />
                        </div>
                    </div>
                    <div className={styles.calendarBody}>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div className={classNames(styles.smallDay, { [styles.today]: i === 0 })}>
                                <div className={styles.dayHeader}>
                                    <div className={styles.dayString}>
                                        {DayName[i]}
                                    </div>
                                    <div className={styles.dayDate}>
                                        {17 + i}
                                    </div>
                                </div>
                                <div className={styles.dayBody}>
                                    <TimeSlot label="12:00-13:00" />
                                    <TimeSlot label="13:00-14:00" />
                                    <TimeSlot label="14:00-15:00" />
                                    <TimeSlot label="15:00-16:00" />
                                    <Button label="+ Add" size="medium" variant="outline" className={styles.addTimeSlot} />
                                </div>
                            </div>))}
                    </div>
                </div>)}
        </div>);
}

interface TimeSlotProps {
    label?: string;
}

function TimeSlot({ label }: TimeSlotProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className={styles.dayTimeSlot} onClick={() => setIsOpen(!isOpen)}>
                <div className={classNames(styles.popover, { [styles.popoverOpen]: isOpen })}>
                    <div className={styles.popoverAction}>
                        <ReactSVG
                            src="/images/icons/cards/edit.svg"
                            className={styles.iconContainer}
                        />
                        <span>Edit</span>
                    </div>
                    <div className={styles.popoverAction}>
                        <ReactSVG
                            src="/images/icons/cards/delete.svg"
                            className={styles.iconContainer}
                        />
                        <span>Delete</span>
                    </div>
                </div>
                {label}
            </div>
        </>
    );
}

interface Event {
    id: string;
    time: string;
    title: string;
    color: string;
}

interface Schedule {
    date: Date;
    events: Event[];
}

interface ViewProps {
    date: Date;
    schedule?: Schedule[];
}

function MonthView({ date, schedule = [] }: ViewProps) {
    const [days, setDays] = useState<React.ReactNode[] | null>(null);
    const [events, setEvents] = useState<React.ReactNode[] | null>(null);
    const [positions, setPositions] = useState(null);
    function configureDays() {
        const daysCount = daysInMonth(date.getMonth(), date.getFullYear());
        const days = [];
        const position = {};
        for (let i = 0; i < 7; i++) {
            days.push(<DayHeader title={DayName[i]} className={i === 0 ? styles.left : i === 6 ? styles.right : null} />)
        }
        let row = 2;
        for (let i = 1; i <= daysCount; i++) {
            const column = getDayOfWeek(i, date.getMonth(), date.getFullYear());
            position[i] = { row, column };
            days.push(
                <Day
                    key={`d${i}`}
                    number={i}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: row,
                        gridRowEnd: row + 1
                    }} />);
            if (column === 7) {
                row++;
            }
        }

        const prevDaysCount = getDayOfWeek(1, date.getMonth(), date.getFullYear()) - 1;
        const prevMonthDays = daysInMonth(date.getMonth() - 1, date.getFullYear());
        for (let i = prevMonthDays; i > prevMonthDays - prevDaysCount; i--) {
            const column = getDayOfWeek(i, date.getMonth() - 1, date.getFullYear());
            position[-i] = { row: 2, column };
            days.unshift(
                <Day
                    key={`dp${i}`}
                    number={i}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: 2,
                        gridRowEnd: 3
                    }} />);
        }

        const nextDaysCount = 7 - getDayOfWeek(daysCount, date.getMonth(), date.getFullYear());
        for (let i = 1; i <= nextDaysCount; i++) {
            const column = getDayOfWeek(i, date.getMonth() + 1, date.getFullYear());
            position[`future${i}`] = {
                row,
                column
            }
            days.push(
                <Day
                    key={`df${i}`}
                    number={i}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: row,
                        gridRowEnd: row + 1
                    }}
                />
            );
        }
        setPositions(position);
        setDays(days);
    }

    function configureEvents() {
        const events = schedule.filter((day) => day.date.getMonth() === date.getMonth()).map(({ date, events }) => {
            return <div
                className={styles.eventContainer}
                key={`e${date.getDate()}`}
                style={{
                    gridColumnStart: positions[date.getDate()].column,
                    gridColumnEnd: positions[date.getDate()].column + 1,
                    gridRowStart: positions[date.getDate()].row,
                    gridRowEnd: positions[date.getDate()].row + 1,
                }}
            >
                {events.map((event, index) => {
                    if (index > 2)
                        return null;
                    return <Event
                        key={`e${index}`}
                        style={{
                            backgroundColor: opacityColor(event.color, 0.05),
                            borderLeft: `3px solid ${event.color}`,
                        }}
                        title={event.time}
                        id={event.id}
                    />
                })}
                {events.length > 2 && <div className={styles.moreEvents}>
                    <ReactSVG src="/images/icons/calendar/more.svg" className={styles.iconContainer} />
                </div>}
            </div>
        })
        setEvents(events);
    }

    useEffect(() => {
        configureDays();
    }, [date]);
    useEffect(() => {
        if (!positions)
            return;
        configureEvents();
    }, [schedule, positions]);

    return (
        <div className={styles.monthView}>
            {days}
            {events}
        </div>
    );
}

function WeekView({ date, schedule = [] }: ViewProps) {
    const [hours, setHours] = useState<React.ReactNode[]>();
    const [events, setEvents] = useState<React.ReactNode[]>();
    const [linesV, setLinesV] = useState<React.ReactNode[]>();

    function configureHours() {
        const hours = [];
        let hour = 0;
        for (let i = 0; i < 1440; i += 60) {
            hours.push(
                <Hour
                    key={`h${i}`}
                    number={hour++}
                    style={{
                        gridColumnStart: 1,
                        gridColumnEnd: 1,
                        gridRowStart: i + 1,
                        gridRowEnd: i + 60
                    }}
                />
            )
        }
        setHours(hours);
    }

    function configureEvents() {
        const events = schedule.map((day) => {
            // destructure like this to prevent variable name conflicts
            const events = day.events;
            const dayDate = day.date
            if (((dayDate.getTime() >= date.GetFirstDayOfWeek().getTime()) && (dayDate.getTime() <= date.GetLastDayOfWeek().getTime()))) {
                const column = (dayDate.getDay() === 0 ? 7 : dayDate.getDay()) + 1;
                return events.map((event, index) => {
                    const hourMinutes = event.time.split(':');
                    return <Event
                        key={`e${index}`}
                        style={{
                            gridColumnStart: column,
                            gridColumnEnd: column + 1,
                            gridRowStart: parseInt(hourMinutes[0]) * 60 + parseInt(hourMinutes[1]) > 0 ? parseInt(hourMinutes[0]) * 60 + parseInt(hourMinutes[1]) : 1,
                            gridRowEnd: (parseInt(hourMinutes[0]) * 60 + parseInt(hourMinutes[1])) + 42,
                            backgroundColor: opacityColor(event.color, 0.05),
                            borderLeft: `3px solid ${event.color}`,
                            color: event.color,
                            height: 'auto'
                        }}
                        title={event.title}
                        time={event.time}
                        id={event.id}
                    />
                })
            }
        })
        setEvents(events);
    }

    useEffect(() => {
        const linesV = [];
        for (let i = 1; i < 9; i++) {
            linesV.push(
                <div
                    key={`l${i}`}
                    className={styles.line}
                    style={{
                        gridColumnStart: i,
                        gridColumnEnd: i + 1,
                        gridRowStart: 1,
                        gridRowEnd: 1440,
                        backgroundColor: i > 1 && "#fff"
                    }}
                />
            )
        }
        setLinesV(linesV);
    }, [])

    useEffect(() => {
        configureHours();
        configureEvents();
    }, [date, schedule])

    return (
        <div>
            <div className={styles.weekHeader}>
                <span />
                <span className={styles.dayInWeek}>
                    <span>Mon</span>
                    <span className={styles.date}>{date.GetWeekDay(0).getDate()}</span>
                </span>
                <span className={styles.dayInWeek}>
                    <span>Tue</span>
                    <span className={styles.date}>{date.GetWeekDay(1).getDate()}</span>
                </span>
                <span className={styles.dayInWeek}>
                    <span>Wed</span>
                    <span className={styles.date}>{date.GetWeekDay(2).getDate()}</span>
                </span>
                <span className={styles.dayInWeek}>
                    <span>Thu</span>
                    <span className={styles.date}>{date.GetWeekDay(3).getDate()}</span>
                </span>
                <span className={styles.dayInWeek}>
                    <span>Fri</span>
                    <span className={styles.date}>{date.GetWeekDay(4).getDate()}</span>
                </span>
                <span className={styles.dayInWeek}>
                    <span>Sat</span>
                    <span className={styles.date}>{date.GetWeekDay(5).getDate()}</span>
                </span>
                <span className={styles.dayInWeek}>
                    <span>Sun</span>
                    <span className={styles.date}>{date.GetWeekDay(6).getDate()}</span>
                </span>
            </div>
            <div className={styles.weekContainer}>
                {hours}
                {events}
                {linesV}
            </div>
        </div>
    )
}

function DayView({ date, schedule }) {
    const [hours, setHours] = useState<React.ReactNode>();
    const [events, setEvents] = useState<React.ReactNode>();
    const [linesH, setLinesH] = useState<React.ReactNode>();

    function configureHours() {
        const hours = [];
        let hour = 0;
        for (let i = 0; i < 1440; i += 60) {
            hours.push(
                <Hour
                    key={`h${i}`}
                    number={hour++}
                    style={{
                        gridColumnStart: 1,
                        gridColumnEnd: 72,
                        gridRowStart: i + 1,
                        gridRowEnd: i + 60
                    }}
                />
            )
        }
        setHours(hours);
    }

    function configureEvents() {
        const events = schedule.map((day) => {
            // destructure like this to prevent variable name conflicts
            const events = day.events;
            const dayDate = day.date
            if (dayDate.getDate() == date.getDate()) {
                return events.map((event, index) => {
                    const [startTime, endTime] = event.time.split('-');
                    const hourMinutes = startTime.split(':');
                    const hourMinutesEnd = endTime.split(':');
                    return <Event
                        key={`e${index}`}
                        style={{
                            gridColumnStart: parseInt(hourMinutes[1]) > 0 ? parseInt(hourMinutes[1]) + 3 : 3,
                            gridColumnEnd: parseInt(hourMinutesEnd[0]) > parseInt(hourMinutes[0]) ? 70 : parseInt(hourMinutesEnd[1]),
                            gridRowStart: (parseInt(hourMinutes[0]) * 60 > 0 ? parseInt(hourMinutes[0]) * 60 : 1) + parseInt(hourMinutes[1]),
                            gridRowEnd: (parseInt(hourMinutesEnd[0]) * 60) + parseInt(hourMinutesEnd[1]),
                            backgroundColor: opacityColor(event.color, 0.05),
                            borderLeft: `3px solid ${event.color}`,
                            color: event.color,
                            height: 'auto'
                        }}
                        title={event.title}
                        time={event.time}
                        id={event.id}
                    />
                })
            }
        })
        setEvents(events);
    }

    useEffect(() => {
        const linesH = [];
        for (let i = 1; i < 25; i++) {
            linesH.push(
                <div
                    key={`l${i}`}
                    className={styles.lineB}
                    style={{
                        gridColumnStart: 2,
                        gridColumnEnd: 72,
                        gridRowStart: i * 60,
                        gridRowEnd: i + 60,
                    }}
                />
            )
        }
        setLinesH(linesH);
    }, [])

    useEffect(() => {
        configureHours();
        configureEvents()
    }, [date, schedule])

    return (
        <div>
            <div className={styles.dayHeader}>
                <span>{DayName[date.getDay()]}</span>
            </div>
            <div className={styles.dayContainer}>
                {hours}
                {events}
                {linesH}
                <div
                    className={styles.areaDay}
                    style={{
                        gridColumnStart: 2,
                        gridColumnEnd: 72,
                        gridRowStart: 1,
                        gridRowEnd: 1441,
                    }}
                />
            </div>
        </div>
    )
}

interface DayProps {
    number: number;
    style: React.CSSProperties;
}

interface EventProps {
    style: React.CSSProperties;
    title?: string;
    id: string;
    time?: string;
}

interface DayHeaderProps {
    title: string;
    className?: string;
}

function DayHeader({ title, className }: DayHeaderProps) {
    return (
        <div className={classNames(styles.dayHeader, className)}>
            {title.substring(0, 3)}
        </div>
    );
}

function Day({ number, ...props }: DayProps) {
    return <div className={styles.day} {...props}>
        <div className={styles.dayNumber}>
            {number}
        </div>
    </div>
}

function Event({ style, title, time, id }: EventProps) {
    return <div className={styles.event} style={style}>
        <div className={styles.eventTitle}>
            {title}
        </div>
        <div className={styles.eventTime}>
            {time}
        </div>
    </div>
}

function Hour({ number, ...props }) {
    return (
        <div
            className={styles.hour}
            {...props}
        >
            <span className={styles.hourNumber}>{`${number < 10 ? `0${number}` : number}:00`}</span>
        </div>
    )
}