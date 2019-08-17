

import React, { useReducer } from 'react';

const Context = React.createContext();
export const connect = (App, k) => {
  let Prop = {};
  class A extends React.Component {
    static contextType = Context;
    constructor(props, context) {
      super(props, context);
    }
    render() {
      if (k) {
        const NowState = k(this.context.state);
        Prop = {...Prop, ...NowState, dispatch: this.context.dispatch};
      } else {
        Prop = {...Prop, ...this.context.state, dispatch: this.context.dispatch};
      }
      return <App {...Prop}/>
    }
  } 
  return A;
}

const reducer = (state, action) => {
  return {...state, ...action.payload};
}
reducer.state = {};

export const App = (Children, JsonData) => {
  const [state, dispatch] = useReducer(reducer, reducer.state ? reducer.state : {});
  return <Context.Provider value={{
    dispatch: async (e) => {
      // console.log(e)
      if (!e.type) return
      let onoff = true;
      const onoffJson = {};
      Object.keys(JsonData).forEach(e => {
        if (onoffJson[e]) {
          onoff = false
        } else {
          onoffJson[e] = JsonData[e];
        }
      })
      if (onoff) {
        const Type = e.type.split('/');
        const type = Type[1];
        const NowJsonData = JsonData[Type[0]]
        if (NowJsonData.effects && NowJsonData.effects[type]) { // 掉用异步函数
          const Json1 = {}, JSon2 = {};
          Json1.state = state;
          Json1.payload = e.payload;
          JSon2.call = async (Fn, val) => {
            if (Fn) {
              return Fn(val)
            }
          }
          JSon2.put = async (e2) => {
             if (e2.type) {
              const Data = await NowJsonData.reducers[e2.type](state[NowJsonData.namespace], e2);
              const dispatchData = {};
              dispatchData[NowJsonData.namespace] = Data;
              dispatch({
                type: type,
                payload: dispatchData
              });
             }
          } 
          await NowJsonData.effects[type](Json1, JSon2);
        } else if (NowJsonData.reducers && NowJsonData.reducers[type]) { // 改变state
          const Data = await NowJsonData.reducers[type](state[NowJsonData.namespace], e);
          const dispatchData = {};
          dispatchData[NowJsonData.namespace] = Data;
          dispatch({
            type: type,
            payload: dispatchData
          });
        }
      } else {
        console.error('命名空间namespace不唯一')
      }
    },
    state
  }}>{Children ? <Children /> : null}</Context.Provider>
}

export const dva = (children) => {
  let JsonData = {};
  const Ba = () => {
    return App.call(this, children, JsonData)
  }
  Ba.model = (e) => {
    const Json = {...reducer.state};
    Json[e.namespace] = e.state;
    reducer.state = Json;
    if (!e.namespace) return console.error('命名空间namespace没有设置')
    JsonData[e.namespace] = e;
  }
  return Ba
}
