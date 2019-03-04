export default {
    formatDate(timeStamp){
        const date=new Date(timeStamp)
        return date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日";
    },
    formatTime(timeStamp){
        const date=new Date(timeStamp)
        return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    },
    pagination(res,callback){
        return {
            onChange:(current)=>{
                callback(current)
            },
            current:res.data.page,
            pageSize:res.data.pageSize,
            total:res.data.total,
            showTotal:()=>{
                return `共${res.data.total}条`
            },
            showQuickJumper:true
        }
    }
}