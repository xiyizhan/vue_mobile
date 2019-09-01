let http=require('http');
let fs=require('fs');
let url=require("url");
let sliders=require('./sliders').sliders;
let pageSize=10;

function read(cb){ //用来异步读取数据
    fs.readFile("./book.json",'utf8',(err,data)=>{
        if(data.length===0 || err){
            cb([]); //如果有错误，或者长度为0，那么就是空数组
        }else{
            cb(JSON.parse(data)) //将读出来的数据转化成对象
        }
        
    });
};
function write(data,cb){  //用来异步写数据
    fs.writeFile('./book.json',JSON.stringify(data),cb)
}
http.createServer((req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") return res.end();   
 
    let{pathname,query}=url.parse(req.url,true);
    if(pathname==="/sliders"){
        res.setHeader('Content-Type','application/json;charset=utf8');
        return res.end(JSON.stringify(sliders))
    } 
    if(pathname==="/hot"){
       // console.log("1")
        read(function(books){
            res.setHeader('Content-Type','application/json;charset=utf8');
            setTimeout(()=>{res.end(JSON.stringify(books))},1000)
        });
        return
    }
    /* 以下是分页和前端交互 */
    if(pathname==="/page"){
        let offset=parseInt(query.offset) || 0;//拿到当前前端传给的值，第几条开始
        read(books=>{
            let result=books.slice(offset,offset+pageSize);//截取从第几条到第几条
            let hasMore=true;//默认有更多
            if(books.length<=offset+pageSize){//当数据总数小于（前端传过来的值+每次传几条）
                hasMore=false
            }
            res.setHeader('Content-Type','application/json;charset=utf8');
           // setTimeout(()=>{
                res.end(JSON.stringify({hasMore,books:result}))
          //  },2000)
            
        })
    }

    if(pathname==="/book"){
        let id=parseInt(query.id);//取出的字符串
        //console.log(id); //?id=2
        switch (req.method){
            case 'GET':
            if(!isNaN(id)){ //查询一个
                read(books=>{
                    let book=books.find(item=>item.bookId===id);
                    if(!book){
                        book={}//如果没有找到则是undefined
                    }
                    res.setHeader('Content-Type','application/json;charset=utf8');
                    res.end(JSON.stringify(book))
                })
            }else{//查看所有的
                read(function(books){
                    res.setHeader('Content-Type','application/json;charset=utf8');
                    res.end(JSON.stringify(books))
                });
            }

            break;
            case 'POST':
            let str="";
            req.on("data",chunk=>{ //处理前端传过来的数据
                str+=chunk;
            });
            req.on("end",()=>{ //数据接受完
                let book=JSON.parse(str);
                read(books=>{
                    book.bookId=books.length?parseInt(books[books.length-1].bookId)+1:1;
                    books.push(book);
                    write(books,()=>{
                        res.end(JSON.stringify(book))
                    })
                })
            })
            break;
            case 'PUT':
                if(id){
                   let str="";
                   req.on("data",chunk=>{
                       str+=chunk;
                      
                   });
                   
                   req.on("end",()=>{
                    let book=JSON.parse(str);
                    read(books=>{
                        books=books.map(item=>{
                            if(item.bookId==id){
                                return book;
                            }
                            return item;
                        });
                        
                        write(books,function(){
                            res.end(JSON.stringify(book))
                        })
                    });
                    

                   })
                  
                  
                }
            break;
            case 'DELETE':
            console.log("delete");
            read(function(books){
                books=books.filter(item=>{
                   return item.bookId!==id;
                });
                write(books,function(){
                    res.end(JSON.stringify(books))
                   })
            });
           
            break;
        }
        return
    }
   /*  fs.stat('.'+pathname,function(err,stats){
        if(err){
            fs.createReadStream('index.html').pipe(res);
        }else{
            if(stats.isDirectory()){
                let p=require('path').join('.'+pathname,'./index.html');
                fs.createReadStream(p).pipe(res);
            }else{
                fs.createReadStream('.'+pathname).pipe(res);
            }
        }
    }) */
}).listen(5001,'127.0.0.1');
console.log('server started')