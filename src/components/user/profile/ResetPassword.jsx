import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Context } from '../../../context/Context';
import Spinner_ from '../../spinner/Spinner';
import apiClass from '../../../utils/api';
import Cookies from 'js-cookie'
import Btn from '../../Btn/Btn';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

const api = new apiClass()


export default function ResetPassword() {
    const { user } = useContext(Context);
    const {
        changePasswordLoading,
        setChangePasswordLoading,
    } = user.passwordReset;

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const [inp, setInp] = useState({
        oldPassword: "",
        newPassword: "",
        newCpassword: ""
    })

    const submitForm = () => {
        setChangePasswordLoading(true)
        // if accesstoken not there, refresh it before proceeding to get profile, otherwise, get profile straight up
        if (!Cookies.get('accesstoken')) {
            api.refreshToken()
            setTimeout(() => {
                api.resetPassword(inp, setChangePasswordLoading, setInp)
            }, 2000);
        }
        else {
            api.resetPassword(inp, setChangePasswordLoading, setInp)
        }
    }

    return (
        <Wrapper>

            <InputWrapper>
                <InputIcon right="" left="0">
                    <VpnKeyRoundedIcon className='icon' />
                </InputIcon>
                <input
                    type={showOldPassword ? "text" : "password"}
                    value={inp.oldPassword || ''}
                    placeholder="Old Password"
                    onInput={(e) => setInp({ ...inp, oldPassword: e.target.value })}
                />
                <InputIcon onClick={() => setShowOldPassword(!showOldPassword)} right="0" left="">
                    {showOldPassword ? <VisibilityOffRoundedIcon className='icon' /> : <RemoveRedEyeRoundedIcon className='icon' />}
                </InputIcon>
            </InputWrapper>

            <InputWrapper>
                <InputIcon right="" left="0">
                    <VpnKeyRoundedIcon className='icon' />
                </InputIcon>
                <input
                    type={showPassword ? "text" : "password"}
                    value={inp.newPassword || ''}
                    placeholder="Password"
                    onInput={(e) => setInp({ ...inp, newPassword: e.target.value })}
                />
                <InputIcon onClick={() => setShowPassword(!showPassword)} right="0" left="">
                    {showPassword ? <VisibilityOffRoundedIcon className='icon' /> : <RemoveRedEyeRoundedIcon className='icon' />}
                </InputIcon>
            </InputWrapper>

            <InputWrapper>
                <InputIcon right="" left="0">
                    <VpnKeyRoundedIcon className='icon' />
                </InputIcon>
                <input
                    type={showCPassword ? "text" : "password"}
                    value={inp.newCpassword || ''}
                    placeholder="Confirm Password"
                    onInput={(e) => setInp({ ...inp, newCpassword: e.target.value })}
                />
                <InputIcon onClick={() => setShowCPassword(!showCPassword)} right="0" left="">
                    {showCPassword ? <VisibilityOffRoundedIcon className='icon' /> : <RemoveRedEyeRoundedIcon className='icon' />}
                </InputIcon>
            </InputWrapper>

            <div className='text-center text-md-start mt- pt-2'>

                <Btn disabled={changePasswordLoading} onClick={submitForm} color="var(--blue)" link={false}>
                    {changePasswordLoading ? <Spinner_ size="sm" /> : "Reset Password"}
                </Btn>
            </div>

        </Wrapper>
    )
}


const Wrapper = styled.div`

`
const InputWrapper = styled.div`
    width: 100%;
    height: 45px;
    margin-bottom: 15px;    
    font-size: .8rem;
    position: relative;

    .tag {
        color: #c30;
        font-size: .7rem;
    }
    
    input {
        padding: 8px 30px;
        height: 100%;
        width: 100%;
        border: 1px solid #ccc;
        display: block;
        font-size: .9rem;
        border-radius: 5px;

        &: focus{
            outline: none;
            border: 3px solid var(--blue);
        }
    } 
`

const InputIcon = styled.div`
    position: absolute;
    padding: 3px;
    width: 30px;
    z-index: 1;
    bottom: 0;
    left: ${({ left }) => left};
    right: ${({ right }) => right};
    font-size: .8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .icon {
        font-size: 1rem;
    }
`