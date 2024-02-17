import React from 'react'
import { Input } from '@/components/ui/input'

function Profil() {
  return (
    <div className='mt-20 px-6 py-3 '>
      <h1 className='text-2xl text-primary font-bold'>
        الصفحة الشخصية
      </h1>
      <p>
        هذه الصفحة مخصصة لعرض معلومات المستخدم
      </p>
      <div className="flex flex-col gap-3 w-full lg:w-1/2 justify-start items-start mt-5 ">
        <label className=' font-semibold'>
          الاسم
        </label>
        <Input
          type='text'
          placeholder='الاسم'
          className='w-full border-primary  rounded-lg p-2' 
        />
        <label className=' font-semibold'>
          البريد الالكتروني
        </label>
        <Input
          type='email'
          placeholder='البريد الالكتروني'
          className='w-full border-primary rounded-lg p-2'
        />
        <h2 className='text-lg font-semibold mt-5 text-primary'>
          تغيير كلمة المرور
        </h2>
        <label className=' font-semibold'>
          كلمة المرور
        </label>
        <Input
          type='password'
          placeholder='كلمة المرور'
          className='w-full border-primary rounded-lg p-2'
        />
        <label className=' font-semibold'>
          تأكيد كلمة المرور
        </label>
        <Input
          type='password'
          placeholder='تأكيد كلمة المرور'
          className='w-full border-primary  rounded-lg p-2'
        />

        </div>
        <div className="flex flex-col gap-3 w-full lg:w-1/2 justify-start items-start mt-5 ">
          <h2 className='text-lg font-semibold text-primary'>
           تغيير الصورة الشخصية
          </h2>

      
        </div>


    </div>
  )
}

export default Profil