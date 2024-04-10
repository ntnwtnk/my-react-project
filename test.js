const dbConnect = require('./mongodb')

// dbConnect().then((res)=>{
//     res.find().toArray().then((data)=>{
//         console.warn(data)
//     })
// })
// console.log( dbConnect() );

const main = async ()=>{
    let data = await  dbConnect();
    data = await data.find().toArray();
    console.warn(data);
}
main();
