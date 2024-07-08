const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI  ,
            {useNewUrlParser: true ,    // for 5.13.21  mongoose
                useUnifiedTopology: true ,     // for 5.13.21  mongoose
                useCreateIndex: true,    // for 5.13.21  mongoose
             }  
             )
        console.log("MongoDb Connected Succesfully - 127.0.0.1");
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit()
    }
}

module.exports = connectDB;























// const chatModel = mongoose.Schema({
//     name: { type: String, trim: true },
//     admin: { type: Boolean, default: false },
//     email: { type: String },
//     password: { type: String },
//     friends: {
//         type: Number,
//         validate(value) {      // custom validate
//             if (value < 0) {
//                 throw new Error("friend count cannot be negative")
//             }
//         }
//         // npm i validator only provides bane banaye functions eg: for email
//         // validate(value){      // custom validate
//         //     if (validator.isEmail(value)) {   // validator from require("validator")
//         //         throw new Error("Email is Invalid")
//         //     }
//         // }
//     }
// }
// )


// const ttchanel = mongoose.model("TTchannel", chatModel);


// const createDocument = async () => {

//     // const RahulDoc = new ttchanel({
//     //     name:"rahul vemra" , 
//     //     email: "rahul@gmail.com",
//     //     password : "password",
//     //     admin : false ,
//     //     surname : "pushpanjali" , 
//     //     flower : "chameli",
//     //     friends: 5
//     // })
//     // const SarmanDoc = new ttchanel({
//     //     name:"sarman patel" , 
//     //     email: "sarman@gmail.com",
//     //     password : "password",
//     //     admin : false,
//     //     friends: 55
//     // })
//     // const SatyamDoc = new ttchanel({
//     //     name:"satyam markam" , 
//     //     email: "satyam@gmail.com",
//     //     password : "password",
//     //     admin : true,
//     //     friends: 551
//     // })
//     // const RohitDoc = new ttchanel({
//     //     name:"rohit vemra" , 
//     //     email: "rohit@gmail.com",
//     //     password : "password",
//     //     admin : false,
//     //     friends: 200
//     // })

//     // const result = await ttchanel.insertMany([RohitDoc , RahulDoc , SarmanDoc , SatyamDoc  ] )

//     // NOTE :: insertOne is not a function in Node but in CMD ,  create() a not a function in CMD / PowerShell but in  NodeJS where we pass an object {} inside a create function create({})

//     // const result = await ttchanel.insertMany( [ {
//     //     name:"rohit vemra" , 
//     //     email: "rohit@gmail.com",
//     //     password : "password",
//     //     admin : true ,
//     //     surname : "pushpanjali" , 
//     //     flower : "chameli"
//     // } ,  {
//     //     name:"satyam markam" , 
//     //     email: "satyam@gmail.com",
//     //     password : "password",
//     //     admin : true
//     // } ,  {
//     //     name:"sarman patel" , 
//     //     email: "sarman@gmail.com",
//     //     password : "password",
//     //     admin : true
//     // } , {
//     //     name:"rahul vemra" , 
//     //     email: "rahul@gmail.com",
//     //     password : "password",
//     //     admin : true
//     // } ] )
//     // console.log(result);




//     // const result = await ttchanel.find({admin:false} , {name:1 , email:0 , _id:0} ).limit(3)  // error - select does not 0   only Id can be 0 ( _id:0)
//     // const result = await ttchanel.find({admin:false} ).select({name:1 ,  email:1 , password:0 }).limit(3)   // error - select does not 0   only Id can be 0 ( _id:0)
//     // const result = await ttchanel.find({admin:false} , {name:1 , email:1 , _id:0} ).limit(3)  
//     // const result = await ttchanel.find({admin:false} ).select("-password").limit(3)    // select is not a function in CMD / PowerShell
//     // const result = await ttchanel.find({admin:false} ).select("name"  ,"-password").limit(3)   // select Only takes One Argument
//     // const result = await ttchanel.find({admin:false} ).select({name:1 , _id:0 , email:1 }).limit(3)
//     // const result = await ttchanel.find({admin:false} ).select({name:1 , email:1 , password:1 }).limit(3)

//     //  Note ::  first argument in find is filter and second is projection. projection allows you to specify fields to return._id is the only field which you need to explicitly exclude in the projection. For all other fields you just need to state the inclusion.


