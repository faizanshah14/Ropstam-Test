import React, { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import Select from 'react-select'
import {getAllpollicies , getAllCategories,getPoliciesByCategory,createEmployee} from "../services/apis";

const useYupValidationResolver = (validationSchema) => useCallback(async (data) => {
  try {
    const values = await validationSchema.validate(data, { abortEarly: false });

    return { values, errors: {} };
  } catch (errors) {
    return {
      values: {},
      errors: errors.inner.reduce(
        (allErrors, currentError) => ({
          ...allErrors,
          [currentError.path]: {
            type: currentError.type ?? "validation",
            message: currentError.message
          }
        }),
        {}
      )
    };
  }
}, [validationSchema]);
const InputFormField = (props) => {
  const {
    title,
    id,
    register,
    fieldSize,
    error,
    ...rest
  } = props;
  return (
    <div className="relative mb-3 w-full">
      <input className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
        id={id}
        {...register(id)}
        {...rest} />{" "}
      {
        error && <span className="text-red-500">*{
          error.message
        }</span>
      }
      {" "} </div>
  );
};
const Dropdown = ({
  title,
  name,
  control,
  fieldSize,
  options = [],
  required,
  error
}) => {
  return (
    <div className={
      "lg:w- w-full px-4" + fieldSize + "/12"
    }>
      <div className="relative mb-3 w-full">
        <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
          {title}
          {" "} </label>
        <Controller name={name}
          control={control}
          rules={
            { required: true }
          }
          render={
            ({ field: {
              onChange
            } }) => {
              return (
                <Select options={options}
                  placeholder={"Choose..."}
                  onChange={
                    (value) => onChange(value?.value)
                  }
                  isClearable={true} />
              );
            }
          } />{" "}
        {
          error && <span className="text-red-500">*{
            error.message
          }</span>
        }
        {" "} </div>
    </div>
  );
};
const validationSchema = yup.object({
  mobile: yup.string().min(11, "Number should be greater than 11 chareters").required("Please Enter your password").matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Invalid Phone Number"),
  fullname: yup.string().min(2, "Name must be at least 2 characters long").max(20, "Name must be shorter than 20 characters").matches(/^[A-Za-z ]*$/, "Please enter valid name").required("Required"),
  city: yup.string().min(2, "city must be at least 2 characters long").max(20, "city must be shorter than 10 characters").matches(/^[A-Za-z ]*$/, "Please enter valid name").required("Required"),
  email: yup.string().email('Invalid email format').required("Email is required!"),
  policy: yup.string().ensure().required("Policy is required!"),
  category: yup.string().ensure().required("Category is required!"),
});
const HomePage = () => {
  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isDirty,
      isTouched
    },
    formState,
    getValues,
    control,
    getFieldState,
    watch
  } = useForm({ resolver, reValidateMode: "onChange", shouldUnregister: true, defaultValues: {
    mobile: "",
    fullname: "",
    email: "",
    policy:'',
    category:''
  } });
  const [categoryOp, setCategoryOp] = React.useState([{
    value: "",
    label: "Choose..."
  }]);
  const [policyOp, setPolicyOp] = React.useState([{
    value: "",
    label: "Choose..."
  }]);
  let counter = 0;
  const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
  const watchFields = watch(["category"]); // you can also target specific fields by their names

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      getPoliciesByCategory(getValues('category')).then(res => {
        setPolicyOp(res?.map(item => {
          return {
            value: item._id,
            label: item.policyDescription
          }
        }
        ));
      });
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  React.useEffect(() => {
    getPoliciesByCategory(getValues('category')).then(res => {
      setPolicyOp(res?.map(item => {
        return {
          value: item._id,
          label: item.policyDescription
        }
      }
      ));
    });
  },[]);

  React.useEffect(() => {
    getAllpollicies().then(res => {
      setPolicyOp(res?.map(item => {
        return {
          value: item._id,
          label: item.policyDescription
        }
      }));
    });
    getAllCategories().then(res => {
      setCategoryOp(res?.map(item => {
        return {
          value: item._id,
          label: item.category
        }
      }
      ));
    })

  }, []);
  const onSubmit = (data, e) =>{
    console.log("sucess", data, e)
    const formdata = {
      mobile: data.mobile,
      name: data.fullname,
      city: data.city,
      email: data.email,
      policy: data.policy,
      category: data.category
    }
    createEmployee(formdata).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })

    //createEmployee()
  } ;
  const onError = (errors, e) => console.log("error", errors, e);
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 py-6 sm:py-12">
      <div className="relative py-3 sm:mx-auto sm:max-w-xl">
        <div className="absolute w-12/12 inset-0 -skew-y-6 transform bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl" />
        <div className="relative w-12/12 bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
          <form onSubmit={
            handleSubmit(onSubmit)
          }
            onError={onError}>
            <div className="space-y-4 py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7 w-max">

              <div className="mx-auto max-w-md">
                <div>
                  <p className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1">Enter Info</p>
                  <hr className="border-b border-gray-200 mr-96 ml-96" />
                  <br />
                  <br />
                </div>
                <InputFormField register={register}
                  error={
                    errors.fullname
                  }
                  id={"fullname"}
                  placeholder={"Enter Full Name"} />

                <InputFormField register={register}
                  error={
                    errors.email
                  }
                  id={"email"}
                  placeholder={"Enter email"}
                  type={"email"} />
                <InputFormField register={register}
                  error={
                    errors.mobile
                  }
                  id={"mobile"}
                  placeholder={"Enter Nobile Number"} />
                  <InputFormField register={register}
                  error={
                    errors.city
                  }
                  id={"city"}
                  placeholder={"Enter City Name"} />
                <Dropdown
                  name={"category"}
                  title={"Category"}
                  control={control}
                  options={categoryOp}
                  fieldSize={"4"}
                  error={errors.category}
                />
                <Dropdown
                  name={"policy"}
                  title={"Policy"}
                  control={control}
                  options={policyOp}
                  fieldSize={"4"}
                  error={errors.policy}
                />
                <button
                  className="btn-indigo hover:bg-blue-200 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Submitt
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
