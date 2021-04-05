const mongoose  = require("mongoose");
const Schema  = mongoose.Schema;

const StudySchema = new Schema({
  semester:String,
  code:String,
  subjects: {
    sub1:{
        value:String,
        materials:{
          notes:String,
          pdf:String
        }
    },
    sub2:{
        value:String,
        materials:{
          notes:String,
          pdf:String
        }
    },
    sub3:{
        value:String,
        materials:{
          notes:String,
          pdf:String
        }
    },
    sub4:{
        value:String,
        materials:{
          notes:String,
          pdf:String
        }
    },
    sub5:{
        value:String,
        materials:{
          notes:String,
          pdf:String
        }
    },
    sub6:{
        value:String,
        materials:{
          notes:String,
          pdf:String
        }
    }
}
});

const studyMaterial = mongoose.model('StudyMaterial',StudySchema);

module.exports = studyMaterial;