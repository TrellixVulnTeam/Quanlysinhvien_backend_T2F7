const { type } = require("express/lib/response");

  
  let data = [
    {
        _id: "6280a8673a909b59862a0ad2",
        course_id: "627e72a3a7cd236cfc3f0482",
        total_lesson: 0,
        schedule: [
            {
                start: 1,
                end: 2,
                Date: "15-5-2022",
                Checked_in: [1]
            },
            {
                start: 3,
                end: 4,
                Date: "20-5-2022",
                Checked_in: []
            }
        ],
        students_detail: [
            {
                user_id: "627f1a36da1f15394c81a60b",
                check_point: 0,
                _id: "6280a8673a909b59862a0ad3"
            },
            {
                user_id: "627f1aabd1b7269f94423ada",
                check_point: 0,
                _id: "6280a8673a909b59862a0ad4"
            }
        ],
        __v: 0
    }
]
  
var resultObject = data[0].schedule.find( o => o.Date === '15-5-2022' && o.start === 1  )
resultObject.Checked_in.find(id => id === 1)
  console.log(resultObject);
  console.log(typeof(resultObject))

  // node test3.js