//     // console.log(result);



//     // --------------- ::: Query and Projection Operators  ::: --------------
//     // Comparision Query operator  :::  -----------
//     // const result = await ttchanel.find({admin:false , friends: 55 } )
//     let result = await ttchanel.find({ admin: true, friends: 55 })
//     result = await ttchanel.find({ admin: true, friends: { $gt: 55 } })
//     // similarly ::   $gte , $lte , $ne , $gt , $lt , $eq  
//     // Note ::  $in  --  Matches any of the values specified in an array.
//     //          $nin  --  Matches none of the values specified in an array.
//     // console.log(result);



//     // $in  , $nin   :::
//     // Note ::  $in  --  Matches any of the values specified in an array.
//     //          $nin  --  Matches none of the values specified in an array.
//     result = await ttchanel.find({ name: { $in: ["satyam markam", "sarman patel", "rohit vemra"] } })
//     //  console.log(result);
//     result = await ttchanel.find({ name: { $nin: ["satyam markam", "sarman patel", "rohit vemra"] } })
//     // console.log(result);




//     // Logical Query operator :::  -----------   $and , $not ,  $nor , $or
//     // $or
//     result = await ttchanel.find({ $or: [{ name: "satyam markam" }, { friends: 55 }] })
//     // $and
//     result = await ttchanel.find({ $and: [{ name: "satyam markam" }, { friends: 55 }] })
//     // console.log(result);



//     // --------------- ::: Sorting and Count Query  ::: --------------
//     // count
//     result = await ttchanel.find({ $or: [{ name: "satyam markam" }, { friends: 55 }] }, { name: 1 }).countDocuments()
//     // console.log(result);
//     result = await ttchanel.find({ $or: [{ name: "satyam markam" }, { friends: 55 }] }, { name: 1, _id: 0 }).sort()  // not do any sort
//     result = await ttchanel.find({ $or: [{ name: "satyam markam" }, { friends: { $gt: 0 } }] }, { name: 1, _id: 0, friends: 1 }).sort({ friends: 1, name: 1 })  // it sorts - perfect
//     result = await ttchanel.find({ $or: [{ name: "satyam markam" }, { friends: { $gt: 0 } }] }, { name: 1, _id: 0, friends: 1 }).sort({ name: 1, friends: 1 })  // it sorts - perfect
//     result = await ttchanel.find({ $or: [{ name: "satyam markam" }, { friends: { $gt: 0 } }] }, { name: 1, _id: 0, friends: 1 }).sort({ name: -1, friends: 1 })  // it sorts - perfect
//     // console.log(result);



//     // --------------- ::: Element Query Operator   ::: --------------

//     // $exists
//     // db.inventory.find( { qty: { $exists: true, $nin: [ 5, 15 ] } } )
//     // This query will select all documents in the inventory collection where the qty field exists and its value does not equal 5 or 15.

//     // $type -- left for now


//     //----------------:: : Evalution Query Operator :: -----
//     // $expr :: ----
//     // { "_id" : 1, "category" : "food", "budget": 400, "spent": 450 }
//     // { "_id" : 2, "category" : "drinks", "budget": 100, "spent": 150 }
//     // { "_id" : 3, "category" : "clothes", "budget": 100, "spent": 50 }
//     // { "_id" : 4, "category" : "misc", "budget": 500, "spent": 300 }
//     // { "_id" : 5, "category" : "travel", "budget": 200, "spent": 650 }

//     // db.monthlyBudget.find({ $expr: { $gt: ["$spent", "$budget"] } })
//     // The operation returns the following results:
//     // { "_id" : 1, "category" : "food", "budget" : 400, "spent" : 450 }
//     // { "_id" : 2, "category" : "drinks", "budget" : 100, "spent" : 150 }
//     // { "_id" : 5, "category" : "travel", "budget" : 200, "spent" : 650 }



