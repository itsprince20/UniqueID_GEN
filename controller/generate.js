process.env.sequence = 1;
var cache = require('memory-cache');
console.log("process.env.sequence",process.env.sequence);

exports.generateId = (req,res)=>{
var  mid = BigInt(Math.floor(Math.random() * 1023));
function generateSnowflakeId(nodeId) {
    const maxNodeId = 1023n;
    const maxSequence = 65535n;
    const timestamp = BigInt(Date.now());
    // console.log("timestamp",timestamp);
    var sequence = BigInt(process.env.sequence);
    process.env.sequence = sequence + 1n;
   if (sequence > maxSequence) {
        process.env.sequence = 0n;
        sequence = 0n;
    }
    // var currseq = sequence + timestamp;
    process.env.prevsequence = sequence ;
 if(nodeId > maxNodeId ){
        nodeId = 0n;
    }
    const snowflakeId = (timestamp << 20n) | nodeId << 13n | sequence  ;
    let sfid = snowflakeId.toString();

    // console.log(`snowflake id :${sfid} sequence no:${sequence} nodeId:${nodeId}  timestamp:${timestamp} `);
     



 let last11 = sfid.slice(-11);
 let fst8 = sfid.slice(0,8);
 let splitted = fst8.split("")
//  console.log("lst11",last11);

//  console.log(fst8,"fst8");
 
//  console.log("splitted",splitted);
 let finalid = splitted[1] + splitted[3]+splitted[5]+splitted[7]+last11;
 


  
    if(cache.get(`${finalid}`))
    {
        console.log("Found in cache  :: ",finalid);
        generateSnowflakeId(mid);
    }
    
    else{
        cache.put(`${finalid}`,finalid,600000)
        console.log(`GEnerated id : ${sfid} sequence no: ${sequence} nodeId: ${nodeId}  timestamp:${timestamp}   last11 : ${last11} first8 : ${fst8}   final ID : ${finalid}`);
     
res
    .status(200)
    .json( {"unique Id":finalid} )
    .end();
    }
    // const snowflakeId1 = (timestamp << 20n) | nodeId << 13n | sequence  ;

    // if(genid.includes(sfid))
    // {
    //     dup.push(sfid)
    // }
    // else
    // {
    //     genid.push(sfid)
    // }

}

    
    generateSnowflakeId(mid);


}

