import _ from 'lodash';

class Adapter {

  parse (data) {
    const results = data.map((ele, index) => { 
      const member = {
        key: ele.id,
        n: ele.firstName + ele.lastName,
        s: ele.gender === 0 ? 'M' : 'F',
        dob: ele.dateOfBirth,
        dod: ele.dateOfDead,
        note: ele.note,
        f: _.get(ele, 'parent1Id', null),
        m: _.get(ele, 'parent2Id', null),
      };
      ele.spouses.forEach(element => {
        console.log(element)
        if (ele.gender === 0) {
          console.log(element.id)
          const arr = _.get(member, 'ux') || [];
          console.log("arr: ", arr);
          _.set(member, 'ux', arr);
          member.ux.push(element.id);
        } else {
          console.log(element.id)
          const arr = _.get(member, 'vir') || [];
          console.log("arr: ", arr);
          _.set(member, 'vir', arr);
          member.vir.push(element.id);
        }
      });
    console.log("member:", member);
    return member;
    }
    );
    return results;
  }
}

export default new Adapter();