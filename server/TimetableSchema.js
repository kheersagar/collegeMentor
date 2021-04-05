const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const timeTableSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    time:{
        time1: String,
        time2: String,
        time3: String,
        time4: String,
        time5: String,
        time6: String,
        time7: String,
        time8: String,
        time9: String,
        time10: String
    },
    monday_class:{
        mondayClass1: String,
        mondayClass2: String,
        mondayClass3: String,
        mondayClass4: String,
        mondayClass5: String,
        mondayClass6: String,
        mondayClass7: String,
        mondayClass8: String,
        mondayClass9: String,
        mondayClass10: String
    },
    tuesday_class:{
        tuesdayClass1: String,
        tuesdayClass2: String,
        tuesdayClass3: String,
        tuesdayClass4: String,
        tuesdayClass5: String,
        tuesdayClass6: String,
        tuesdayClass7: String,
        tuesdayClass8: String,
        tuesdayClass9: String,
        tuesdayClass10: String
    },
    wednesday_class:{
        wednesdayClass1: String,
        wednesdayClass2: String,
        wednesdayClass3: String,
        wednesdayClass4: String,
        wednesdayClass5: String,
        wednesdayClass6: String,
        wednesdayClass7: String,
        wednesdayClass8: String,
        wednesdayClass9: String,
        wednesdayClass10: String
    },
    thrusday_class:{
        thrusdayClass1: String,
        thrusdayClass2: String,
        thrusdayClass3: String,
        thrusdayClass4: String,
        thrusdayClass5: String,
        thrusdayClass6: String,
        thrusdayClass7: String,
        thrusdayClass8: String,
        thrusdayClass9: String,
        thrusdayClass10: String
    },
friday_class:{
    fridayClass1: String,
    fridayClass2: String,
    fridayClass3: String,
    fridayClass4: String,
    fridayClass5: String,
    fridayClass6: String,
    fridayClass7: String,
    fridayClass8: String,
    fridayClass9: String,
    fridayClass10: String
},
saturday_class:{
    saturdayClass1: String,
    saturdayClass2: String,
    saturdayClass3: String,
    saturdayClass4: String,
    saturdayClass5: String,
    saturdayClass6: String,
    saturdayClass7: String,
    saturdayClass8: String,
    saturdayClass9: String,
    saturdayClass10: String
}

})

const timetable = mongoose.model("TimeTable",timeTableSchema);

module.exports= timetable;