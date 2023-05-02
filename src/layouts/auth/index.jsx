import React from 'react'
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import styled from 'styled-components'
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function Auth({ children }) {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <div>
            {
                location.pathname.includes('/auth/verify-email') ? "" :

                    <Header>
                        <BackArrow onClick={() => navigate(-1)}>
                            <ArrowCircleLeftRoundedIcon style={{ color: 'var(--blue)' }} />
                        </BackArrow>
                        <Link to="/">
                            <HomeRoundedIcon style={{ color: 'var(--blue)' }} />
                        </Link>
                    </Header>
            }
            <div>{children}</div>
        </div>
    )
}

const Header = styled.div`
    display: flex;
    padding: 5px ${({ theme }) => theme.lg_padding};
    @media (max-width: ${({ theme }) => theme.md_screen}){
        padding: 5px ${({ theme }) => theme.md_padding};
    }
    @media (max-width: ${({ theme }) => theme.sm_screen}){
        padding: 5px ${({ theme }) => theme.sm_padding};
    }
`

const BackArrow = styled.div`
    cursor: pointer;
    &:hover {
        opacity: .8;
    }
`