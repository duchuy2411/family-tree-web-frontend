import _, { get, range, result } from "lodash";
import moment from "moment";

const mapRepeat = [
  { value: 7, unit: "day" },
  { value: 1, unit: "month" },
  { value: 1, unit: "year" },
];
class UtilCalendar {

  init(calendar, startDate, endDate) {
    let results = [];
    for (let i = 0; i < calendar.length; i += 1) {
      const repeat = _.get(calendar[i], "repeat", 0);
      if (repeat === 0) {
        if (calendar[i].eventExceptions.length === 0 ||
          (calendar[i].eventExceptions.length > 0 && this.checkNotCancel(calendar[i].startDate, calendar[i].eventExceptions, 0)))
        {
          results.push(calendar[i]);
        }
      }
      if (repeat > 0 && calendar[i].followingEvents.length > 0) {
        const stopDate = _.get(calendar[i], "followingEvents.0.startDate");
        const attachment = _.pick(calendar[i], ["id", "parentId", "note", "reminderOffest", "repeat"]);
        const range = this.rangeRepeat(calendar[i].startDate, calendar[i].endDate, moment(stopDate), repeat, attachment);
        const compareException = this.compareException(calendar[i], range);
        results = _.concat(results, compareException);
      } else if (repeat > 0) {
        const attachment = _.pick(calendar[i], ["id", "note", "reminderOffest", "repeat"]);
        const range = this.rangeRepeat(calendar[i].startDate, calendar[i].endDate, moment(endDate), repeat, attachment);
        results = _.concat(results, range);
      }
    }
    return results;
  }

  getException = (exceptions) => {
    const isCancelled = _.get(exceptions, "isCancelled");
    const isRescheduled = _.get(exceptions, "isRescheduled");
    if (isCancelled && !isRescheduled) {
      exceptions.typeReplace = "cancel";
    } else if (isCancelled && isRescheduled) {
      exceptions.typeReplace = "cancel-reschedule";
    } else {
      exceptions.typeReplace = "reschedule";
    }
    return exceptions;
  };

  isSameWeek(firstDay, secondDay, offset) {
    var firstMoment = moment(firstDay);
    var secondMoment = moment(secondDay);

    var startOfWeek = function (_moment, _offset) {
      return _moment.add(
        "days",
        _moment.weekday() * -1 + (_moment.weekday() >= 7 + _offset ? 7 + _offset : _offset)
      );
    };

    return startOfWeek(firstMoment, offset).isSame(startOfWeek(secondMoment, offset), "day");
  }

  isSameMonth(firstDay, secondDay) {
    const monthFirstDay = moment(firstDay).month();
    const yearFirstDay = moment(firstDay).year();
    const monthSecondDay = moment(secondDay).month();
    const yearSecondDay = moment(secondDay).year();
    return yearFirstDay === yearSecondDay && monthFirstDay === monthSecondDay;
  }

  isSameYear(firstDay, secondDay) {
    const yearFirstDay = moment(firstDay).year();
    const yearSecondDay = moment(secondDay).year();
    return yearFirstDay === yearSecondDay;
  }

  checkNotCancel(event, exceptions, repeat, attachment = {}) {
    const startDate = _.get(event, "startDate");
    const getException = _.map(exceptions, ele => this.getException(ele));
    for (let i = 0; i < getException.length; i += 1) {
      switch (repeat) {
      case 0: {
        if (getException[i].typeReplace !== "reschedule") return true;
        break;
      }
      case 1: {
        if (this.isSameWeek(getException[i].startDate, startDate, 0) && getException[i].typeReplace !== "reschedule") {
          return true;
        }
        break;
      }
      case 2: {
        if (this.isSameMonth(getException[i].startDate, startDate) && getException[i].typeReplace !== "reschedule") {
          return true;
        }
        break;
      }
      case 3: {
        if (this.isSameYear(getException[i].startDate, startDate) && getException[i].typeReplace !== "reschedule") {
          return true;
        }
        break;
      }
      }
    }
    return false;
  }

  mapSchedule (exceptions, attachment = {}) {
    let result = [];
    const getException = _.map(exceptions, ele => this.getException(ele));
    for (let i = 0; i < getException.length; i += 1) {
      if (getException[i].typeReplace === "reschedule") result.push(getException[i]);
    }
    return result;
  }

  rangeRepeat = (curDateStart, curDateEnd, stopDate, repeat, attachment = {}) => {
    let rangeDate = curDateStart;
    let rangeDateEnd = curDateEnd;
    let results = [];
    const getRepeat = mapRepeat[repeat - 1];
    while (moment(rangeDate).isBefore(stopDate, getRepeat.unit)) {
      results.push({ startDate: moment(rangeDate).format("YYYY-MM-DD"), endDate: moment(rangeDateEnd).format("YYYY-MM-DD"), ...attachment });
      rangeDate = moment(rangeDate).add(getRepeat.value, getRepeat.unit);
      rangeDateEnd = moment(rangeDateEnd).add(getRepeat.value, getRepeat.unit);
    }
    return results;
  };

  compareException = (data, rangeRepeat) => {
    const exceptions = _.get(data, "eventExceptions", []);
    if (exceptions.length === 0) return rangeRepeat;
    const repeat = _.get(data, "repeat", 0);
    const result = [];
    _.forEach(rangeRepeat, ele => {
      if (this.checkNotCancel(ele, exceptions, repeat)) {
        result.push(ele);
      }
    });
    return result.concat(this.mapSchedule(exceptions));
  }
}

export default new UtilCalendar();
