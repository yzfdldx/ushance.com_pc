

// console.log(state)
// const App3 = connect(App2);
// Children.contextType = MyContext;

// export default {aa: 32 }

export default {
  namespace: 'admin',
  state: {
    foot_visible: false,
  },
  effects: {
    async aaAjax_Fn({ payload }, { call, put }) {  // 应用管理列表-删除
      const app_del_Ajax = () => {
        return new Promise(function (resolve, reject) {
          setTimeout(() => {
            resolve(payload)
          }, 2000)
        })
      }
      try {
        const Data = await call(app_del_Ajax);
        console.log(Data)
        // message.success(`删除成功`);
        await put({
          type: 'save',
          payload: Data
        })
        // if (payload.back) {
        //   payload.back()
        // }
      } catch (error) {
        //
      }
    },
  },
  reducers: {
    save(state, action) {
      console.log(state, action)
      // return { ...state, ...action.payload };
      return JSON.parse(JSON.stringify({ ...state, ...action.payload }));
    },
  },
};
  
