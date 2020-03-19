import Styled from 'styled-components';

export const TableContainer = Styled.div`
    background-color: rgba(255,255,255,0.3);
`;

export const StyledTable = Styled.table`
    border: 0;
    width:100%;
    table-layout: fixed;
`;
export const StyledTh = Styled.th`
padding: 20px 15px;
    text-align: left;
    font-weight: 500;
    font-size: 14px;
    text-transform: uppercase;
`;
export const StyledTd = Styled.td`
    padding: 15px;
    text-align: left;
    vertical-align:middle;
    font-weight: 300;
    font-size: 15px;
    border-bottom: solid 1px rgba(255,255,255,0.1);
    cursor: pointer;
`;
export const StyledContainer = Styled.body`
    background: -webkit-linear-gradient(left, #e6ede8, #c1c7c3);
    background: linear-gradient(to right, #e6ede8, #c1c7c3);
`;
export const StyledSection = Styled.section`
    margin: 30px;
`;
export const StyledTr = Styled.tr`
    &> th:first-child {
        width:100px;
    }
`;
