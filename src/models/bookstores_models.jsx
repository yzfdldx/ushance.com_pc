import {
  search_books_list_Ajax
} from './server.jsx';

export default {
  namespace: 'bookstores',
  state: {
    search_books_list: {
      list: []
    },
  },
  effects: {
    async search_books_list_Fn({ payload, state }, { call, put }) {
      try {
        const Data = await call(search_books_list_Ajax, payload.data);
        const {search_books_list} = state.bookstores;
        if (payload.pageFn) {
          await put({
            type: 'save',
            payload: {
              search_books_list: {
                page: Data.page,
                list: [...search_books_list.list, ...Data.list]
              }
            }
          })
        } else {
          await put({
            type: 'save',
            payload: {
              search_books_list: Data
            }
          })
        }
        if (payload.back) {
          payload.back();
        }
      } catch (error) {
        //
      }
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
      // return JSON.parse(JSON.stringify({ ...state, ...action.payload }));
    },
  },
};
  
