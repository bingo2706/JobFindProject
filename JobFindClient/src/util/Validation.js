// type
// 1. name
// 2. password
// 3. email
// 4. phonenumber

// return 
// 0. is null
// 1. ok
// 2. wrong type 


const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/  // min is 8 and without special char
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/  // format abc@abc
const phoneRegex = /^\d{10}$/   // min 10 number
const handleValidate = (data, type) => {
    if (data === '' || data === null)
        return 0
    var kq = ''
    switch (type) {
        case 1:
            return 1
        case 2:
            if (passwordRegex.test(data))
                return 1
            kq = 'Mật khẩu không có ký tự đặt biệt và 8 ký tự trở lên'
            return kq
        case 3:
            if (emailRegex.test(data))
                return 1
            kq = 'Email sai định dạng'
            return kq
        case 4:
            if (phoneRegex.test(data))
                return 1
            kq = 'Số điện thoại cần 10 số'
            return kq
        default:
            return 2
    }

}

export default handleValidate