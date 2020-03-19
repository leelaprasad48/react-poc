import Styled from 'styled-components';

export const CardsContainer = Styled.div`
    background: #fff;
    border-radius: 2px;
    display: inline-block;
    height: auto;
    margin: 1rem;
    position: relative;
    width: 300px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    &:hover{
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
    background: -webkit-linear-gradient(left, #e6ede8, #c1c7c3);
    background: linear-gradient(to right, #e6ede8, #c1c7c3);
`;

export const Card = Styled.div`
    display: flex;
    flex-direction: column;
`;
export const CardRow = Styled.div`
    display: flex;
    flex-direction: row;
    /*justify-content: flex-start; */
`;

export const StyledDiv = Styled.div`
    font-size: ${(props) => (props.size ? props.size : '15px')};
    padding: 5px 5px 5px;
    width: 100%;
`;

export const Website = Styled.div`
    padding: 10px;
    color: '#ff0000'
`;
