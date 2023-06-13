import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import {Input} from "../../../components/Input";
import {Button} from "../../../components/Button";
import {Switch} from "../../../components/Switch";
import {ReactComponent as ArrowRight} from './../../../assets/arrow-right.svg';
import {ReactComponent as Crown} from "../../../assets/crown.svg";
import {ReactComponent as Door} from "../../../assets/door.svg";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserData, userSlice} from "../../../store/reducers/UserSlice";
import './Form.css';

const Form = (props) => {
    const {callback} = props;
    const dispatch = useDispatch();
    const {setError} = userSlice.actions;
    const {error} = useSelector((state) => state.userReducer);
    const {isLoading} = useSelector((state) => state.formReducer);
    useEffect(() => {
        if (error) {
            setTimeout(() => dispatch(setError('')), 2000);
        }
    });
    const formik = useFormik({
        initialValues: {
            name: '',
            code: '',
            isHost: false,
        },
        validate: values => {
            const errors = {};
            if (!values.name) errors.name = 'Введите имя';
            if (values.name.length > 12) errors.name = 'До 12 символов';
            if (values.code.length !== 6 && !values.isHost) errors.code = 'Код - 6 символов';
            if (!values.code && !values.isHost) errors.code = 'Введите код';
            return errors
        },
        onSubmit: values => {
            dispatch(fetchUserData(values,callback));
            formik.isSubmitting = false;
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className={"form"}>
            <div className={"form__toggle"}>
                <Switch name={'isHost'}
                        value={formik.values.isHost}
                        onChange={formik.handleChange}/>
                <div className={"svg-icon toggle__left"} onClick={() => {
                    formik.setFieldValue('isHost', false);
                }}><Door/></div>
                <div className={"svg-icon toggle__right"} onClick={() => formik.setFieldValue('isHost', true)}><Crown/>
                </div>
            </div>
            <div className={"form__field"}><label htmlFor="name" className={"form__label"}>Имя:</label>
                <Input onChange={formik.handleChange}
                       name={'name'}
                       value={formik.values.name}
                       placeholder={'Имя'}/>
                {formik.errors.name && formik.touched.name ?
                    <div className={"form__error"}>{formik.errors.name}</div> : null}
            </div>
            {!formik.values.isHost ?
                <div className={"form__field"}><label htmlFor="code" className={"form__label"}>Код:</label>
                    <Input onChange={formik.handleChange}
                           name={'code'}
                           value={formik.values.code}
                           placeholder={'Код'}/>
                    {formik.errors.code && formik.touched.code ?
                        <div className={"form__error"}>{formik.errors.code}</div> : null}
                </div>
                : null
            }
            {error ? <div className={"form__error"}>{error}</div> : null}
            <Button type={'submit'} disabled={isLoading}>
                <span>Вперед</span>
                <div className={"svg-icon"}>
                    <ArrowRight/>
                </div>
            </Button>
        </form>
    );
}
export {Form};
