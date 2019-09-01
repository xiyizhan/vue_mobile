let express=require('express');
let app=express();//将express实例化
let sliders=require('./sliders').sliders;
let fs=require('fs');
let pageSize=10;
let bodyParser=require('body-parser');
app.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
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
app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);
    else next();
})
app.get('/sliders',(req,res)=>{
    res.json(sliders);
});
app.get('/hot',(req,res)=>{
    read(function(books){
        res.json(books)
    });
    return
});
app.get('/page',(req,res)=>{
    let offset=parseInt(req.query.offset) || 0;//拿到当前前端传给的值，第几条开始
    read(books=>{
        let result=books.slice(offset,offset+pageSize);//截取从第几条到第几条
        let hasMore=true;//默认有更多
        if(books.length<=offset+pageSize){//当数据总数小于（前端传过来的值+每次传几条）
            hasMore=false
        }
        res.setHeader('Content-Type','application/json;charset=utf8');
        res.json({hasMore,books:result})
    })
});

app.get('/book',(req,res)=>{
    let id=parseInt(req.query.id);//取出的字符串
        if(!isNaN(id)){ //查询一个
            read(books=>{
                let book=books.find(item=>item.bookId===id);
                if(!book){
                    book={}//如果没有找到则是undefined
                }
                res.setHeader('Content-Type','application/json;charset=utf8');
                res.json(book)
            })
        }else{//查看所有的
            read(function(books){
                res.setHeader('Content-Type','application/json;charset=utf8');
                res.json(books)
            });
        }

    })

    app.delete('/book',(req,res)=>{
        let id=parseInt(req.query.id);//取出的字符串
        read(function(books){
            books=books.filter(item=>{
               return item.bookId!==id;
            });
            write(books,function(){
                res.json(books)
               })
        });
    });
    app.post('/book',urlencodedParser,(req,res)=>{
            let book=req.body;
            read(books=>{
                console.log(book);
                book.bookId=books.length?parseInt(books[books.length-1].bookId)+1:1;
                books.push(book);
                write(books,()=>{
                    res.json(books)
                })
            })
        })
   app.put('/book',urlencodedParser,(req,res)=>{
    let id=parseInt(req.query.id);//取出的字符串
    let book=req.body;
    read(books=>{
        books=books.map(item=>{
            if(item.bookId==id){
                return book;
            }
            return item;
        });
        
        write(books,function(){
            res.json(books)
        })
    });
   })

//监听端口
app.listen(5002,function(){
    console.log("start")
})
