import React from 'react';
import { Checkbox, Button, message } from 'antd';
const onChange = (e) => {
  if (e.target.checked) {
    window.baomiOnoff = true;
  } else {
    window.baomiOnoff = '';
  }
}
export const baomiFn = () => <div className="baomi">
  <div className="baomi_title">保密协议</div>
  <div className="baomi_title2">保密协议</div>
  <div className="baomi_center1">本保密协议（“本协议”）由以下双方签订：</div>
  <div className="baomi_center2">甲方：本网站用户</div>
  <div className="baomi_center2">乙方：XX有限公司</div>
  <div className="baomi_word">鉴于甲乙双方在开展业务合作过程中需要交换保密信息，且双方同意将在开展各自业务的同时，妥善保护双方交换的保密信息，协议双方就 乙方 向 甲方 提供包含涉密信息的服务时所应承担的保密义务达成如下协议：</div>
  <div className="baomi_center1">一、甲方的权利和义务</div>
  <div className="baomi_center2">1、甲方应通过下述方式之一向乙方提供保密信息：</div>
  <div className="baomi_center3">1) 书面形式；</div>
  <div className="baomi_center3">2) 将载有保密信息的物质载体交付接受方</div>
  <div className="baomi_center3">3) 对存储于数据库中的保密信息，透露方将向接受方传授开启及存储保密信息的方法；</div>
  <div className="baomi_center3">4) 口头说明或以视听方式向接受方展示。</div>
  <div className="baomi_center2"> 2、甲方提供保密信息须注明"保密"，若甲方所提供的相关信息未注明"保密"，或仅以口头方式提供，则甲方须在透露时明确说明所提供的信息是保密信息并于事后提供书面说明。</div>
  <div className="baomi_center1">二、乙方的权利和义务</div>
  <div className="baomi_center2">1、 乙方对甲方提供的保密信息所采取的保密措施应与乙方对其自身拥有的保密信息所采取的保密措施相同;</div>
  <div className="baomi_center2">2、 乙方仅为甲方透露保密信息的目的使用保密信息。</div>
  <div className="baomi_center2">3、乙方可在一下情况下将保密信息透露给相关人员：</div>
  <div className="baomi_center3">1）提供甲方所需服务过程中，乙方内部人员或者其关联公司的雇员有必要了解保密信息的;</div>
  <div className="baomi_center3">2） 甲方事先书面同意的；</div>
  <div className="baomi_center3">3）根据中国法律及法规的强制性规定，乙方必须披露保密信息的。</div>
  <div className="baomi_center1">三、保密期限</div>
  <div className="baomi_word">根据本协议，乙方对保密信息应承担的保密义务自甲方提供之日起算，为期五年。若有特殊期限约定，可另行签署补充条款。</div>
  <div className="baomi_center1">四、保密范围</div>
  <div className="baomi_center2">1、乙方对下述信息无须承担保密义务:</div>
  <div className="baomi_center3">1) 在不承担保密责任的情况下获取的信息;</div>
  <div className="baomi_center3">2) 独立开发的信息;</div>
  <div className="baomi_center3">3) 在不违反保密义务的情况下，从甲方以外的渠道获取的信息;</div>
  <div className="baomi_center3">4) 不是由于乙方违反本协议而成为公开信息的信息;</div>
  <div className="baomi_center3">5) 甲方向无须承担保密责任的第三方泄漏的信息。</div>
  <div className="baomi_center2">2、乙方可以在其业务活动中使用残留在其曾经接触过保密信息的雇员的记忆中的并已成为其个人知识或经验的、与保密信息相关的构想、概念或技巧，但是就保密信息而言，接受方仍然应当按本协议的规定履行保密义务。</div>
  <div className="baomi_center1">五、知识产权相关声明</div>
  <div className="baomi_word">本协议任何条款或甲方依本协议规定提供任何保密信息均不构成甲方对乙方就其所拥有或将来拥有的任何商标、专利或版权等权利的授予。</div>
  <div className="baomi_center1">六、一般条款</div>
  <div className="baomi_center2">1、乙方根据本协议所应承担的保密义务不对其进行下列活动构成限制：</div>
  <div className="baomi_center3">1）向第三方提供产品或服务包括提供可能与提供给甲方的产品或服务相竞争的产品或服务</div>
  <div className="baomi_center3">2）自主安排其雇员的工作。</div>
  <div className="baomi_center2">2、对本协议的任何修改须经双方书面签署方为有效;</div>
  <div className="baomi_center2">3、任何一方可提前一个月书面通知另一方终止本协议。本协议中的任何条款由其性质决定在终止后应继续有效的将保持有效性直至履行完毕，该等条款亦适用于继承人和受让人;</div>
  <div className="baomi_center2">4、本协议受中华人民共和国法律管辖。</div>
  <div className="baomi_center1">七、争端解决</div>
  <div className="baomi_word">执行本协议发生争议时，甲乙双方应首先通过友好协商的方式解决；若协商不成，任何一方可向xx仲裁委员会提起仲裁申请予以解决</div>
  <div className="baomi_title2" style={{ padding: '20px 0', textAlign: 'left' }}>本协议是有关协议双方透露/接受本协议规定的保密信息的完整的、唯一的协议，并将取代双方此前所有口头或书面交换的意见。
本协议自用户通过网站选择签署或书面签署后正式生效。</div>
  <div>
    <Checkbox onChange={onChange}>同意</Checkbox>
  </div>
  <div style={{ textAlign: 'center' }}>
    <Button style={{ marginRight: '16px' }} onClick={() => {
      history.go(-1);
    }}>取消</Button>
    <Button type="primary" onClick={() => {
      if (window.baomiOnoff) {
        history.go(-1);
      } else {
        message.warning('请先勾选保密协议');
      }
    }}>确认</Button>
  </div>
</div>


