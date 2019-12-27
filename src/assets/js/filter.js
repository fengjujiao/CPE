// todo 表格td数据通用处理
let turnTd = (value,data)=> {
  let arr = value.split('_')
  // 一级数据结构
  if (arr.length === 1) {
    return data[value]
  }
  // 多级数据结构
  let _val = ''
  arr.forEach(item=>{
    if (!_val) {
      _val = data[item]
    } else {
      _val = _val[item]
    }
  })
  return _val
}
export{
  turnTd,
}
