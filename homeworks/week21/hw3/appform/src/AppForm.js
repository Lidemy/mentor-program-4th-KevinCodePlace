import { useState } from 'react';
import {
    Postpone, 
    PostponeTitle, 
    PostponeDescription,
    PostponeNeeded,
    PostponeGroup,
    InputNeeded,    
    NullError,
    ApplyLabel,
    PostponeOther,
    PostponeAdvise,
    PostponeBtn,
    PostponeMt21
} from './AppFormCSS';

const AppForm = () => {
    const [ formValue, setFormValue ] = useState({
        nickname: '',       
        email: '',
        phone: '',        
        activity: '',
        source: '',        
        other: '',
    });

    const [ checkFormValue, setCheckFormValue] = useState({
        nicknameNull: '',
        emailNull: '',
        phoneNull: '',
        activityNull:'',
        sourceNull: '',
    });
    
    const {nickname, email, phone, activity, source, other} = formValue;
    const {nicknameNull, emailNull, phoneNull, activityNull, sourceNull} = checkFormValue;
    
    const handleSummit = (event) => {
        const isBlankNull = Object.values(checkFormValue);
        //判斷是否有必填未填
        for(let i = 0; i < isBlankNull.length; i++) {
            if(isBlankNull[i] === '' || isBlankNull[i] === true) {
                alert('請填入完整資訊');
                event.preventDefault();
                return;
            }
        }   
        
        alert(`
            報名成功，請核對以下資訊

            暱稱： ${nickname}
            電子信箱： ${email}
            電話號碼： ${phone}
            報名類型：${activity}
            怎麼知道這個活動？ ${source}
            其他： ${other}
        `)
        event.preventDefault();
    }
    
    const handleInputChange = (event) => {
        setFormValue((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));

        let isBlankNull = event.target.name + 'Null';
        if(event.target.value) {
            setCheckFormValue((prevState) => ({
                ...prevState,
                [isBlankNull]: false,
            }));
        } else {
            setCheckFormValue((prevState) => ({
                ...prevState,
                [isBlankNull]: true,
            }));
        }
    }
    
    const handleClick = (event) => {
        if(event.target.id === 'bed') {
            setFormValue((prevState) => ({
                ...prevState,
                activity: '躺在床上用想像力實作',
            }));
            setCheckFormValue((prevState) => ({
                ...prevState,
                activityNull: false,
            }));
        } else if (event.target.id === 'ground') {
            setFormValue((prevState) => ({
                ...prevState,
                activity: '趴在地上滑手機找現成的',
            }));
            setCheckFormValue((prevState) => ({
                ...prevState,
                activityNull: false,
            }));
        } else {
            setFormValue((prevState) => ({
                ...prevState,
                activity: '',
            }));
            setCheckFormValue((prevState) => ({
                ...prevState,
                activityNull: true,
            }));
        };
    }

    return(
    <div>
		<Postpone onSubmit={handleSummit}>
		    <PostponeTitle>新拖延運動報名表單</PostponeTitle>
            <PostponeDescription>活動日期：2020/12/10 ~ 2020/12/11 </PostponeDescription>
            <PostponeDescription>活動地點：台北市大安區新生南路二段1號</PostponeDescription>
            <PostponeNeeded>必填</PostponeNeeded>
            <PostponeGroup>
                <InputNeeded>暱稱</InputNeeded>
                <input type="text" name='nickname' placeholder="您的回答" value={nickname} onChange={handleInputChange} />
                <NullError>{nicknameNull ? '請填寫暱稱' : ''}</NullError>
            </PostponeGroup>
            <PostponeGroup>
                <InputNeeded>電子郵件</InputNeeded>
                <input type="email" name='email' placeholder="您的電子郵件" value={email} onChange={handleInputChange} />
                <NullError>{emailNull ? '請填寫電子郵件' : ''}</NullError>
            </PostponeGroup>
            <PostponeGroup>
                <InputNeeded>手機號碼</InputNeeded>
                <input type="text" name='phone' placeholder="您的手機號碼"  value={phone} onChange={handleInputChange} />
                <NullError>{phoneNull ? '請填寫手機號碼' : ''}</NullError>
            </PostponeGroup>
            <PostponeGroup>
                <InputNeeded>報名類型</InputNeeded>
                <ApplyLabel htmlFor='bed'>
                <input type="radio" name="activity" id="bed" onClick={handleClick}/>躺在床上用想像力實作
                </ApplyLabel>
                <label htmlFor="ground">
                <input type="radio" name="activity" id="ground" onClick={handleClick}/>趴在地上滑手機找現成的
                </label>
                <NullError>{activityNull ? '請填寫報名類型' : ''}</NullError>
            </PostponeGroup>
            <PostponeGroup>
                <InputNeeded>怎麼知道這個活動的？</InputNeeded>
                <input type="text" name='source' placeholder="您的回答" value={source} onChange={handleInputChange}/>
                <NullError>{sourceNull ? '請填寫資料來源' : ''}</NullError>
            </PostponeGroup>
            <PostponeGroup>
                <PostponeOther>其他</PostponeOther>
                <PostponeAdvise>對活動的一些建議</PostponeAdvise>
                <input type="text" name='other' placeholder="您的回答" value={other} onChange={handleInputChange}/>
            </PostponeGroup>
            <PostponeBtn>提交</PostponeBtn>
            <PostponeMt21>請勿透過表單送出您的密碼。</PostponeMt21>
		</Postpone>
		<footer>© 2020 © Copyright. All rights Reserved.</footer>
	</div>
    )
}

export default AppForm;