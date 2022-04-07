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
        position: relative;

        p{
            margin-right: 5px
        }

        .cart-currency-icon{
            margin-bottom: 3px;
        }

        &-overlay{
            position: absolute;
            top: 30px;
            left: -20px;
            width: 114px;
            height: 169px;
            padding: 20px;

            div{
                display: flex;
                align-items:center;

                &:hover{
                    opacity: .7;
                }

                p{
                    font-weight: 500;
                    font-size: 18px; 
                }

                p:nth-child(2){
                    margin-bottom:22px;
                }
            }
        }
    }
`;