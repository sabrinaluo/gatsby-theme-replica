exports.onRenderBody = ({ setBodyAttributes }) => {
  setBodyAttributes({
    className: 'theme-replica',
  });
};

exports.wrapPageElement = ({ element }) => {
  return element;
};
