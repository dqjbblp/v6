const Mise = () => {

  const fun1 = (num:number) => {
    return new Promise((resolve,reject)=>{
      if(num>0){
        setTimeout(()=>{
          resolve('成功')
        },2000)
      }else{
        reject('小于0')
      }
    })
  }

  const fun2 = async() => {
    
    // fun1(-1).then(res=>{
    //   console.log(res);
    // }).catch(err=>{
    //   console.log(err);
    // }).finally(()=>{
    //   console.log('结束');
    // })

    try{
      const res = await fun1(5)
      console.log(res);
    }catch(err){
      console.log(err);
    }
    
    console.log(456)
  }
  fun2()

  return (
    <div></div>
  )
}

export default Mise