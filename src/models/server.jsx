import ajax from './ajax';

// const AA = () => {
//   return new Promise(function (resolve, reject) {
//     setTimeout(() => {
//       resolve({
//         data: {
//           asas: 2332,
//           cbhj: '3232',
//           ...res
//         }
//       })
//     }, 2000)
//   })
// }
const host = `http://${window.location.hostname}`;

export const search_books_list_Ajax = (res)=>{ // 菜单树形结构新增-模块
  const Url = encodeURI(`${host}/xiaoshuo/search.json`)
  return ajax({
    url: Url,
    data: res
  });
}

export const aaAjax = (res)=>{ // 菜单树形结构新增-模块
  return {
    a: 23
  }
  // return ajax({
  //   url:"/admin/addModule.json",
  //   data: res
  // });
}



