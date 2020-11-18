import styled from '@emotion/styled';

 export const Postpone = styled.form`
        box-sizing: border-box;
        border-top: 8px solid #fad312;
        background-color: white;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
        padding: 54px 40px 35px 40px;
        max-width: 639px;
        margin: 129px auto 66px auto; 
    `;

 export const PostponeTitle = styled.div`
        font-size: 36px;
    `;

 export const PostponeDescription = styled.div`
        font-size: 14px;
        margin-top: 35px;
        & + & {
            margin-top: 11px;
        }
    `;

 export const PostponeNeeded = styled.div`
        margin-top: 22px;
        font-size: 16px;
        color:#e74149;
        margin-bottom: 55px;

        &:before {
            content: "* ";
            color:#e74149;
        }
    `;

 export const PostponeGroup = styled.div`
        margin-bottom: 49px;

        & input {
            box-sizing: border-box;
            border: 1px solid #d0d0d0;
        }

        &  input([type="text"]) {
            max-width: 287px;
            width: 100%;
            height: 23px;
        }

        & input::placeholder {
            font-size: 16px;
            color: #afafaf;
        }

        & label {
            display: block;
        }
    `;

 export const InputNeeded = styled.div`
        font-size: 20px;
        margin-bottom: 20px;
        color: black;   
        &:before {
            content: "* ";
            color:#e74149;
        }
    `;

 export const NullError = styled.p`
        color:red;
    `;

 export const ApplyLabel = styled.label`
        margin-bottom: 23px;
    `;

 export const PostponeOther = styled.div`
        font-size: 20px;
        margin-bottom: 20px;
    `;

 export const PostponeAdvise = styled.div`
        font-size: 14px;
        margin-bottom: 24px;
    `;

 export const PostponeBtn = styled.button`
        outline: none;
        border: 1px solid #fad312;
        box-sizing: border-box;
        width: 92px;
        height: 40px;
        border-radius: 3px;
        background-color: #fad312;
        font-size: 15px;
    `;

 export const PostponeMt21 = styled.p`
        margin-top: 21px;
`;

