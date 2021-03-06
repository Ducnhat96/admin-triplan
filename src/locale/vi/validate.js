/**
 * File định nghĩa các câu dịch của package VeeValidate
 */
export default {
  after: (field, [target]) => `Trường ${field} phải xuất hiện sau  ${target}.`,
  alpha_dash: (field) => `Trường  ${field} có thể chứa các kí tự chữ, số, gạch ngang và gạch dưới.`,
  alpha_num: (field) => `Trường ${field} chỉ có thể chứa các kí tự chữ và số.`,
  alpha: (field) => `Trường ${field} chỉ có thể chứa các kí tự chữ.`,
  before: (field, [target]) => `Trường ${field} phải xuất hiện trước ${target}.`,
  between: (field, [min, max]) => `Trường ${field} phải có giá trị nằm trong khoảng giữa ${min} và ${max}.`,
  confirmed: (field, [confirmedField]) => `Trường ${field} không trùng khớp với trường ${confirmedField}.`,
  date_between: (field, [min, max]) => `Trường ${field} phải có giá trị nằm trong khoảng giữa  ${min} và ${max}.`,
  date_format: (field, [format]) => `Trường ${field} phải có giá trị dưới định dạng ${format}.`,
  decimal: (field, [decimals] = ['*']) => `Trường ${field} chỉ có thể chứa các kí tự số và dấu thập phân ${decimals === '*' ? '' : decimals}.`,
  digits: (field, [length]) => `Trường ${field} chỉ có thể chứa các kí tự số và bắt buộc phải có độ dài là ${length}.`,
  dimensions: (field, [width, height]) => `Trường ${field} phải có chiều rộng ${width} pixels và chiều cao ${height} pixels.`,
  email: (field) => `Trường ${field} phải là một địa chỉ email hợp lệ.`,
  ext: (field) => `Trường ${field} phải là một tệp.`,
  image: (field) => `Trường ${field} phải là một ảnh.`,
  in: (field) => `Trường ${field} phải là một giá trị.`,
  ip: (field) => `Trường ${field} phải là một địa chỉ ip hợp lệ.`,
  max: (field, [length]) => `Trường ${field} không thể có nhiều hơn ${length} kí tự.`,
  mimes: (field) => `Trường ${field} phải chứa kiểu tệp phù hợp.`,
  min: (field, [length]) => `Trường ${field} phải chứa ít nhất ${length} kí tự.`,
  not_in: (field) => `Trường ${field} phải chứa một giá trị hợp lệ.`,
  numeric: (field) => `Trường ${field} chỉ có thể có các kí tự số.`,
  regex: (field) => `Trường ${field} có định dạng không đúng.`,
  required: (field) => `Trường ${field} là bắt buộc.`,
  size: (field, [size]) => `Trường ${field} chỉ có thể chứa tệp nhỏ hơn ${size} KB.`,
  url: (field) => `Trường ${field} không phải là một địa chỉ URL hợp lệ.`
}
