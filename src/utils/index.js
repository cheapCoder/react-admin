

export const flatten = (() => {   //利用闭包
  let newMenus = [];
  return (menus) => {
    menus.forEach(item => {
      if (item.children) {
        flatten(item.children);
      } else {
        newMenus.push(item);
      }
    })
    return newMenus
  }
})()
