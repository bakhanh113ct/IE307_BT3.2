const commonColor = {
  commonWhite: '#FFFFFF',
  commonBlack: '#000000',
  activeColor: '#DE5E69',
  deactiveColor: '#DE5E6950',
  boxActiveColor: '#DE5E6940',
};

const light = {
  themeColor: '#FFFFFF',
  backgroundColor: '#f2f2f2',
  textColor: '#000000',
  highlight: '#fe5500',
  ...commonColor,
};

const dark = {
  themeColor: '#000000',
  textColor: '#FFFFFF',
  backgroundColor: '#111111',
  highlight: '#0097fe',
  ...commonColor,
};

export default {light, dark};
