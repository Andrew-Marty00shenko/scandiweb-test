import styled from "styled-components";

export const WrapperHeader = styled.header`
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding: 0px 110px 0px 70px;

    .wrapper-header__logo{
        margin-right: 200px;
    }
`;

export const WrapperHeaderCategories = styled.div`
    display: flex;

    p{
        color: #1D1F22;
        padding: 20px 15px;
        font-style: normal;
        font-weight: 600;
        cursor: pointer;
        text-transform: uppercase;

        &:hover{
            color: #5ECE7B;
            border-bottom: 1px solid #5ece7b;
        }
    }
`;

export const WrapperHeaderCart = styled.div`
    display: flex;
    align-items: center;

    .wrapper-header__cart-currency{
        display: flex;
        cursor: pointer;
        margin-right: 20px;
        p{
            margin-right: 5px
        }
    }
`;