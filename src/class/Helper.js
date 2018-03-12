/**
 * helper class
 */
export default class Helper {
  /**
   * get color based on a number > 0, green > red
   * @param  {[type]} feed    [new feed]
   * @param  {[type]} oldFeed
   * @return {[type]}  string
   */
  getColor(num) {
      if (num > 0) {
        return "green";
      } else {
        return "red";
      }
  }
  getOrientation(num) {
      if (num > 0) {
        return "up";
      } else {
        return "down";
      }
  }
  /**
   * Format numbers for better readability
   * @param  {[type]} num
   * @return {[type]} string
   */
  formatNumber(num) {
    // Ensure value is a number first
    num = num * 1;

    // Source: https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript#149099
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });

    return formatter.format(num);
  }
}