//     // $regex :: ----
//     // { name: { $in: [ /^acme/i, /^ack/ ] } }
//     // db.inventory.find( { item: { $not: /^p.*/ } } )
//     // db.inventory.find( { item: { $not: { $regex: "^p.*" } } } )
//     // db.inventory.find( { item: { $not: { $regex: /^p.*/ } } } )
//     // db.products.find( { sku: { $regex: /789$/ } } )
//     // Note: ^ for start   ,   $ for end     
//     // Note: --   $options ::  "si" "m" "i" "x"
//     // db.products.find( { sku: { $regex: /^ABC/i } } )
//     // { name: { $regex: /acme.*corp/, $options: "si" } }
//     // { name: { $regex: 'acme.*corp', $options: "si" } }
//     // db.inventory.find({ item: { $not: { $regex: "^p.*" } } })
//     // db.inventory.find({ item: { $not: { $regex: /^p.*/ } } })
//     // db.products.find( { sku: { $regex: /^ABC/i } } )
//     // db.products.find( { description: { $regex: /^S/, $options: 'm' } } )

//     // $text :::  -- left for now (it is easy)


//     //----------------:: : Array Query Operator :: -----
//     //----------------:: : Array Query Operator :: -----
//     //----------------:: : Array Query Operator :: -----
//     // $all --  works as $and operator  in an array
//     // NOTE ::  $and works as $and operator
//     //   same    { tags: { $all: [ "ssl" , "security" ] } }               same 
//     //   same    { $and: [ { tags: "ssl" }, { tags: "security" } ] }      same
//     //   same    db.articles.find( { tags: [ "ssl", "security" ] } )     same


//     // EXAMPLE :: ----
//     // {{{{
//     // {
//     //     _id: ObjectId("5234cc89687ea597eabee675"),
//     //     code: "xyz",
//     //     tags: [ "school", "book", "bag", "headphone", "appliance" ],
//     //     qty: [
//     //            { size: "S", num: 10, color: "blue" },
//     //            { size: "M", num: 45, color: "blue" },
//     //            { size: "L", num: 100, color: "green" }
//     //          ]
//     //  }
//     //  {
//     //     _id: ObjectId("5234cc8a687ea597eabee676"),
//     //     code: "abc",
//     //     tags: [ "appliance", "school", "book" ],
//     //     qty: [
//     //            { size: "6", num: 100, color: "green" },
//     //            { size: "6", num: 50, color: "blue" },
//     //            { size: "8", num: 100, color: "brown" }
//     //          ]
//     //  }
//     //  {
//     //     _id: ObjectId("5234ccb7687ea597eabee677"),
//     //     code: "efg",
//     //     tags: [ "school", "book" ],
//     //     qty: [
//     //            { size: "S", num: 10, color: "blue" },
//     //            { size: "M", num: 100, color: "blue" },
//     //            { size: "L", num: 100, color: "green" }
//     //          ]
//     //  }
//     //  {
//     //     _id: ObjectId("52350353b2eff1353b349de9"),
//     //     code: "ijk",
//     //     tags: [ "electronics", "school" ],
//     //     qty: [
//     //            { size: "M", num: 100, color: "green" }
//     //          ]
//     //  }

//     // db.inventory.find( { tags: { $all: [ "appliance", "school", "book" ] } } )
//     // }}}}





//     // Use $all with $elemMatch  :::: ------
//     // EXAMPLE :: -----
//     // {
//     //     _id: ObjectId("5234cc89687ea597eabee675"),
//     //     code: "xyz",
//     //     tags: [ "school", "book", "bag", "headphone", "appliance" ],
//     //     qty: [
//     //            { size: "S", num: 10, color: "blue" },
//     //            { size: "M", num: 45, color: "blue" },
//     //            { size: "L", num: 100, color: "green" }
//     //          ]
//     //  }
//     //  {
//     //     _id: ObjectId("5234cc8a687ea597eabee676"),
//     //     code: "abc",
//     //     tags: [ "appliance", "school", "book" ],
//     //     qty: [
//     //            { size: "6", num: 100, color: "green" },
//     //            { size: "6", num: 50, color: "blue" },
//     //            { size: "8", num: 100, color: "brown" }
//     //          ]
//     //  }
//     //  {
//     //     _id: ObjectId("5234ccb7687ea597eabee677"),
//     //     code: "efg",
//     //     tags: [ "school", "book" ],
//     //     qty: [
//     //            { size: "S", num: 10, color: "blue" },
//     //            { size: "M", num: 100, color: "blue" },
//     //            { size: "L", num: 100, color: "green" }
//     //          ]
//     //  }
//     //  {
//     //     _id: ObjectId("52350353b2eff1353b349de9"),
//     //     code: "ijk",
//     //     tags: [ "electronics", "school" ],
//     //     qty: [
//     //            { size: "M", num: 100, color: "green" }
//     //          ]
//     //  }
//     // db.inventory.find( {
//     //     qty: { $all: [
//     //                    { "$elemMatch" : { size: "M", num: { $gt: 50} } },
//     //                    { "$elemMatch" : { num : 100, color: "green" } }
//     //                  ] }
//     //   } )
//     // OutPut :: ---
//     // {
//     //     "_id" : ObjectId("5234ccb7687ea597eabee677"),
//     //     "code" : "efg",
//     //     "tags" : [ "school", "book"],
//     //     "qty" : [
//     //               { "size" : "S", "num" : 10, "color" : "blue" },
//     //               { "size" : "M", "num" : 100, "color" : "blue" },
//     //               { "size" : "L", "num" : 100, "color" : "green" }
//     //             ]
//     //  }
//     //  {
//     //     "_id" : ObjectId("52350353b2eff1353b349de9"),
//     //     "code" : "ijk",
//     //     "tags" : [ "electronics", "school" ],
//     //     "qty" : [
//     //               { "size" : "M", "num" : 100, "color" : "green" }
//     //             ]
//     //  }


