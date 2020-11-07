import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { Icon as LegacyIcon } from '@ant-design/compatible';    //有待商榷！！！

const { SubMenu, Item } = Menu;

export const flatten = (() => {   //利用闭包
  let shortArr = [];
  return (arr) => {   //扁平化数组
    console.log(arr);
    arr.forEach(item => {
      if (item.children) {
        flatten(item.children);
      } else {
        shortArr.push(item);
      }
    });
    console.log(shortArr);
    return shortArr;
  }
})()

export const recurMenu = (MenuArr) => {     // 递归数组返回菜单 
  return MenuArr.map((item) => {
    let { children, title, key, icon } = item;
    if (!children) {    //没有children则为叶级菜单
      // return React.createElement(Item, {
      //   icon: React.createElement(Icon[iconType]),
      //   key,
      // }, title)
      return <Item icon={<LegacyIcon type={icon} />} key={key}><Link to={item.path}>{title}</Link></Item>
      // return <Item key={key}><Link to={item.path}>{title}</Link></Item>

    } else {
      // return React.createElement(SubMenu, { key, icon: React.createElement(Icon[iconType]), title }, recurMenu(children))
      return <SubMenu key={key} icon={<LegacyIcon type={icon} />} title={title}>
        {recurMenu(children)}
      </SubMenu>
      // return <SubMenu key={key} title={title}>
      //   {recurMenu(children)}
      // </SubMenu>
    }
  })
}

