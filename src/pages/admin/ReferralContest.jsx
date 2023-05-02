import React, { useEffect } from 'react'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import Contest_C from '../../components/admin/referralContest/Contest';

export default function ReferralContest() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get('extratoken') || !Cookies.get('refreshtoken')) {
            navigate("/dashboard")
        }
    }, [])
    return <Contest_C />
}
