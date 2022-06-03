// type
// isEmpty. check empty
// password. check password
// email.check email
// phone. check phonenumber

// return 
// true. ok 
// 2. type is wrong


const passwordRegex = /^([a-zA-Z0-9]{6})$/  // min is 6 and without special char
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/  // format abc@abc
const phoneRegex = /^\d{10}$/   // min 10 number
const handleValidate = (data, type) => {
    var kq = ''
    if (data === '' || data === null)
        return kq = 'Không được để trống'
    switch (type) {
        case "isEmpty":
            return true
        case "password":
            if (passwordRegex.test(data))
                return true
            kq = 'Mật khẩu không có ký tự đặt biệt và 8 ký tự trở lên'
            return kq
        case "email":
            if (emailRegex.test(data))
                return true
            kq = 'Email sai định dạng'
            return kq
        case "phone":
            if (phoneRegex.test(data))
                return true
            kq = 'Số điện thoại cần 10 số'
            return kq
        default:
            return 2
    }

}

export default handleValidate