import React from 'react'

const SearchBar = ({setCity, city, search}) => {
    return (
        <div className='input-container'>
            <label htmlFor=""></label>
            <input type="text" className='input-container__field' value={city} onChange={e => setCity(e.target.value)} placeholder='مثال: الرياض' />
            <button className='input-container__button' onClick={() => search(city)}>بحث</button>
            {/* <select name="cars" id="cars" className='input-container__field' >
                <option value="الرياض" >
                    الرياض</option>
                <option value="saab">
                    جدة</option>
                <option value="mercedes">
                    مكة المكرمة</option>
                <option value="audi">
                    المدينة المنورة</option>
                <option value="audi">
                    الأحساء</option>
                <option value="audi">
                    الدمام</option>
                <option value="audi">
                    الطائف</option>
                <option value="audi">
                    بريدة</option>
                <option value="audi">
                    تبوك</option>
                <option value="audi">
                    القطيف</option>
                <option value="audi">
                    خميس مشيط</option>
                <option value="audi">
                    الخبر</option>
                <option value="audi">
                    حفر الباطن</option>
                <option value="audi">
                    الجبيل</option>
                <option value="audi">
                    الخرج</option>
                <option value="audi">
                    أبها</option>
                <option value="audi">
                    حائل</option>
                <option value="audi">
                    نجران</option>
                <option value="audi">
                    ينبع</option>
                <option value="audi">
                    ينبع</option>
                <option value="audi">ينبع</option>
                <option value="audi">ينبع</option>
                <option value="audi">ينبع</option>
                <option value="audi">ينبع</option>
            </select> */}
        </div>
    )
}

export default SearchBar
