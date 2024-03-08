import ChangeInfo from '@/components/my-ui/user/change-info'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
const Profil = () => {
  return (
    <div className="w-full py-6 px-3">
      <Card className='flex  shadow-none rounded-none flex-col gap-4  px-3   py-3 w-full justify-start items-start mt-20'>
        <h1 className='text-2xl text-primary font-bold'>
          الصفحة الشخصية
        </h1>
        <p>
          هذه الصفحة مخصصة لعرض معلومات المستخدم
        </p>
        <div className="flex flex-col gap-3 w-full lg:w-1/2 justify-start items-start mt-5 ">
         <ChangeInfo />
          <h2 className='text-lg font-semibold mt-5 text-primary'>
            تغيير كلمة المرور
          </h2>
          <label className=' font-semibold'>
            كلمة المرور
          </label>
          <Input
            type='password'
            placeholder='كلمة المرور'
          />
          <label className=' font-semibold'>
            تأكيد كلمة المرور
          </label>
          <Input
            type='password'
            placeholder='تأكيد كلمة المرور'
          />

        </div>
        <div className="flex flex-col gap-3 w-full lg:w-1/2 justify-start items-start mt-5 ">
          <h2 className='text-lg font-semibold text-primary'>
            تغيير الصورة الشخصية
          </h2>


        </div>
      </Card>
    </div>
  )
}

export default Profil
