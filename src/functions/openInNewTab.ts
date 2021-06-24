const openInNewTab = (url) => {
  var win = window.open(url, "_blank");
  win.focus();
};
export default openInNewTab;
