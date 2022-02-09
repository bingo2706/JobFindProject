import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Spinner } from 'reactstrap';
import { createNewCv } from '../../service/cvService';
import CommonUtils from '../../util/CommonUtils';

function SendCvModal(props) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [isLoading, setIsLoading] = useState(true)
    const [inputValue, setInputValue] = useState({
        user_id: '', post_id: '', file: '', description: '', linkFile: ''
    })
    useEffect(() => {
        if (userData)
            setInputValue({
                ...inputValue,
                ["user_id"]: userData.id,
                ["post_id"]: props.postId
            })
    }, [])
    const handleChange = (event) => {
        const { name, value } = event.target
        setInputValue({
            ...inputValue,
            [name]: value
        })
    }

    const handleOnChangeFile = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            setInputValue({
                ...inputValue,
                ["file"]: base64,
                ["linkFile"]: URL.createObjectURL(file)
            })
        }
    }
    const handleSendCV = async () => {
        setIsLoading(true)
        let kq = await createNewCv({
            user_id: inputValue.user_id,
            file: inputValue.file,
            post_id: inputValue.post_id,
            description: inputValue.description
        })
        setTimeout(function () {
            setIsLoading(false)
            if (kq.errCode === 0) {
                setInputValue({
                    ...inputValue,
                    ["file"]: '', ["description"]: '', ["linkFile"]: ''
                })
                toast.success("Đã gửi thành công")
                props.onHide()
            }
            else
                toast.error("Gửi thất bại");
        }, 1000);
    }
    return (
        <div>
            <Modal isOpen={props.isOpen} className={'booking-modal-container'}
                size="md" centered
            >
                <p className='text-center'>NỘP CV CỦA BẠN CHO NHÀ TUYỂN DỤNG</p>
                <ModalBody>
                    Nhập lời giới thiệu gửi đến nhà tuyển dụng

                    <input name='description' className='mt-2' style={{ height: "100px", width: "100%" }} onChange={(event) => handleChange(event)}></input>

                    <input type="file" className='mt-2' onChange={(event) => handleOnChangeFile(event)}></input>
                    {
                        inputValue.linkFile && <div><a href={inputValue.linkFile} style={{ color: 'blue' }} target='_blank'>Nhấn vào đây để xem lại CV của bạn </a></div>
                    }
                </ModalBody>
                <ModalFooter style={{ justifyContent: 'space-between' }}>
                    <Button className='me-5' onClick={() => handleSendCV()}>
                        Gửi hồ sơ
                    </Button>

                    <Button onClick={() => {
                        setInputValue({
                            ...inputValue,
                            ["user_id"]: '', ["post_id"]: '', ["file"]: '', ["description"]: ''
                        })
                        props.onHide()
                    }}>
                        Hủy
                    </Button>
                </ModalFooter>

                {isLoading &&
                    <Modal isOpen='true' centered >
                        <div style={{
                            position: 'absolute', right: '50%',
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Spinner animation="border"  >

                            </Spinner>
                        </div>
                    </Modal>
                }
            </Modal>
        </div>
    );
}

export default SendCvModal;