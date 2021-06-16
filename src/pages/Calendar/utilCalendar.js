import _ from "lodash";
import moment from "moment";
import { DAY_OF_WEEK } from "../../utils/const";

class UtilCalendar {
  formatApi(data) {
    const event = [];
    _.forEach(data, (ele) => {
      // if (ele?.hasOwnProperty("followingEvents")) {
      if (Object.prototype.hasOwnProperty.call(ele, "followingEvents")) {
        const followingEvents = _.get(ele, "followingEvents", []);
        for (let i = 0; i < followingEvents.length; i += 1) {
          event.push({
            id: _.get(followingEvents[i], "id"),
            parentId: _.get(followingEvents[i], "parentId", -1),
            type: "following",
            title: _.get(followingEvents[i], "note"),
            start: _.get(followingEvents[i], "startDate", null),
            end: _.get(followingEvents[i], "endDate", null),
            repeat: _.get(followingEvents[i], ""),
          });
        }
      } else {
        event.push({
          id: _.get(ele, "id"),
          type: "normal",
          familyTreeId: _.get(ele, "familyTreeId"),
          title: _.get(ele, "note", ""),
          start: _.get(ele, "startDate", null),
          end: _.get(ele, "endDate", null),
        });
      }
      // if (ele.hasOwnProperty("eventExceptions")) {
      if (Object.prototype.hasOwnProperty.call(ele, "eventExceptions")) {
        //
      }
    });
    return event;
  }

  getRepeat(data, thisTime) {
    const newArr = [];
    data.forEach((ele) => {
      const getRepeat = _.get(ele, "repeat", -1);
      const cur = _.get(ele, "startDate");
      switch (getRepeat) {
        case 1: {
          const getDayOfWeek = _.get(DAY_OF_WEEK, `${moment(cur).weekday()}`);
          const weekday = moment(thisTime).startOf("month").day(`${getDayOfWeek}`);
          if (weekday.date() > 7) weekday.add(7, "day");
          let month = weekday.month();
          while (month === weekday.month()) {
            newArr.push(weekday);
            weekday.add(7, "d");
          }
          break;
        }
        case 2: {
          const newDate = new Date(
            moment(thisTime).year(),
            moment(thisTime).month(),
            moment(cur).date()
          );
          newArr.push(newDate);
          break;
        }
        case 3: {
          const newDate = new Date(
            moment(thisTime).year(),
            moment(cur).month(),
            moment(cur).date()
          );
          newArr.push(newDate);
          break;
        }
      }
    });
    return newArr;
  }
}

export default new UtilCalendar();
