module.exports = {
  formatSizeUnits: function (bytes) {
    switch (true) {
      case bytes >= 1099511627776:
        return (bytes / 1099511627776).toFixed(2) + ' TB';
      case bytes >= 1073741824:
        return (bytes / 1073741824).toFixed(2) + ' GB';
      case bytes >= 1048576:
        return (bytes / 1048576).toFixed(2) + ' MB';
      case bytes >= 1024:
        return (bytes / 1024).toFixed(2) + ' KB';
      case bytes > 1:
        return bytes + ' bytes';
      case bytes === 1:
        return bytes + ' byte';
      default:
        return '0 bytes';
    }
  },
};
