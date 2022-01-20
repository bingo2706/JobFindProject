import React, { useState } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import { createNewCv } from '../../service/cvService';
import CommonUtils from '../../util/CommonUtils';
function SendCvModal(props) {

    const [inputValue, setInputValue] = useState({
        user_id: '', post_id: '', file: '', description: ''
    })

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
            let objectUrl = URL.createObjectURL(file)
            setInputValue({
                ...inputValue,
                ["file"]: base64
            })
        }
    }

    const handleSendCV = () => {
        createNewCv({
            user_id: inputValue.user_id,
            file: inputValue.file,
            post_id: inputValue.post_id,
            description: inputValue.description
        })
        setInputValue({
            ...inputValue,
            ["user_id"]: '', ["post_id"]: '', ["file"]: '', ["description"]: ''
        })
    }

    return (
        <div>
            <Modal isOpen={props.isOpen} className={'booking-modal-container'}
                size="md" centered
            >
                <p className='text-center'>NỘP CV CỦA BẠN CHO NHÀ TUYỂN DỤNG</p>
                <ModalBody>
                    Nhập lời giới thiệu gửi đến nhà tuyển dụng

                    <input className='mt-2' style={{ height: "100px", width: "100%" }} onChange={(event) => handleChange(event)}></input>

                    <input type="file" className='mt-2' onChange={(event) => handleOnChangeFile(event)}></input>
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
            </Modal>
        </div>
    );
}

export default SendCvModal;