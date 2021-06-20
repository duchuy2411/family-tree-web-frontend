import _, { result } from "lodash";
import moment from "moment";
import { DAY_OF_WEEK } from "../../utils/const";

const mapRepeat = [
  { value: 7, unit: 'day' },
  { value: 1, unit: 'month' },
  { value: 1, unit: 'year' },
]
class UtilCalendar {
  formatApi(data) {
    const event = [];
    _.forEach(data, (ele) => {
      if (Object.prototype.hasOwnProperty.call(ele, "followingEvents")) {
      }
      if (Object.prototype.hasOwnProperty.call(ele, "eventExceptions")) {
      }
    });
    return event;
  }

  rangeOriginEvent = (object, repeat, startDate, endDate) => {
    const results = [];
    let curStartDate = _.get(object, "startDate");
    let curEndDate = _.get(object, "endDate");
    while (moment(curEndDate).isBefore(endDate, 'day')) {
      const format = object;
      delete format.followingEvents;
      delete format.eventExceptions;
      format.startDate = moment(curStartDate);
      format.endDate = moment(curEndDate);
      results.push(format);
      const getRepeat = mapRepeat[repeat];
      curStartDate = moment(event.startDate).add(getRepeat.value, getRepeat.unit);
      curEndDate = moment(event.endDate).add(getRepeat.value, getRepeat.unit);
    }
    return results;
  };

  getException = (object) => {
    const results = [];
    const exceptions = _.get(object, 'eventExceptions', []);
    if (exceptions.length === 0) return null;
    for (let i = 0; i < exceptions; i += 1) {
      const isCancelled = _.get(exceptions[i], 'isCancelled');
      const isRescheduled = _.get(exceptions[i], 'isRescheduled')
      if (isCancelled && !isRescheduled) {
        exceptions[i].typeReplace = 0;
        result.push(exceptions[i]);
      } else if (isCancelled && isRescheduled) {
        exceptions[i].typeReplace = 2;
        results.push(exceptions[i]);
        continue;
      } else {
        exceptions[i].typeReplace = 1;
        results.push(exceptions[i]);
      }
    }
  };

  isSameWeek(firstDay, secondDay, offset) {
    var firstMoment = moment(firstDay);
    var secondMoment = moment(secondDay);

    var startOfWeek = function (_moment, _offset) {
        return _moment.add("days", _moment.weekday() * -1 + (_moment.weekday() >= 7 + _offset ? 7 + _offset : _offset));
    }

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

  replaceException(startDate, exceptions, repeat) {
    if (repeat === 0) return;
    for (let i = 0; i < exceptions.length; i += 1) {
      if (repeat === 1 && this.isSameWeek(exceptions[i].startDate, startDate)) {
        if (exceptions[i].typeReplace === 0 || exceptions[i].typeReplace === 2) return null;
        if (exceptions[i].typeReplace === 1) return exceptions[i];
      } else if (repeat === 2 && this.isSameMonth(exceptions[i].startDate, startDate)) {
        if (exceptions[i].typeReplace === 0 || exceptions[i].typeReplace === 2) return null;
        if (exceptions[i].typeReplace === 1) return exceptions[i];
      } else if (repeat === 3 && this.isSameYear(exceptions[i].startDate, startDate)) {
        if (exceptions[i].typeReplace === 0 || exceptions[i].typeReplace === 2) return null;
        if (exceptions[i].typeReplace === 1) return exceptions[i];
      } else {
        return true;
      }
    } 
  }

  checkEventFollowing = (object, repeat, startDate, endDate) => {
    const results = [];
    const repeat = _.get(object, "repeat", 0);
    const followingEvent = _.get(object, "followingEvents", []);
    if (followingEvent.length === 0) return null;
    for (let i = 0; i < followingEvent.length; i += 1) {
      const flwStartDate = _.get(followingEvent, "startDate"); // event from data
      const flwEndDate = _.get(followingEvent, "endDate");
      let curStartDate = moment(flwStartDate);
      let curEndDate = moment(flwEndDate);
      let exceptions = [];
      if (_.get(object, "eventExceptions", []).length > 0) {
        exceptions = this.getException(_.get(object, "eventExceptions", []));
      }
      while (moment(curEndDate).isBefore(endDate, "day")) {
        const event = followingEvent[i];
        event.startDate = moment(curStartDate);
        event.endDate = moment(curEndDate);
        const replace = this.replaceException(event.startDate, exceptions, repeat);
        if (replace !== null) results.push(replace);
        const getRepeat = mapRepeat[repeat];
        curStartDate = moment(event.startDate).add(getRepeat.value, getRepeat.unit);
        curEndDate = moment(event.endDate).add(getRepeat.value, getRepeat.unit);
      }
    }
    return results;
  };

}

export default new UtilCalendar();
