import * as Yup from "yup";

export const contactSchema = Yup.object().shape({
  fullname: Yup.string().required("نام و نام خانوادگی الزامی می باشد"),
  photo: Yup.string()
    .url("آدرس تصویر معتبر نیست")
    .required("تصویر مخاطب الزامی می باشد"),
  mobile: Yup.number()
  .typeError("فرمت شماره موبایل اشتباه است")
  .min(11)
  .required("شماره موبایل الزامی می باشد"),
  email: Yup.string()
    .email("آدرس ایمیل معتبر نیست")
    .required("آدرس ایمیل الزامی می باشد"),
    job : Yup.string().required("وارد کردن شغل الزامی است"),
  group: Yup.string().required("انتخاب گروه الزامی می باشد"),
});