//     // NOTE :: --
//         // The 
//         // $all
//         //  operator exists to support queries on arrays. But you may use the 
//         // $all
//         //  operator to select against a non-array field, as in the following example:
//         // db.inventory.find( { "qty.num": { $all: [ 50 ] } } )
//         // db.inventory.find( { "qty.num" : 50 } )











//     // $elemMatch :: -----
//     // $elemMatch works for atleast match and not for exact match in an array
//     // { _id: 1, results: [82, 85, 88] }
//     // { _id: 2, results: [75, 88, 89] }
//     // db.scores.find(
//     //     { results: { $elemMatch: { $gte: 80, $lt: 85 } } }
//     //  )
//     // { "_id" : 1, "results" : [ 82, 85, 88 ] }


//     // db.survey.insertMany( [
//     //     { "_id": 1, "results": [ { "product": "abc", "score": 10 },
//     //                              { "product": "xyz", "score": 5 } ] },
//     //     { "_id": 2, "results": [ { "product": "abc", "score": 8 },
//     //                              { "product": "xyz", "score": 7 } ] },
//     //     { "_id": 3, "results": [ { "product": "abc", "score": 7 },
//     //                              { "product": "xyz", "score": 8 } ] },
//     //     { "_id": 4, "results": [ { "product": "abc", "score": 7 },
//     //                              { "product": "def", "score": 8 } ] }
//     //  ] )
//     // db.survey.find(
//     //     { results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } }
//     //  )
//     // { "_id" : 3, "results" : [ { "product" : "abc", "score" : 7 },
//     //                        { "product" : "xyz", "score" : 8 } ] }
//     // db.survey.find(
//     //     { results: { $elemMatch: { product: "xyz" } } }
//     //  )
//     // Without $elemMatch:
//     // db.survey.find(
//     //     { "results.product": "xyz" }
//     //  )
//     // With $elemMatch:
//     // db.survey.find(
//     //     { "results": { $elemMatch: { product: { $ne: "xyz" } } } }
//     //  )
//     // Without $elemMatch:
//     // db.survey.find(
//     //    { "results.product": { $ne: "xyz" } }
//     // )
//     // With $elemMatch, the first query returns these documents:
//     // {
//     //     "_id" : 1, "results" : [{ "product": "abc", "score": 10 },
//     //     { "product": "xyz", "score": 5 }]
//     // }
//     // {
//     //     "_id" : 2, "results" : [{ "product": "abc", "score": 8 },
//     //     { "product": "xyz", "score": 7 }]
//     // }
//     // {
//     //     "_id" : 3, "results" : [{ "product": "abc", "score": 7 },
//     //     { "product": "xyz", "score": 8 }]
//     // }
//     // {
//     //     "_id" : 4, "results" : [{ "product": "abc", "score": 7 },
//     //     { "product": "def", "score": 8 }]
//     // }

//     // Without $elemMatch, the second query returns this document:
//     // { "_id" : 4, "results" : [ { "product" : "abc", "score" : 7 },
//     //                        { "product" : "def", "score" : 8 } ] }













// }

// createDocument()
